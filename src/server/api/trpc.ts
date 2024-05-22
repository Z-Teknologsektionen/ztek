/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type Session } from "next-auth";

import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db";

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
import { AccountRoles } from "@prisma/client";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { z, ZodError } from "zod";
import { objectId, standardString } from "~/schemas/helpers/custom-zod-helpers";
import {
  userHasAdminAccess,
  userHasRequiredRole,
} from "~/utils/user-has-correct-role";
import { validateZaloonenBookingHash } from "./helpers/zaloonen-booking";

type CreateContextOptions = {
  session: Session | null;
};

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 */
const createInnerTRPCContext = (opts: CreateContextOptions) => ({
  session: opts.session,
  prisma,
});

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  // Get the session from the server using the getServerSession wrapper function
  const session = await getServerAuthSession({ req, res });

  return createInnerTRPCContext({
    session,
  });
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

/** Reusable middleware that enforces users are logged in before running the procedure. */
const enforceUserIsAuthed = t.middleware(({ ctx: { session }, next }) => {
  if (!session || !session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...session, user: session.user },
    },
  });
});

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);

const enforceUserIsAdmin = t.middleware(({ ctx: { session }, next }) => {
  if (session === null || !userHasAdminAccess(session.user.roles)) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...session, user: session.user },
    },
  });
});

const enforceUserHasRoleOrAdmin = (role: AccountRoles) =>
  t.middleware(({ ctx: { session }, next }) => {
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
        session: { ...session, user: session.user },
      },
    });
  });

export const adminProcedure = t.procedure.use(enforceUserIsAdmin);

export const programBoardProcedure = t.procedure.use(
  enforceUserHasRoleOrAdmin(AccountRoles.MODIFY_PROGRAM_BOARD),
);

export const documentProcedure = t.procedure.use(
  enforceUserHasRoleOrAdmin(AccountRoles.MODIFY_DOCUMENTS),
);

export const zenithMediaProcedure = t.procedure.use(
  enforceUserHasRoleOrAdmin(AccountRoles.MODIFY_ZENITH_MEDIA),
);

export const organizationManagementProcedure = t.procedure.use(
  enforceUserHasRoleOrAdmin(AccountRoles.ORGANIZATION_MANAGEMENT),
);

export const zaloonenProcedure = t.procedure.use(
  enforceUserHasRoleOrAdmin(AccountRoles.MODIFY_ZALOONEN_BOOKING),
);

const enforceZaloonenBookingHash = t.middleware(
  async ({ ctx, next, input }) => {
    const safeParse = z
      .object({ hash: standardString, id: objectId })
      .safeParse(input);

    if (!safeParse.success)
      throw new TRPCError({ message: "Ogiltig input", code: "BAD_REQUEST" });

    const zaloonenBooking = await validateZaloonenBookingHash({
      hash: safeParse.data.hash,
      id: safeParse.data.id,
      prisma,
    }).catch((error) => {
      if (error instanceof Error)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: error.message,
        });
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Ogiltig input",
      });
    });

    return next({
      ctx: {
        // infers the `session` as non-nullable
        ...ctx,
        booking: zaloonenBooking,
      },
    });
  },
);

export const zaloonenProcedureWithHash = t.procedure
  .input(z.object({ hash: standardString, id: objectId }))
  .use(enforceZaloonenBookingHash);
