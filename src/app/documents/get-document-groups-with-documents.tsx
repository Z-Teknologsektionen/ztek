import { prisma } from "~/server/db";

export const getDocumentGroupsWithDocuments = async (): Promise<
  {
    Document: {
      isPDF: boolean;
      title: string;
      url: string;
    }[];
    extraText: string;
    id: string;
    name: string;
  }[]
> =>
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
  });
