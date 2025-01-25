import { revalidateTag } from "next/cache";
import { z } from "zod";
import { objectId } from "~/schemas/helpers/custom-zod-helpers";
import {
  createHomePageCarucellSchema,
  updateHomePageCarucellSchema,
} from "~/schemas/home-page-carousel";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { userHasAdminAccess } from "~/utils/user-has-correct-role";

export const homePageCarouselRouter = createTRPCRouter({
  getManyByCommitteeIdAsActive: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.homePageCarucellItem.findMany({
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
    .input(createHomePageCarucellSchema)
    .mutation(
      async ({
        ctx,
        input: { committeeId, endDateTime, imageUrl, linkToUrl, startDateTime },
      }) => {
        const createdItem = await ctx.prisma.homePageCarucellItem.create({
          data: {
            committeeId,
            imageUrl,
            linkToUrl,
            startDateTime,
            endDateTime,
            updatedByEmail: ctx.session.user.email,
            createdByEmail: ctx.session.user.email,
          },
        });

        revalidateTag("home-page-carucell");

        return createdItem;
      },
    ),
  updateOneAsActive: protectedProcedure
    .input(updateHomePageCarucellSchema)
    .mutation(
      async ({
        ctx,
        input: {
          id,
          committeeId,
          endDateTime,
          imageUrl,
          linkToUrl,
          startDateTime,
        },
      }) => {
        const updatedItem = await ctx.prisma.homePageCarucellItem.update({
          where: {
            id,
          },
          data: {
            committeeId,
            imageUrl,
            linkToUrl,
            startDateTime,
            endDateTime,
            updatedByEmail: ctx.session.user.email,
          },
        });

        revalidateTag("home-page-carucell");

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
      const deletedItem = await ctx.prisma.homePageCarucellItem.delete({
        where: {
          id,
        },
      });

      revalidateTag("home-page-carucell");

      return deletedItem;
    }),
});
