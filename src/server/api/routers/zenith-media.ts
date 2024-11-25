import { revalidateTag } from "next/cache";
import { z } from "zod";
import { deleteFileFromSftpServer } from "~/app/api/sftp/utils/sftp-engine";
import { MIN_MEDIA_ORDER_NUMBER } from "~/constants/zenith-media";
import { objectId } from "~/schemas/helpers/custom-zod-helpers";
import {
  createZenithMediaServerSchema,
  updateZenithMediaServerSchema,
} from "~/schemas/zenith-media";
import {
  createTRPCRouter,
  publicProcedure,
  zenithMediaProcedure,
} from "~/server/api/trpc";

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
    .mutation(
      async ({ ctx, input: { url, title, year, coverImage, order } }) => {
        const createdMedia = await ctx.prisma.zenithMedia.create({
          data: {
            title: title,
            url: url,
            year: year,
            order: order,
            coverImage: coverImage,
            updatedByEmail: ctx.session.user.email,
            createdByEmail: ctx.session.user.email,
          },
        });

        revalidateTag("zenithMedia");

        return createdMedia;
      },
    ),
  updateOneAsAuthed: zenithMediaProcedure
    .input(updateZenithMediaServerSchema)
    .mutation(
      async ({ ctx, input: { id, title, url, year, coverImage, order } }) => {
        const updatedMedia = await ctx.prisma.zenithMedia.update({
          where: {
            id: id,
          },
          data: {
            title: title,
            url: url,
            year: year,
            order: order || MIN_MEDIA_ORDER_NUMBER,
            coverImage: coverImage,
            updatedByEmail: ctx.session.user.email,
          },
        });

        revalidateTag("zenithMedia");

        return updatedMedia;
      },
    ),
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
        await deleteFileFromSftpServer({ url: fileUrl.url });
      } catch (error) {
        if (error instanceof Error) {
          if (error.message !== "Filen du ville radera kunde inte hittas!")
            throw new Error(error.message);
        } else {
          throw new Error("Something went wrong when deleting the file.");
        }
      }

      const deletedMedia = await ctx.prisma.zenithMedia.delete({
        where: {
          id: id,
        },
      });

      revalidateTag("zenithMedia");

      return deletedMedia;
    }),
});
