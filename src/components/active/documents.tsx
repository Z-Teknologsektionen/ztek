import { AccountRoles } from "@prisma/client";
import type { FC } from "react";
import DocuemntGroupTable from "~/components/data-table/document-group/document-group-table";
import DocumentTable from "~/components/data-table/document/document-table";
import RoleWrapper from "~/components/layout/RoleWrapper";
import SectionWrapper from "~/components/layout/SectionWrapper";

const EditDocumentsPage: FC = () => {
  return (
    <RoleWrapper accountRole={AccountRoles.MODIFY_DOCUMENTS}>
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