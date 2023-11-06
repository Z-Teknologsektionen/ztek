import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { objectId } from "../helpers/customZodTypes";
import {
  createNewMemberSchema,
  updateMemberSchema,
} from "../helpers/zodScheams";

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
  updateMemberAsActive: protectedProcedure
    .input(
      z.object({
        id: objectId,
        name: z.string().optional(),
        nickName: z.string().optional(),
        image: z.string().optional(),
        order: z.number().min(0).max(99),
      }),
    )
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
    .query(({ ctx, input }) => {
      return ctx.prisma.committeeMember.findMany({
        where: {
          committeeId: input.committeeId,
        },
      });
    }),
  createMemberAsAdmin: adminProcedure
    .input(createNewMemberSchema)
    .mutation(
      ({
        ctx,
        input: { committeeId, nickName, phone, email, name, order, role },
      }) => {
        return ctx.prisma.committeeMember.create({
          data: {
            email,
            role,
            committeeId,
            name,
            nickName,
            order,
            phone,
          },
          select: {
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
      ({
        ctx,
        input: { id, nickName, phone, email, name, order, role, committeeId },
      }) => {
        return ctx.prisma.committeeMember.update({
          where: {
            id,
          },
          data: {
            email,
            role,
            committeeId,
            name,
            nickName,
            order,
            phone,
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
