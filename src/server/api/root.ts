import { createTRPCRouter } from "~/server/api/trpc";
import { committeeRouter } from "./routers/committee";
import { committeeMemberRouter } from "./routers/committeeMember";
import { documentRouter } from "./routers/document";
import { programBoardRouter } from "./routers/programBoard";
import { userRouter } from "./routers/user";
import { zenithMediaRouter } from "./routers/zenith-media";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  committee: committeeRouter,
  member: committeeMemberRouter,
  document: documentRouter,
  programBoard: programBoardRouter,
  user: userRouter,
  zenithMedia: zenithMediaRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
