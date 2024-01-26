import { z } from "zod";
import {
  createTRPCRouter,
  documentProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { objectId } from "../helpers/customZodTypes";

export const documentRouter = createTRPCRouter({
  getAllSortedByGroup: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.documentGroup.findMany({
      where: {
        Document: {
          some: {
            id: {
              not: undefined,
            },
          },
        },
      },
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
  getAllGroupsAsAdmin: documentProcedure.query(async ({ ctx }) => {
    const groups = await ctx.prisma.documentGroup.findMany({
      select: {
        id: true,
        name: true,
        extraText: true,
        _count: { select: { Document: true } },
        Document: true,
      },
    });
    return groups.map(({ _count: { Document: documentCount }, ...rest }) => ({
      documentCount,
      ...rest,
    }));
  }),
  getAllAsAdmin: documentProcedure.query(async ({ ctx }) => {
    const documents = ctx.prisma.document.findMany({
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
        groupId: true,
      },
    });
    return (await documents).map(({ group: { name: groupName }, ...rest }) => ({
      groupName,
      ...rest,
    }));
  }),

  getOne: documentProcedure
    .input(
      z.object({
        id: objectId,
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.document.findUniqueOrThrow({ where: { id: input.id } });
    }),
  createOne: documentProcedure
    .input(
      z.object({
        title: z.string().min(1),
        url: z.string().url().min(1),
        isPDF: z.boolean().optional(),
        groupId: objectId,
      }),
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
  updateOne: documentProcedure
    .input(
      z.object({
        id: objectId,
        title: z.string().min(1).optional(),
        url: z.string().url().min(1).optional(),
        isPDF: z.boolean().optional(),
        groupId: objectId.optional(),
      }),
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
  deleteOne: documentProcedure
    .input(
      z.object({
        id: objectId,
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.document.delete({
        where: {
          id: input.id,
        },
      });
    }),
  getOneGroup: documentProcedure
    .input(
      z.object({
        id: objectId,
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.documentGroup.findUniqueOrThrow({
        where: { id: input.id },
      });
    }),
  getOneGroupByName: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.prisma.documentGroup.findUniqueOrThrow({
        where: {
          name: input.name,
        },
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
  createOneGroup: documentProcedure
    .input(
      z.object({
        name: z.string().min(1),
        extraText: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.documentGroup.create({
        data: {
          name: input.name,
          extraText: input.extraText,
        },
      });
    }),
  updateOneGroup: documentProcedure
    .input(
      z.object({
        id: objectId,
        name: z.string().min(1).optional(),
        extraText: z.string().optional(),
      }),
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
  deleteOneGroup: documentProcedure
    .input(
      z.object({
        id: objectId,
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.documentGroup.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
