import { unstable_cache } from "next/cache";
import { prisma } from "~/server/db";

export const getOldCommitteeByCommitteeId = unstable_cache(
  async (belongsToCommitteeId: string) => {
    const oldCommittees = await prisma.oldCommittee.findMany({
      where: {
        belongsToCommitteeId,
      },
      select: {
        id: true,
        name: true,
        year: true,
        image: true,
        logo: true,
        members: {
          select: {
            name: true,
            nickName: true,
            order: true,
            role: true,
          },
        },
      },
      orderBy: [{ year: "desc" }],
    });

    return oldCommittees;
  },
  ["getOldCommitteeByCommitteeId"],
  {
    tags: ["committee", "oldCommittee"],
    revalidate: false,
  },
);
