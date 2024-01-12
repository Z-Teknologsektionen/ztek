import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { objectId } from "../helpers/customZodTypes";
import {
  createMemberSchema,
  updateMemberAsActiveSchema,
  updateMemberSchema,
} from "../helpers/schemas/members";

export const committeeMemberRouter = createTRPCRouter({
  syncMembersAndUsers: adminProcedure.mutation(async ({ ctx }) => {
    const allUsers = await ctx.prisma.user.findMany({
      select: {
        email: true,
        id: true,
      },
    });

    allUsers.map(async (user) => {
      if (user.email === null) return;
      await ctx.prisma.committeeMember.updateMany({
        where: {
          email: user.email,
        },
        data: {
          userId: user.id,
        },
      });
    });
  }),
  getOneById: adminProcedure
    .input(
      z.object({
        id: objectId,
      }),
    )
    .query(({ ctx, input: { id } }) => {
      return ctx.prisma.committeeMember.findUniqueOrThrow({
        where: {
          id,
        },
      });
    }),
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
        },
      });
      return member;
    }),
  getCommitteeMembersAsAdmin: adminProcedure
    .input(
      z.object({
        committeeId: objectId.optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const members = await ctx.prisma.committeeMember.findMany({
        where: {
          committeeId: input.committeeId,
        },
        include: {
          committee: {
            select: {
              name: true,
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
      }));
    }),
  createMemberAsAdmin: adminProcedure
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
  updateMemberAsAdmin: adminProcedure
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
          },
        });
      },
    ),
  deleteMemberAsAdmin: adminProcedure
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
