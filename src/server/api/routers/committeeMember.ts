import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { objectId } from "../helper/customZodTypes";

export const committeeMemberRouter = createTRPCRouter({
  updateOne: protectedProcedure
    .input(
      z.object({
        id: objectId,
        name: z.string().optional(),
        nickName: z.string().optional(),
        image: z.string().optional(),
        order: z.number().min(0).max(99),
      })
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
});
