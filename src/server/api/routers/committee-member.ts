import { z } from "zod";
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
    .mutation(({ ctx, input: { id, name, nickName, image, order } }) => {
      const member = ctx.prisma.committeeMember.update({
        where: {
          id,
        },
        data: {
          image,
          name,
          nickName,
          order,
          updatedByEmail: ctx.session.user.email,
        },
      });
      return member;
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

        return ctx.prisma.committeeMember.create({
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

        return ctx.prisma.committeeMember.update({
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
      },
    ),
  deleteMemberAsAuthed: organizationManagementProcedure
    .input(
      z.object({
        id: objectId,
      }),
    )
    .mutation(({ ctx, input: { id } }) => {
      return ctx.prisma.committeeMember.delete({
        where: {
          id,
        },
      });
    }),
});
