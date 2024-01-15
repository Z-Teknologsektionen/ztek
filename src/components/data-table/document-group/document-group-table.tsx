import type { FC } from "react";
import { api } from "~/utils/api";
import { AdvancedDataTable } from "../advanced-data-table";
import { columns } from "./columns";
import { DocumentGroupTableToolbar } from "./document-group-table-toolbar";

const DocumentGroupTable: FC = () => {
  const { data, isLoading, isError } =
    api.document.getAllGroupsAsAdmin.useQuery();

  return (
    <>
      <AdvancedDataTable
        columns={columns}
        data={data || []}
        error={isError}
        loading={isLoading}
        toolbar={DocumentGroupTableToolbar}
        usePagination={false}
      />
    </>
  );
};

export default DocumentGroupTable;
