import { updateUserRolesSchema } from "~/server/api/helpers/schemas/user";
import { adminProcedure, createTRPCRouter } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAllUserRolesAsAdmin: adminProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      select: {
        email: true,
        id: true,
        roles: true,
      },
    });
  }),
  updateUserRolesAsAdmin: adminProcedure
    .input(updateUserRolesSchema)
    .mutation(({ ctx, input: { id, roles } }) => {
      return ctx.prisma.user.update({
        where: {
          id,
        },
        data: {
          roles,
        },
      });
    }),
});
