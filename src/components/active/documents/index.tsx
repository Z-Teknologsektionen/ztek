import { AccountRoles } from "@prisma/client";
import type { FC } from "react";
import { AdvancedDataTable } from "~/components/data-table/advanced-data-table";
import RoleWrapper from "~/components/layout/RoleWrapper";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { api } from "~/utils/api";
import { documentColumns } from "./document-columns";
import { documentGroupColumns } from "./document-group-columns";
import { DocumentGroupTableToolbar } from "./document-group-table-toolbar";
import { DocumentTableToolbar } from "./document-table-toolbar";

const EditDocumentsTab: FC = () => {
  const {
    data: documents,
    isLoading: isLoadingDocuments,
    isError: isDocumentError,
  } = api.document.getAllAsAuthed.useQuery();
  const {
    data: documentGroups,
    isLoading: isLoadingDocumentGroups,
    isError: isDocumentGroupError,
  } = api.document.getAllGroupsAsAuthed.useQuery();

  return (
    <RoleWrapper accountRole={AccountRoles.MODIFY_DOCUMENTS}>
      <SectionWrapper>
        <AdvancedDataTable
          columns={documentColumns}
          data={documents || []}
          error={isDocumentError}
          loading={isLoadingDocuments}
          toolbar={DocumentTableToolbar}
          usePagination={true}
        />
      </SectionWrapper>
      <SectionWrapper>
        <AdvancedDataTable
          columns={documentGroupColumns}
          data={documentGroups || []}
          error={isDocumentGroupError}
          loading={isLoadingDocumentGroups}
          toolbar={DocumentGroupTableToolbar}
          usePagination={false}
        />
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default EditDocumentsTab;
