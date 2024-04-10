import { z } from "zod";
import { objectId } from "~/schemas/helpers/custom-zod-helpers";
import {
  createHomepageCarouselSchema,
  updateHomepageCarouselAsActiveSchema,
} from "~/schemas/homepage-carousel";
import {
  createTRPCRouter,
  prRoleProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const homepageCarouselRoute = createTRPCRouter({
  getAllAsAuthed: prRoleProcedure.query(({ ctx }) => {
    return ctx.prisma.homepageCarousel.findMany({
      include: {
        createdBy: {
          select: {
            name: true,
            nickName: true,
          },
        },
      },
    });
  }),

  getAllValid: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.homepageCarousel.findMany({
      where: {
        OR: [
          {
            startDate: {
              lte: new Date(),
            },
            endDate: {
              gte: new Date(),
            },
          },
          {
            startDate: {
              lte: new Date(),
            },
            endDate: undefined,
          },
        ],
      },
      select: {
        url: true,
        order: true,
      },
    });
  }),
  createOneAsAuthed: prRoleProcedure
    .input(createHomepageCarouselSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.homepageCarousel.create({
        data: input,
      });
    }),
  updateOneAsAuthed: prRoleProcedure
    .input(updateHomepageCarouselAsActiveSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.homepageCarousel.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          url: input.url,
          startDate: input.startDate,
          endDate: input.endDate,
          order: input.order,
          createdById: input.createdById,
        },
      });
    }),
  deleteOneAsAuthed: prRoleProcedure
    .input(z.object({ id: objectId }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.homepageCarousel.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
