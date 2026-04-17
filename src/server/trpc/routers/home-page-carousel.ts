import { AccountRoles } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { objectId } from "~/schemas/helpers/common-zod-helpers";
import {
  createHomePageCarouselSchema,
  updateHomePageCarouselSchema,
} from "~/schemas/home-page-carousel";
import type { TRPCContext } from "~/server/trpc/init";
import { trpc } from "~/server/trpc/init";
import { userHasAdminAccess } from "~/utils/user-has-correct-role";
import {
  committeeProcedure,
  enforceRoleOrAdmin,
  protectedProcedure,
} from "~/server/trpc/procedure-builders";

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

export const homePageCarouselRouter = trpc.router({
  getManyByCommitteeIdAsActive: carouselItemProcedure.query(({ ctx }) => {
    return ctx.prisma.homePageCarouselItem.findMany({
      where: {
        committeeId: userHasAdminAccess(ctx.session.user.roles) // if admin
          ? undefined // get all
          : ctx.session.user.committeeId, // else get yours
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
        // ownership check (could not be implemented with `committeeProcedure` for yet nonexistent db entry)
        if (!userHasAdminAccess(user.roles) && committeeId !== user.committeeId)
          throw new TRPCError({ code: "FORBIDDEN" });

        // db operation
        const createdItem = await ctx.prisma.homePageCarouselItem.create({
          data: {
            committeeId,
            imageCredit,
            imageUrl,
            linkToUrl,
            startDateTime,
            endDateTime,
            updatedByEmail: user.email,
            createdByEmail: user.email,
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
