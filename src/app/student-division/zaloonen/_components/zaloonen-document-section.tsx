import { Suspense, type FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import DocumentsAccordionItem from "~/components/accordion/documents-accordion-item";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";

import { getOneDocumentGroupByName } from "~/app/student-division/_utils/get-one-document-group-by-name";
import StyledLink from "~/components/layout/styled-link";
import { Accordion } from "~/components/ui/accordion";

const DOCUMENT_GROUP_KEY = "Dokument för Zaloonen";

export const ZaloonenDocumentSection: FC = () => {
  return (
    <SectionWrapper className="py-4">
      <ErrorBoundary fallback={<ZaloonenDocumentsError />}>
        <Suspense fallback={<ZaloonenDocumentsLoading />}>
          <ZaloonenDocumentsAccordion />
        </Suspense>
      </ErrorBoundary>
    </SectionWrapper>
  );
};

const ZaloonenDocumentsAccordion: FC = async () => {
  const documentGroup = await getOneDocumentGroupByName(DOCUMENT_GROUP_KEY);

  return (
    <Accordion type="single" collapsible>
      <DocumentsAccordionItem
        documents={documentGroup.documents}
        extraText={documentGroup.extraText}
        name={documentGroup.name}
      />
    </Accordion>
  );
};

const ZaloonenDocumentsLoading: FC = () => {
  return (
    <>
      <SectionTitle>Dokument</SectionTitle>
      <p>Försöker hämta Zaloonens dokument...</p>
    </>
  );
};

const ZaloonenDocumentsError: FC = () => {
  return (
    <>
      <SectionTitle>Dokument</SectionTitle>
      <p>
        Du kan hitta Zaloonens dokument{" "}
        <StyledLink href="/documents">här</StyledLink>
      </p>
    </>
  );
};
