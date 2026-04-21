import type { Metadata } from "next";
import type { FC } from "react";
import DocumentsAccordionItem from "~/components/accordion/documents-accordion-item";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import { Accordion } from "~/components/ui/accordion";
import { cached } from "~/utils/server-side-cache";
import { caller } from "~/utils/trpc-client/caller";

export const metadata: Metadata = {
  title: "Dokument",
  description: "Här kan du hitta alla Z-teknologsektionens dokument",
};

const DocumentsPage: FC = async () => {
  const documentGroups = await cached(caller.document.getAllNonEmpty, [
    "documents",
    "document-groups",
  ])();

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
