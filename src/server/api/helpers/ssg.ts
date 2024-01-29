import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";

const ssg = createServerSideHelpers({
  router: appRouter,
  ctx: { prisma: prisma, session: null },
  transformer: superjson, // optional - adds superjson serialization
});
export default ssg;
