import { unstable_cache } from "next/cache";
import { prisma } from "~/server/db";

export const getOneDocumentGroupByName = unstable_cache(
  async (name: string) => {
    const documentGroup = await prisma.documentGroup.findUniqueOrThrow({
      where: {
        name,
      },
      select: {
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
    });

    return documentGroup;
  },
  undefined,
  {
    revalidate: false,
    tags: ["documents", "document-groups"],
  },
);
