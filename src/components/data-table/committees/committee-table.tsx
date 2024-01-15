import type { FC } from "react";
import { api } from "~/utils/api";
import { AdvancedDataTable } from "../advanced-data-table";
import { columns } from "./columns";
import { CommitteeTableToolbar } from "./committee-table-toolbar";

const CommitteeTable: FC = () => {
  const { data, isLoading, isError } = api.committee.getAllAsAdmin.useQuery();

  return (
    <>
      <AdvancedDataTable
        columns={columns}
        data={data || []}
        error={isError}
        loading={isLoading}
        toolbar={CommitteeTableToolbar}
        usePagination={true}
      />
    </>
  );
};

export default CommitteeTable;
