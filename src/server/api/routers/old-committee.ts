import { revalidateTag } from "next/cache";
import { z } from "zod";
import { deleteFileFromSftpServer } from "~/app/api/sftp/utils/sftp-engine";
import { env } from "~/env.mjs";
import {
  objectId,
  standardBoolean,
} from "~/schemas/helpers/common-zod-helpers";
import {
  createOldCommitteeSchema,
  updateOldCommitteeSchema,
} from "~/schemas/old-committee";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const oldCommitteeRouter = createTRPCRouter({
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
        isAdmin: standardBoolean,
      }),
    )
    .query(({ ctx, input: { belongsToCommitteeId, isAdmin } }) => {
      return ctx.prisma.oldCommittee.findMany({
        where: {
          belongsToCommitteeId: isAdmin ? undefined : belongsToCommitteeId,
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
        input: { name, year, image, logo, members, belongsToCommitteeId },
      }) => {
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
  updateOneAsActive: protectedProcedure
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
  deleteOneAsActive: protectedProcedure
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
