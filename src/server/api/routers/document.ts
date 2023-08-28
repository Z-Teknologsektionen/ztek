import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { objectId } from "../helper/customZodTypes";

export const documentRouter = createTRPCRouter({
  getAllSortedByGroup: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.documentGroup.findMany({
      select: {
        name: true,
        extraText: true,
        Document: {
          select: {
            isPDF: true,
            title: true,
            url: true,
          },
        },
      },
    });
  }),
  getAllGroupsAsAdmin: adminProcedure.query(({ ctx }) => {
    return ctx.prisma.documentGroup.findMany({
      select: {
        id: true,
        name: true,
        extraText: true,
        _count: true,
        Document: true,
      },
    });
  }),
  getAllAsAdmin: adminProcedure.query(({ ctx }) => {
    return ctx.prisma.document.findMany({
      select: {
        group: {
          select: {
            name: true,
          },
        },
        id: true,
        isPDF: true,
        title: true,
        url: true,
      },
    });
  }),
  getOne: adminProcedure
    .input(
      z.object({
        id: objectId,
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.document.findUniqueOrThrow({ where: { id: input.id } });
    }),
  createOne: adminProcedure
    .input(
      z.object({
        title: z.string().min(1),
        url: z.string().url().min(1),
        isPDF: z.boolean().optional(),
        groupId: objectId,
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.document.create({
        data: {
          title: input.title,
          url: input.url,
          groupId: input.groupId,
          isPDF: input.isPDF,
        },
      });
    }),
  updateOne: adminProcedure
    .input(
      z.object({
        id: objectId,
        title: z.string().min(1).optional(),
        url: z.string().url().min(1).optional(),
        isPDF: z.boolean().optional(),
        groupId: objectId.optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.document.update({
        where: { id: input.id },
        data: {
          title: input.title,
          url: input.url,
          groupId: input.groupId,
          isPDF: input.isPDF,
        },
      });
    }),
  deleteOne: adminProcedure
    .input(
      z.object({
        id: objectId,
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.document.delete({
        where: {
          id: input.id,
        },
      });
    }),
  getOneGroup: adminProcedure
    .input(
      z.object({
        id: objectId,
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.documentGroup.findUniqueOrThrow({
        where: { id: input.id },
      });
    }),
  createOneGroup: adminProcedure
    .input(
      z.object({
        name: z.string().min(1),
        extraText: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.documentGroup.create({
        data: {
          name: input.name,
          extraText: input.extraText,
        },
      });
    }),
  updateOneGroup: adminProcedure
    .input(
      z.object({
        id: objectId,
        name: z.string().min(1).optional(),
        extraText: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.documentGroup.update({
        where: { id: input.id },
        data: {
          name: input.name,
          extraText: input.extraText,
        },
      });
    }),
  deleteOneGroup: adminProcedure
    .input(
      z.object({
        id: objectId,
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.documentGroup.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
