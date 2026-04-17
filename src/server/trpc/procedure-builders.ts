import type { AccountRoles } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { objectId } from "~/schemas/helpers/common-zod-helpers";
import {
  userHasAdminAccess,
  userHasRequiredRole,
} from "~/utils/user-has-correct-role";
import type { TRPCContext } from "./init";
import { trpc } from "./init";

const enforceSignedIn = trpc.middleware(({ ctx: { session }, next }) => {
  if (!session || !session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers `session` as non-nullable
      session: { ...session, user: session.user },
    },
  });
});

/**
 * @returns middleware for enforcing user has specified role
 * @param `role` - Lowest account role needed for authorization (ADMIN, and SUPER_ADMIN is higher)
 */
export const enforceRoleOrAdmin = (role: AccountRoles) =>
  trpc.middleware(({ ctx: { session }, next }) => {
    // is signed in
    if (!session || !session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    // has role or is admin
    if (!userHasRequiredRole(session.user.roles, role)) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    return next({
      ctx: {
        // infers `session` as non-nullable
        session: { ...session, user: session.user },
      },
    });
  });

/** No access conditions */
export const publicProcedure = trpc.procedure;

/** Authorized only if signed in */
export const protectedProcedure = trpc.procedure.use(enforceSignedIn);

/**
 * Authorized to mutate ONLY your (by `CommitteeId`) db entries. Procedure input MUST contain `id`.
 * @param getOwnerCommitteeId - function who must return the `committeeId` of the owning committee of a db entry (or return `null` if not found), given its `id` and the tRPC context.
 * @returns a `ProcedureBuilder<...>`.
 */
export const committeeProcedure = (
  getOwnerCommitteeId: (ctx: TRPCContext, id: string) => Promise<string | null>,
) => {
  return protectedProcedure
    .input(z.object({ id: objectId }))
    .use(async ({ ctx, next, input }) => {
      const usr = ctx.session.user;

      // admins skip checks
      if (!userHasAdminAccess(usr.roles)) {
        const committeeId = await getOwnerCommitteeId(ctx, input.id); // get owner of db entry (using use case supplied function)
        if (committeeId === null) throw new TRPCError({ code: "NOT_FOUND" });
        if (committeeId !== usr.committeeId)
          throw new TRPCError({ code: "FORBIDDEN" }); // if owner is not your committee, fail check
      }
      return next();
    });
};
