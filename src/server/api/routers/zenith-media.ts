import { fileTypeFromBuffer } from "file-type";
import { createReadStream } from "fs";
import { z } from "zod";
import { objectId } from "~/schemas/helpers/custom-zod-helpers";
import {
  createZenithMediaSchema,
  updateZenithMediaSchema,
} from "~/schemas/zenith-media";
import {
  createTRPCRouter,
  publicProcedure,
  zenithMediaProcedure,
} from "~/server/api/trpc";
import { deleteFile, renameFile, uploadFile } from "~/utils/sftp-engine";

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
    .input(createZenithMediaSchema)
    .mutation(
      async ({ ctx, input: { fileInput, url, title, year, coverImage } }) => {
        let fileUrl = url;
        if (!fileInput) {
          throw new Error("No file input found.");
        }
        const fileBuffer = Buffer.from(fileInput, "base64");
        const fileType = await fileTypeFromBuffer(fileBuffer);
        // console.log(result);

        try {
          const file = createReadStream("C:/Users/marte/Desktop/ztek/test.png");
          fileUrl = await uploadFile(
            file,
            "media",
            `${title.replaceAll(" ", "-").toLowerCase()}.${fileType?.ext}`,
          );
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error("Something went wrong when uploading the file.");
          }
        }

        return ctx.prisma.zenithMedia.create({
          data: {
            title: title,
            url: fileUrl,
            year: year,
            coverImage: coverImage,
          },
        });
      },
    ),
  updateOneAsAuthed: zenithMediaProcedure
    .input(updateZenithMediaSchema)
    .mutation(
      async ({
        ctx,
        input: { id, fileInput, title, url, year, coverImage },
      }) => {
        let newUrl = url;
        if (title) {
          const oldData = await ctx.prisma.zenithMedia.findUnique({
            where: { id: id },
            select: { url: true },
          });

          if (!oldData) {
            throw new Error("Media not found");
          }
          try {
            newUrl = await renameFile(
              oldData.url,
              "media",
              `${title.replaceAll(" ", "-").toLowerCase()}.png`,
              true,
            );
          } catch (error) {
            if (error instanceof Error) {
              throw new Error(error.message);
            } else {
              throw new Error("Something went wrong when deleting the file.");
            }
          }
        }
        return ctx.prisma.zenithMedia.update({
          where: {
            id: id,
          },
          data: {
            title: title,
            url: newUrl,
            year: year,
            coverImage: coverImage,
          },
        });
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
        await deleteFile(fileUrl.url);
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
