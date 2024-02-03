import { z } from "zod";
import { objectId } from "~/server/api/helpers/customZodTypes";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createOldCommitteeSchema } from "../helpers/schemas/oldCommittee";

export const oldCommitteeRouter = createTRPCRouter({
  getManyByCommitteeId: protectedProcedure
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
          members: {
            select: {
              name: true,
              nickName: true,
              order: true,
            },
          },
          updatedAt: true,
        },
      });
    }),
  createOldCommittee: protectedProcedure.input(createOldCommitteeSchema).mutation(({ctx, input: {
    name,
    year,
    image,
    logo,
    members,
    belongsToCommitteeId
  }}) => {
    return ctx.prisma.oldCommittee.create({
      data: {
        name,
        year,
        image,
        members: {
                create: members.map(member => ({
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
      }
    });
});
