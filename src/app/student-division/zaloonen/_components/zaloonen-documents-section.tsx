"use client";

import type { FC } from "react";
import DocumentsAccordionItem from "~/components/accordion/documents-accordion-item";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import StyledLink from "~/components/layout/styled-link";
import { Accordion } from "~/components/ui/accordion";
import { api } from "~/utils/api";

const DOCUMENT_GROUP_KEY = "Dokument för Zaloonen";

export const ZaloonenDocumentsSection: FC = () => {
  const { data, isLoading, isError } = api.document.getOneGroupByName.useQuery({
    name: DOCUMENT_GROUP_KEY,
  });

  return (
    <SectionWrapper className="py-4">
      {(isError || isLoading) && <SectionTitle>Dokument</SectionTitle>}
      {isError && (
        <p>
          Du kan hitta Zaloonens dokument{" "}
          <StyledLink href="/documents">här</StyledLink>
        </p>
      )}
      {isLoading && <p>Försöker hämta Zaloonens dokument...</p>}
      {data && (
        <Accordion type="single" collapsible>
          <DocumentsAccordionItem {...{ documents: data.Document, ...data }} />
        </Accordion>
      )}
    </SectionWrapper>
  );
};
