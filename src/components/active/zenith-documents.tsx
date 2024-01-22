import type { FC } from "react";
import ZenithDocumentTable from "~/components/data-table/zenith-documents/zenith-document-table";
import RoleWrapper from "~/components/layout/RoleWrapper";
import SectionWrapper from "~/components/layout/SectionWrapper";

const ZenithDocumentsTab: FC = () => {
  return (
    <RoleWrapper accountRole="MODIFY_ZENITH_DOCUMENTS">
      <SectionWrapper>
        <ZenithDocumentTable />
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default ZenithDocumentsTab;
