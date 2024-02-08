import { z } from "zod";
import { objectId } from "~/server/api/helpers/customZodTypes";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  createOldCommitteeSchema,
  updateOldCommitteeSchema,
} from "../helpers/schemas/oldCommittee";

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
          belongsToCommitteeId,
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
        },
      });
    }),
  createOldCommittee: protectedProcedure
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
                nickName: member.nickName || "",
                role: member.role || "",
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
  updateOne: protectedProcedure
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
            members: {
              set: members.map((member) => ({
                name: member.name,
                nickName: member.nickName || "",
                role: member.role || "",
                order: member.order,
              })),
            },
          },
        });
      },
    ),
  deleteOne: protectedProcedure
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
