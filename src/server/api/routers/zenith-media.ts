import { z } from "zod";
import { objectId } from "../helpers/customZodTypes";
import {
  createZenithMediaSchema,
  updateZenithMediaSchema,
} from "../helpers/schemas/zenith-media";
import {
  createTRPCRouter,
  publicProcedure,
  zenithMediaProcedure,
} from "../trpc";

export const zenithMediaRouter = createTRPCRouter({
  getAllByYear: publicProcedure.query(async ({ ctx }) => {
    const rawMedia = await ctx.prisma.zenithMedia.findMany({
      orderBy: { year: "desc" },
      select: {
        id: true,
        title: true,
        year: true,
        url: true,
        isPDF: true,
        image: true,
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
  getAllAsAuthorized: zenithMediaProcedure.query(async ({ ctx }) => {
    return ctx.prisma.zenithMedia.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
  createOne: zenithMediaProcedure
    .input(createZenithMediaSchema)
    .mutation(async ({ ctx, input: { isPDF, title, url, year, image } }) => {
      return ctx.prisma.zenithMedia.create({
        data: {
          title: title,
          isPDF: isPDF,
          url: url,
          year: year,
          image: image,
        },
      });
    }),
  updateOne: zenithMediaProcedure
    .input(updateZenithMediaSchema)
    .mutation(
      async ({ ctx, input: { id, isPDF, title, url, year, image } }) => {
        return ctx.prisma.zenithMedia.update({
          where: {
            id: id,
          },
          data: {
            isPDF: isPDF,
            title: title,
            url: url,
            year: year,
            image: image,
          },
        });
      },
    ),
  deleteOne: zenithMediaProcedure
    .input(z.object({ id: objectId }))
    .mutation(async ({ ctx, input: { id } }) => {
      return ctx.prisma.zenithMedia.delete({
        where: {
          id: id,
        },
      });
    }),
});