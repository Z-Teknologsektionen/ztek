import { unstable_cache } from "next/cache";
import { prisma } from "~/server/db";

// https://nextjs.org/docs/app/api-reference/functions/unstable_cache
/* Inte optimal lösning men förhoppningsvis blir denna stabil inom en snar framtid */
export const getDocumentGroupsWithDocuments = unstable_cache(
  async () =>
    await prisma.documentGroup.findMany({
      where: {
        Document: {
          some: {
            id: {
              not: undefined,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        extraText: true,
        Document: {
          select: {
            id: true,
            isPDF: true,
            title: true,
            url: true,
          },
        },
      },
    }),
  ["document-groups-with-documents"],
  { revalidate: false, tags: ["documents", "document-groups"] },
);
