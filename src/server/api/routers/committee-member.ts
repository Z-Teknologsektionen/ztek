import { TRPCError } from "@trpc/server";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { deleteFileFromSftpServer } from "~/app/api/sftp/utils/sftp-engine";
import { env } from "~/env.mjs";
import { objectId } from "~/schemas/helpers/custom-zod-helpers";
import {
  createMemberSchema,
  updateMemberAsActiveSchema,
  updateMemberSchema,
} from "~/schemas/member";
import {
  createTRPCRouter,
  organizationManagementProcedure,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { canCurrentUserModifyTargetRoleUser } from "~/utils/can-user-edit-user";

export const committeeMemberRouter = createTRPCRouter({
  getOneByEmail: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .query(({ ctx, input: { email } }) => {
      return ctx.prisma.committeeMember.findFirstOrThrow({
        where: {
          email: email,
        },
        select: {
          name: true,
          email: true,
          phone: true,
          image: true,
          committee: true,
          nickName: true,
        },
      });
    }),
  updateMemberAsActive: protectedProcedure
    .input(updateMemberAsActiveSchema)
    .mutation(({ ctx, input: { id, name, nickName, image, order, phone } }) => {
      const updatedMember = ctx.prisma.committeeMember.update({
        where: {
          id,
        },
        data: {
          image,
          name,
          nickName,
          phone,
          order,
          updatedByEmail: ctx.session.user.email,
        },
      });

      revalidateTag("committeeMembers");

      return updatedMember;
    }),
  getCommitteeMembersAsAuthed: organizationManagementProcedure
    .input(
      z
        .object({
          committeeId: objectId.optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const members = await ctx.prisma.committeeMember.findMany({
        where: {
          committeeId: input?.committeeId,
        },
        include: {
          committee: {
            select: {
              name: true,
              id: true,
            },
          },
          user: {
            select: {
              roles: true,
            },
          },
        },
      });
      return members.map(({ committee, user, ...member }) => ({
        ...member,
        userRoles: user?.roles,
        committeeName: committee.name,
        committeeId: committee.id,
      }));
    }),
  createMemberAsAuthed: organizationManagementProcedure
    .input(createMemberSchema)
    .mutation(
      async ({
        ctx,
        input: { committeeId, nickName, phone, email, name, order, role },
      }) => {
        const user = await ctx.prisma.user.findUnique({
          where: {
            email: email,
          },
          select: {
            id: true,
          },
        });

        const createdMember = await ctx.prisma.committeeMember.create({
          data: {
            email,
            role,
            committeeId,
            name,
            nickName,
            order,
            phone,
            userId: user?.id,
            updatedByEmail: ctx.session.user.email,
            createdByEmail: ctx.session.user.email,
          },
          select: {
            name: true,
            committee: {
              select: {
                name: true,
              },
            },
          },
        });

        revalidateTag("committeeMembers");

        return createdMember;
      },
    ),
  updateMemberAsAuthed: organizationManagementProcedure
    .input(updateMemberSchema)
    .mutation(
      async ({
        ctx,
        input: {
          id,
          nickName,
          phone,
          email,
          name,
          order,
          role,
          committeeId,
          image,
        },
      }) => {
        const user = await ctx.prisma.user.findUnique({
          where: {
            email: email,
          },
          select: {
            id: true,
          },
        });

        const updatedMember = await ctx.prisma.committeeMember.update({
          where: {
            id,
          },
          data: {
            email,
            image,
            role,
            committeeId,
            name,
            nickName,
            order,
            phone,
            userId: user?.id,
            updatedByEmail: ctx.session.user.email,
          },
        });

        revalidateTag("committeeMembers");

        return updatedMember;
      },
    ),
  deleteMemberAsAuthed: organizationManagementProcedure
    .input(
      z.object({
        id: objectId,
      }),
    )
    .mutation(async ({ ctx: { prisma, session }, input: { id } }) => {
      const member = await prisma.committeeMember
        .findUniqueOrThrow({
          where: {
            id,
          },
          include: {
            user: {
              select: {
                roles: true,
              },
            },
          },
        })
        .catch(() => {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Kunde inte hitta användaren du försökte ta bort",
          });
        });
      if (
        !canCurrentUserModifyTargetRoleUser(
          session.user.roles,
          member.user?.roles,
        )
      )
        throw new TRPCError({
          code: "FORBIDDEN",
          message:
            "Du får inte redigera denna medlem. Kontakta en användare med högre behörighet än dig",
        });

      const deletedMember = await prisma.committeeMember.delete({
        where: {
          id,
        },
      });

      // Delete the image on SFTP if it exists
      if (
        deletedMember.image &&
        deletedMember.image.startsWith(env.NEXT_PUBLIC_SFTP_BASE_URL)
      ) {
        try {
          deleteFileFromSftpServer({
            url: deletedMember.image,
          });
        } catch (error) {
          console.error("Failed to delete image from SFTP:", error);
        }
      }

      revalidateTag("committeeMembers");

      return deletedMember;
    }),
});
