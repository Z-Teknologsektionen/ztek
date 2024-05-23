import { TRPCError } from "@trpc/server";
import { updateUserRolesSchema } from "~/schemas/user";
import {
  createTRPCRouter,
  organizationManagementProcedure,
} from "~/server/api/trpc";
import { canCurrentUserModifyTargetRoleUser } from "~/utils/can-user-edit-user";

export const userRouter = createTRPCRouter({
  updateUserRolesAsAuthed: organizationManagementProcedure
    .input(updateUserRolesSchema)
    .mutation(({ ctx: { prisma, session }, input: { id, roles } }) => {
      if (!canCurrentUserModifyTargetRoleUser(session.user.roles, roles))
        throw new TRPCError({
          code: "FORBIDDEN",
          message:
            "Du får inte redigera denna medlem. Kontakta en användare med högre behörighet än dig",
        });

      return prisma.user.update({
        where: {
          id,
        },
        data: {
          roles,
          updatedByEmail: session.user.email,
        },
      });
    }),
});
