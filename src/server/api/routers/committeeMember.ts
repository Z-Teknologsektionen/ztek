import { z } from "zod";
import { objectId } from "~/server/api/helpers/customZodTypes";
import {
  createMemberSchema,
  updateMemberAsActiveSchema,
  updateMemberSchema,
} from "~/server/api/helpers/schemas/members";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const committeeMemberRouter = createTRPCRouter({
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
  getOneByUserId: protectedProcedure
    .input(z.object({ userId: objectId }))
    .query(({ ctx, input: { userId } }) => {
      return ctx.prisma.committeeMember.findFirstOrThrow({
        where: {
          userId: userId,
        },
        select: {
          id: true,
          committeeId: true,
          name: true,
          nickName: true,
          phone: true,
          image: true,
          order: true,
          role: true,
          email: true,
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
