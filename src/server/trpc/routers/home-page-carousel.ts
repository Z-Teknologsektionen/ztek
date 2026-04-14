import { AccountRoles } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { objectId } from "~/schemas/helpers/common-zod-helpers";
import {
  createHomePageCarouselSchema,
  updateHomePageCarouselSchema,
} from "~/schemas/home-page-carousel";
import { trpc, TRPCContext } from "~/server/trpc/init";
import {
  committeeProcedure,
  enforceRoleOrAdmin,
  protectedProcedure,
} from "~/server/trpc/procedure-builders";
import { userHasAdminAccess } from "~/utils/user-has-correct-role";

const carouselItemProcedure = protectedProcedure.use(
  enforceRoleOrAdmin(AccountRoles.MODIFY_HOMEPAGE_CAROUSEL),
);

const carouselItemOwnerProcedure = committeeProcedure(
  async (ctx: TRPCContext, id: string) => {
    const item = await ctx.prisma.homePageCarouselItem.findUnique({
      where: { id },
      select: { committeeId: true },
    });
    return item?.committeeId || null;
  },
).use(enforceRoleOrAdmin(AccountRoles.MODIFY_HOMEPAGE_CAROUSEL));

//router
export const homePageCarouselRouter = trpc.router({
  getManyByCommitteeIdAsActive: carouselItemProcedure.query(({ ctx }) => {
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
  createOneAsActive: carouselItemProcedure
    .input(createHomePageCarouselSchema)
    .mutation(
      async ({
        ctx,
        ctx: {
          session: { user },
        },
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
            committeeId: userHasAdminAccess(user.roles)
              ? committeeId
              : user.committeeId,
            imageCredit,
            imageUrl,
            linkToUrl,
            startDateTime,
            endDateTime,
            updatedByEmail: ctx.session.user.email,
            createdByEmail: ctx.session.user.email,
          },
        });

        revalidateTag("home-page-carousel", "max");

        return createdItem;
      },
    ),
  updateOneAsActive: carouselItemOwnerProcedure
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

        revalidateTag("home-page-carousel", "max");

        return updatedItem;
      },
    ),
  deleteOneAsActive: carouselItemOwnerProcedure
    .use(enforceRoleOrAdmin(AccountRoles.MODIFY_HOMEPAGE_CAROUSEL))
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

      revalidateTag("home-page-carousel", "max");

      return deletedItem;
    }),
});
