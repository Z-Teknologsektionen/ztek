import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db";
import type { TRPCContext } from "~/server/trpc/init";
import { appRouter } from "~/server/trpc/root";

const createSessionedContext = async (): Promise<TRPCContext> => ({
  session: await getServerAuthSession(),
  prisma: prisma,
});
const createPublicContext = async (): Promise<TRPCContext> => ({
  session: null,
  prisma: prisma,
});

// server side trpc entry points
export const caller = appRouter.createCaller(createSessionedContext);
export const cacheableCaller = appRouter.createCaller(createPublicContext);
