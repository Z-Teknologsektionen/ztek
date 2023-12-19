import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { prisma } from "~/server/db";
import { appRouter } from "../root";

const ssg = createServerSideHelpers({
  router: appRouter,
  ctx: { prisma: prisma, session: null },
  transformer: superjson, // optional - adds superjson serialization
});
export default ssg;
