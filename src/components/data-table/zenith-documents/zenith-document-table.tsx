import type { FC } from "react";
import { api } from "~/utils/api";
import { AdvancedDataTable } from "../advanced-data-table";
import { columns } from "./columns";
import { ZenithDocumentTableToolbar } from "./zenith-document-table-toolbar";

const ZenithDocumentTable: FC = () => {
  const { data, isLoading, isError } =
    api.zenithDocuments.getAllAsAuthorized.useQuery();

  return (
    <>
      <AdvancedDataTable
        columns={columns}
        data={data ?? []}
        error={isError}
        loading={isLoading}
        toolbar={ZenithDocumentTableToolbar}
      />
    </>
  );
};

export default ZenithDocumentTable;
