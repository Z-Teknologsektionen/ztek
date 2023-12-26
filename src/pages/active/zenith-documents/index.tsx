import type { NextPage } from "next";
import ZenithDocumentTable from "~/components/data-table/zenith-documents/document-table";
import RoleWrapper from "~/components/layout/RoleWrapper";
import SectionWrapper from "~/components/layout/SectionWrapper";

const ZenithDocumentsPage: NextPage = () => {
  return (
    <RoleWrapper accountRole="MODIFY_ZENITH_DOCUMENTS">
      <SectionWrapper>
        <ZenithDocumentTable />
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default ZenithDocumentsPage;
