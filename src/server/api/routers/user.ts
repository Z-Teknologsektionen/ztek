import { TRPCError } from "@trpc/server";
import { updateUserRolesSchema } from "~/schemas/user";
import {
  createTRPCRouter,
  organizationManagementProcedure,
} from "~/server/api/trpc";
import { canUserEditUser } from "~/utils/can-user-edit-user";

export const userRouter = createTRPCRouter({
  updateUserRolesAsAuthed: organizationManagementProcedure
    .input(updateUserRolesSchema)
    .mutation(({ ctx: { prisma, session }, input: { id, roles } }) => {
      if (!canUserEditUser(session.user.roles, roles))
        throw new TRPCError({
          code: "FORBIDDEN",
          message:
            "Du får inte redigera denna medlemm. Kontakta en användare med högre behövrighet än dig",
        });

      return prisma.user.update({
        where: {
          id,
        },
        data: {
          roles,
        },
      });
    }),
});
