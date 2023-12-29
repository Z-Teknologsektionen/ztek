import type { FC } from "react";
import { api } from "~/utils/api";
import { AdvancedDataTable } from "../advanced-data-table";
import { columns } from "./columns";
import { DocumentTableToolbar } from "./document-table-toolbar";

const DocumentTable: FC = () => {
  const { data, isLoading, isError } = api.document.getAllAsAdmin.useQuery();

  return (
    <>
      <AdvancedDataTable
        columns={columns}
        data={data || []}
        error={isError}
        loading={isLoading}
        toolbar={DocumentTableToolbar}
        usePagination={true}
      />
    </>
  );
};

export default DocumentTable;
