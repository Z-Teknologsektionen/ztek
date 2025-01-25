import { createTRPCRouter } from "~/server/api/trpc";
import { committeeRouter } from "./routers/committee";
import { committeeMemberRouter } from "./routers/committee-member";
import { documentRouter } from "./routers/document";
import { emailRouter } from "./routers/email";
import { homePageCarouselRouter } from "./routers/home-page-carousel";
import { oldCommitteeRouter } from "./routers/old-committee";
import { programBoardRouter } from "./routers/program-board";
import { userRouter } from "./routers/user";
import { zenithMediaRouter } from "./routers/zenith-media";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  committee: committeeRouter,
  oldCommittee: oldCommitteeRouter,
  member: committeeMemberRouter,
  document: documentRouter,
  programBoard: programBoardRouter,
  user: userRouter,
  zenithMedia: zenithMediaRouter,
  homePageCarousel: homePageCarouselRouter,
  email: emailRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
