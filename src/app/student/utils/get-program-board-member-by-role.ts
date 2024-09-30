import { unstable_cache } from "next/cache";
import { prisma } from "~/server/db";

// https://nextjs.org/docs/app/api-reference/functions/unstable_cache
/* Inte optimal lösning men förhoppningsvis blir denna stabil inom en snar framtid */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getProgramBoardMemberByRole = unstable_cache(
  (role: string) =>
    prisma.programBoardMember.findFirst({
      where: {
        role,
      },
      select: {
        name: true,
        email: true,
        image: true,
        phone: true,
        role: true,
        url: true,
      },
    }),
  ["getProgramBoardMemberByRole"],
  { revalidate: false, tags: ["boardProgramMembers"] },
);

// https://nextjs.org/docs/app/api-reference/functions/unstable_cache
/* Inte optimal lösning men förhoppningsvis blir denna stabil inom en snar framtid */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getProgramBoard = unstable_cache(
  () =>
    prisma.programBoardMember.findMany({
      select: {
        name: true,
        role: true,
        phone: true,
        email: true,
        url: true,
        image: true,
        order: true,
      },
    }),
  ["getProgramBoard"],
  { revalidate: false, tags: ["boardProgramMembers"] },
);
