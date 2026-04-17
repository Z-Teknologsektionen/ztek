import { AccountRoles } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { deleteFileFromSftpServer } from "~/app/api/sftp/utils/sftp-engine";
import { env } from "~/env.mjs";
import { objectId } from "~/schemas/helpers/common-zod-helpers";
import {
  createOldCommitteeSchema,
  updateOldCommitteeSchema,
} from "~/schemas/old-committee";
import { trpc, TRPCContext } from "~/server/trpc/init";
import { userHasAdminAccess } from "~/utils/user-has-correct-role";
import {
  committeeProcedure,
  enforceRoleOrAdmin,
  protectedProcedure,
  publicProcedure,
} from "../procedure-builders";

// u may edit any committee's old instances
const organizationManagementProcedure = protectedProcedure.use(
  enforceRoleOrAdmin(AccountRoles.ORGANIZATION_MANAGEMENT),
);

// u may edit only ur committee's old instances
const activeProcedure = committeeProcedure(
  async (ctx: TRPCContext, id: string) => {
    const item = await ctx.prisma.oldCommittee.findUnique({
      where: { id },
      select: { belongsToCommitteeId: true },
    });
    return item?.belongsToCommitteeId || null;
  },
);

export const oldCommitteeRouter = trpc.router({
  getManyByCommitteeId: publicProcedure
    .input(
      z.object({
        belongsToCommitteeId: objectId,
      }),
    )
    .query(({ ctx, input: { belongsToCommitteeId } }) => {
      return ctx.prisma.oldCommittee.findMany({
        where: {
          belongsToCommitteeId: belongsToCommitteeId,
        },
        select: {
          id: true,
          name: true,
          year: true,
          image: true,
          logo: true,
          members: {
            select: {
              name: true,
              nickName: true,
              order: true,
              role: true,
            },
          },
        },
        orderBy: [{ year: "desc" }],
      });
    }),
  getManyByCommitteeIdAsActive: protectedProcedure
    .input(
      z.object({
        belongsToCommitteeId: objectId,
      }),
    )
    .query(({ ctx, input: { belongsToCommitteeId } }) => {
      return ctx.prisma.oldCommittee.findMany({
        where: {
          belongsToCommitteeId: userHasAdminAccess(ctx.session.user.roles)
            ? undefined // admins retrieve ALL old committees, despite the procedure name
            : belongsToCommitteeId, // else retrieve only requested
        },
        select: {
          id: true,
          name: true,
          year: true,
          image: true,
          logo: true,
          members: {
            select: {
              name: true,
              nickName: true,
              order: true,
              role: true,
            },
          },
          updatedAt: true,
          belongsToCommitteeId: true,
          belongsToCommittee: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: [{ year: "desc" }, { updatedAt: "desc" }],
      });
    }),
  createOldCommitteeAsActive: protectedProcedure
    .input(createOldCommitteeSchema)
    .mutation(
      async ({
        ctx,
        ctx: {
          session: { user },
        },
        input: { name, year, image, logo, members, belongsToCommitteeId },
      }) => {
        // ownership check (could not be implemented with `committeeProcedure` for yet nonexistent db entry)
        if (
          !userHasAdminAccess(user.roles) &&
          belongsToCommitteeId !== user.committeeId
        )
          throw new TRPCError({ code: "FORBIDDEN" });

        // db operation
        const createdOldCommittee = await ctx.prisma.oldCommittee.create({
          data: {
            belongsToCommitteeId,
            name,
            year,
            image,
            logo,
            members,
            updatedByEmail: ctx.session.user.email,
            createdByEmail: ctx.session.user.email,
          },
        });

        revalidateTag("oldCommittee", "max");

        return createdOldCommittee;
      },
    ),
  updateOneAsActive: activeProcedure
    .input(updateOldCommitteeSchema)
    .mutation(
      async ({
        ctx,
        input: { id, name, year, image, logo, belongsToCommitteeId, members },
      }) => {
        const updatedOldCommittee = await ctx.prisma.oldCommittee.update({
          where: {
            id,
          },
          data: {
            name,
            year,
            image,
            logo,
            belongsToCommitteeId,
            members,
            updatedByEmail: ctx.session.user.email,
          },
        });

        revalidateTag("oldCommittee", "max");

        return updatedOldCommittee;
      },
    ),
  deleteOneAsActive: activeProcedure
    .input(
      z.object({
        id: objectId,
      }),
    )
    .mutation(async ({ ctx, input: { id } }) => {
      const deletedOldCommittee = await ctx.prisma.oldCommittee.delete({
        where: {
          id,
        },
      });

      // Check if it has images and delete them
      if (
        deletedOldCommittee.image &&
        deletedOldCommittee.image.startsWith(env.NEXT_PUBLIC_SFTP_BASE_URL)
      ) {
        try {
          await deleteFileFromSftpServer({ url: deletedOldCommittee.image });
        } catch (error) {
          console.error("Failed to delete old committee image:", error);
        }
      }
      if (
        deletedOldCommittee.logo &&
        deletedOldCommittee.logo.startsWith(env.NEXT_PUBLIC_SFTP_BASE_URL)
      ) {
        try {
          await deleteFileFromSftpServer({ url: deletedOldCommittee.logo });
        } catch (error) {
          console.error("Failed to delete old committee logo:", error);
        }
      }

      revalidateTag("oldCommittee", "max");

      return deletedOldCommittee;
    }),
});
