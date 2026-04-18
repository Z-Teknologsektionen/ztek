/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { initTRPC } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type Session } from "next-auth";
import superjson from "superjson";
import { ZodError } from "zod";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db";

/** Type of tRPC context, which will be accessible to all procedures */
export type TRPCContext = { session: Session | null; prisma: typeof prisma };

/** Creates a context from the headers used to request the procedure */
export const createTRPCContext = async ({
  req,
  res,
}: CreateNextContextOptions): Promise<TRPCContext> => {
  const session = await getServerAuthSession([req, res]); // Get the session from the server using the getServerSession wrapper function
  return { session, prisma };
};

/** tRPC root object, whose properties are the source of all other tRPC related objects (except for tRPC client)*/
export const trpc = initTRPC.context<TRPCContext>().create({
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
