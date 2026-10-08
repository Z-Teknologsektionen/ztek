import { AccountRoles } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { updateUserRolesSchema } from "~/schemas/user";
import { trpc } from "~/server/trpc/init";
import { canCurrentUserModifyTargetRoleUser } from "~/utils/can-user-edit-user";
import {
  enforceRoleOrAdmin,
  protectedProcedure,
} from "~/server/trpc/procedure-builders";

const organizationManagementProcedure = protectedProcedure.use(
  enforceRoleOrAdmin(AccountRoles.ORGANIZATION_MANAGEMENT),
);

export const userRouter = trpc.router({
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
