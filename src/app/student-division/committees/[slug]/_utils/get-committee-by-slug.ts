import { unstable_cache } from "next/cache";
import { prisma } from "~/server/db";

// https://nextjs.org/docs/app/api-reference/functions/unstable_cache
/* Inte optimal lösning men förhoppningsvis blir denna stabil inom en snar framtid */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getCommitteeBySlug = unstable_cache(
  async (slug: string) => {
    const committee = await prisma.committee.findUniqueOrThrow({
      where: {
        slug: slug,
      },
      select: {
        id: true,
        name: true,
        description: true,
        email: true,
        image: true,
        electionPeriods: true,
        socialLinks: true,
        document: {
          select: {
            url: true,
            isPDF: true,
          },
        },
        members: {
          where: {
            OR: [
              {
                name: {
                  not: "",
                },
              },
              {
                nickName: {
                  not: "",
                },
              },
            ],
          },
          orderBy: [{ order: "desc" }],
          select: {
            id: true,
            name: true,
            nickName: true,
            role: true,
            image: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return committee;
  },
  ["getCommitteeBySlug"],
  { tags: ["committee"], revalidate: false },
);
