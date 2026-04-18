import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db";
import { TRPCContext } from "~/server/trpc/init";
import { appRouter } from "~/server/trpc/root";

const createContext = async (): Promise<TRPCContext> => ({
  session: await getServerAuthSession(),
  prisma: prisma,
});

// server side trpc entry point
export const caller = appRouter.createCaller(createContext);
