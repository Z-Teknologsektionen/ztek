import { AccountRoles } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { objectId } from "~/schemas/helpers/common-zod-helpers";
import { userHasRequiredRole } from "~/utils/user-has-correct-role";
import { trpc } from "./init";

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
 * @param `role` - Lowerst account role needed for authorization
 */
export const enforceRole = (role: AccountRoles) =>
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

/** Accessible only if signed in */
export const protectedProcedure = trpc.procedure.use(enforceSignedIn);

/** Authorized to mutate ONLY objects whose `committeeId` property matches yours. Input schema MUST contain `committeId` */
export const committeeProcedure = protectedProcedure
  .input(z.object({ committeeId: objectId }))
  .use(({ input, ctx, next }) => {
    if (input.committeeId !== ctx.session.user.committeeId)
      throw new TRPCError({ code: "UNAUTHORIZED" });
    return next();
  });
