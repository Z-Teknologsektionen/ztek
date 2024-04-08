import { z } from "zod";
import { objectId } from "~/schemas/helpers/custom-zod-helpers";
import {
  createZenithMediaServerSchema,
  updateZenithMediaSchema,
} from "~/schemas/zenith-media";
import {
  createTRPCRouter,
  publicProcedure,
  zenithMediaProcedure,
} from "~/server/api/trpc";
import { deleteFileFromSftpServer } from "~/utils/sftp/sftp-engine";

export const zenithMediaRouter = createTRPCRouter({
  getAllByYear: publicProcedure.query(async ({ ctx }) => {
    const rawMedia = await ctx.prisma.zenithMedia.findMany({
      orderBy: { year: "desc" },
      select: {
        id: true,
        title: true,
        year: true,
        url: true,
        coverImage: true,
      },
    });

    const years = [...new Set(rawMedia.map((media) => media.year))];

    const formatedData = years.map((year) => {
      return {
        mediaArray: rawMedia.filter((media) => media.year === year),
        year: year,
      };
    });

    return formatedData;
  }),
  getAllAsAuthed: zenithMediaProcedure.query(async ({ ctx }) => {
    return ctx.prisma.zenithMedia.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
  createOneAsAuthed: zenithMediaProcedure
    .input(createZenithMediaServerSchema)
    .mutation(async ({ ctx, input: { url, title, year, coverImage } }) => {
      return ctx.prisma.zenithMedia.create({
        data: {
          title: title,
          url: url,
          year: year,
          coverImage: coverImage,
        },
      });
    }),
  updateOneAsAuthed: zenithMediaProcedure
    .input(updateZenithMediaSchema)
    .mutation(async ({ ctx, input: { id, title, url, year, coverImage } }) => {
      return ctx.prisma.zenithMedia.update({
        where: {
          id: id,
        },
        data: {
          title: title,
          url: url,
          year: year,
          coverImage: coverImage,
        },
      });
    }),
  deleteOneAsAuthed: zenithMediaProcedure
    .input(z.object({ id: objectId }))
    .mutation(async ({ ctx, input: { id } }) => {
      const fileUrl = await ctx.prisma.zenithMedia.findUnique({
        where: { id: id },
        select: { url: true },
      });

      if (!fileUrl) {
        throw new Error("Media not found");
      }
      try {
        await deleteFileFromSftpServer(fileUrl.url);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Something went wrong when deleting the file.");
        }
      }

      return ctx.prisma.zenithMedia.delete({
        where: {
          id: id,
        },
      });
    }),
});
