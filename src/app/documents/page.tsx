import type { Metadata } from "next";
import type { FC } from "react";
import DocumentsAccordionItem from "~/components/documents/documents-accordion-item";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import { Accordion } from "~/components/ui/accordion";
import { prisma } from "~/server/db";

export const metadata: Metadata = {
  title: "Dokument",
  description: "Här kan du hitta alla Z-teknologsektionens dokument",
};

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

const DocumentsPage: FC = async () => {
  const documentGroups = await getDocumentGroupsWithDocuments();

  return (
    <SectionWrapper>
      <SectionTitle center>Dokument</SectionTitle>
      <Accordion type="multiple">
        {documentGroups.map(({ id, Document: documents, extraText, name }) => (
          <DocumentsAccordionItem
            key={id}
            documents={documents}
            extraText={extraText}
            name={name}
          />
        ))}
      </Accordion>
    </SectionWrapper>
  );
};

export default DocumentsPage;
