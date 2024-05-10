import { updateUserRolesSchema } from "~/schemas/user";
import {
  createTRPCRouter,
  organizationManagementProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  updateUserRolesAsAuthed: organizationManagementProcedure
    .input(updateUserRolesSchema)
    .mutation(({ ctx, input: { id, roles } }) => {
      return ctx.prisma.user.update({
        where: {
          id,
        },
        data: {
          roles,
          updatedByEmail: ctx.session.user.email,
        },
      });
    }),
});
