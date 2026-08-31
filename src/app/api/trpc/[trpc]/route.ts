// eslint-disable-next-line check-file/folder-naming-convention
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db";
import { appRouter } from "~/server/trpc/root";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const handler = async (req: Request) => {
  const session = await getServerAuthSession();
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({
      prisma,
      session,
    }),
  });
};

export { handler as GET, handler as POST };
