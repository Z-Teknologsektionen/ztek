import { z } from "zod";
import { objectId, standardBoolean } from "~/server/api/helpers/customZodTypes";
import {
  createOldCommitteeSchema,
  updateOldCommitteeSchema,
} from "~/server/api/helpers/schemas/oldCommittee";
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
  getManyByCommitteeIdAsUser: protectedProcedure
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
      ({
        ctx,
        input: { name, year, image, logo, members, belongsToCommitteeId },
      }) => {
        return ctx.prisma.oldCommittee.create({
          data: {
            name,
            year,
            image,
            logo,
            members: {
              set: members.map((member) => ({
                name: member.name,
                nickName: member.nickName,
                role: member.role,
                order: member.order,
              })),
            },
            belongsToCommittee: {
              connect: {
                id: belongsToCommitteeId,
              },
            },
          },
        });
      },
    ),
  updateOneAsActive: protectedProcedure
    .input(updateOldCommitteeSchema)
    .mutation(
      ({
        ctx,
        input: { id, name, year, image, logo, belongsToCommitteeId, members },
      }) => {
        return ctx.prisma.oldCommittee.update({
          where: {
            id,
          },
          data: {
            name,
            year,
            image,
            logo,
            belongsToCommitteeId,
            members: members
              ? {
                  set: members.map((member) => ({
                    name: member.name,
                    nickName: member.nickName,
                    role: member.role,
                    order: member.order,
                  })),
                }
              : undefined,
          },
        });
      },
    ),
  deleteOneAsActive: protectedProcedure
    .input(
      z.object({
        id: objectId,
      }),
    )
    .mutation(({ ctx, input: { id } }) => {
      return ctx.prisma.oldCommittee.delete({
        where: {
          id,
        },
      });
    }),
});
