import { unstable_cache } from "next/cache";
import { prisma } from "~/server/db";

export const getAllCommittees = unstable_cache(
  () => {
    return prisma.committee.findMany({
      orderBy: [{ order: "desc" }],
      select: {
        name: true,
        role: true,
        committeeType: true,
        slug: true,
        image: true,
        electionPeriods: true,
      },
    });
  },
  undefined,
  { tags: ["committee"] },
);
