import { z } from "zod";
import { objectId } from "../helpers/customZodTypes";
import {
  createZenithDocumentSchema,
  updateZenithDocumentSchema,
} from "../helpers/schemas/zenith-documents";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const zenithDocuemntRouter = createTRPCRouter({
  getAllByYear: publicProcedure.query(async ({ ctx }) => {
    const rawDocuments = await ctx.prisma.zenithDocument.findMany({
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

    const years = [...new Set(rawDocuments.map((document) => document.year))];

    const formatedData = years.map((year) => {
      return {
        documents: rawDocuments.filter((document) => document.year === year),
        year: year,
      };
    });

    return formatedData;
  }),
  getAllAsAdmin: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.zenithDocument.findMany();
  }),
  createOne: protectedProcedure
    .input(createZenithDocumentSchema)
    .mutation(async ({ ctx, input: { isPDF, title, url, year, image } }) => {
      return ctx.prisma.zenithDocument.create({
        data: {
          title: title,
          isPDF: isPDF,
          url: url,
          year: year,
          image: image,
        },
      });
    }),
  updateOne: protectedProcedure
    .input(updateZenithDocumentSchema)
    .mutation(
      async ({ ctx, input: { id, isPDF, title, url, year, image } }) => {
        return ctx.prisma.zenithDocument.update({
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
  deleteOne: protectedProcedure
    .input(z.object({ id: objectId }))
    .mutation(async ({ ctx, input: { id } }) => {
      return ctx.prisma.zenithDocument.delete({
        where: {
          id: id,
        },
      });
    }),
});
