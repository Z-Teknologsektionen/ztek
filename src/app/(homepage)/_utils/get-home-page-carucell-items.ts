import { unstable_cache } from "next/cache";
import { prisma } from "~/server/db";

export const getHomePageCarucellItems = unstable_cache(
  async () =>
    await prisma.homePageCarucellItem.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                endDateTime: {
                  gte: new Date(),
                },
              },
              {
                endDateTime: null,
              },
            ],
          },
          {
            OR: [
              {
                startDateTime: {
                  lte: new Date(),
                },
              },
              {
                startDateTime: null,
              },
            ],
          },
        ],
      },
    }),
  undefined,
  { revalidate: false, tags: ["home-page-carucell"] },
);
