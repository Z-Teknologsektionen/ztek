import type { NextPage } from "next";
import DocuemntGroupTable from "~/components/data-table/document-group/document-group-table";
import DocumentTable from "~/components/data-table/document/document-table";
import RoleWrapper from "~/components/layout/RoleWrapper";
import SectionWrapper from "~/components/layout/SectionWrapper";

const EditDocumentsPage: NextPage = () => {
  return (
    <RoleWrapper accountRole="MODIFY_DOCUMENTS">
      <SectionWrapper>
        <DocumentTable />
      </SectionWrapper>
      <SectionWrapper>
        <DocuemntGroupTable />
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default EditDocumentsPage;
