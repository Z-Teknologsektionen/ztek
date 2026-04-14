import { AccountRoles } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { objectId } from "~/schemas/helpers/common-zod-helpers";
import {
  userHasAdminAccess,
  userHasRequiredRole,
} from "~/utils/user-has-correct-role";
import { trpc, TRPCContext } from "./init";

const enforceSignedIn = trpc.middleware(({ ctx: { session }, next }) => {
  if (!session || !session.user) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...session, user: session.user },
    },
  });
});

/**
 * @returns middleware for enforcing user has specified role
 * @param `role` - Lowerst account role needed for authorization (ADMIN, and SUPER_ADMIN is higher)
 */
export const enforceRoleOrAdmin = (role: AccountRoles) =>
  trpc.middleware(({ ctx: { session }, next }) => {
    // is signed in
    if (!session || !session.user) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    // has role or is admin
    if (!userHasRequiredRole(session.user.roles, role)) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        // infers the `session` as non-nullable
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
 * @param getCommitteeId - function who must return the `committeeId` of db entry, given its `id` and the tRPC context.
 * @returns a `ProcedureBuilder<...>`.
 */
export const committeeProcedure = (
  getCommitteeId: (ctx: TRPCContext, id: string) => Promise<string | null>,
) => {
  return protectedProcedure
    .input(z.object({ id: objectId }))
    .use(async ({ ctx, next, input }) => {
      const usr = ctx.session.user;

      // admins skip checks
      if (!userHasAdminAccess(usr.roles)) {
        const committeeId = await getCommitteeId(ctx, input.id); // get owner of db entry (using use case supplied function)
        if (committeeId === null) throw new TRPCError({ code: "NOT_FOUND" });
        if (committeeId !== usr.committeeId)
          throw new TRPCError({ code: "UNAUTHORIZED" }); // if owner is not your committee, fail check
      }
      return next();
    });
};
