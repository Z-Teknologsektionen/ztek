import { revalidateTag } from "next/cache";
import { z } from "zod";
import { objectId } from "~/schemas/helpers/common-zod-helpers";
import {
  createHomePageCarouselSchema,
  updateHomePageCarouselSchema,
} from "~/schemas/home-page-carousel";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { userHasAdminAccess } from "~/utils/user-has-correct-role";

export const homePageCarouselRouter = createTRPCRouter({
  getManyByCommitteeIdAsActive: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.homePageCarouselItem.findMany({
      where: {
        committeeId: userHasAdminAccess(ctx.session.user.roles)
          ? undefined
          : ctx.session.user.committeeId,
      },
      include: {
        committee: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }),
  createOneAsActive: protectedProcedure
    .input(createHomePageCarouselSchema)
    .mutation(
      async ({
        ctx,
        input: {
          committeeId,
          endDateTime,
          imageCredit,
          imageUrl,
          linkToUrl,
          startDateTime,
        },
      }) => {
        const createdItem = await ctx.prisma.homePageCarouselItem.create({
          data: {
            committeeId,
            imageCredit,
            imageUrl,
            linkToUrl,
            startDateTime,
            endDateTime,
            updatedByEmail: ctx.session.user.email,
            createdByEmail: ctx.session.user.email,
          },
        });

        revalidateTag("home-page-carousel");

        return createdItem;
      },
    ),
  updateOneAsActive: protectedProcedure
    .input(updateHomePageCarouselSchema)
    .mutation(
      async ({
        ctx,
        input: {
          id,
          committeeId,
          endDateTime,
          imageCredit,
          imageUrl,
          linkToUrl,
          startDateTime,
        },
      }) => {
        const updatedItem = await ctx.prisma.homePageCarouselItem.update({
          where: {
            id,
          },
          data: {
            committeeId,
            imageUrl,
            imageCredit,
            linkToUrl,
            startDateTime,
            endDateTime,
            updatedByEmail: ctx.session.user.email,
          },
        });

        revalidateTag("home-page-carousel");

        return updatedItem;
      },
    ),
  deleteOneAsActive: protectedProcedure
    .input(
      z.object({
        id: objectId,
      }),
    )
    .mutation(async ({ ctx, input: { id } }) => {
      const deletedItem = await ctx.prisma.homePageCarouselItem.delete({
        where: {
          id,
        },
      });

      revalidateTag("home-page-carousel");

      return deletedItem;
    }),
});
