import type { FC } from "react";
import { api } from "~/utils/api";
import { AdvancedDataTable } from "../advanced-data-table";
import { columns } from "./columns";
import { ZenithMediaTableToolbar } from "./zenith-media-table-toolbar";

const ZenithMediaTable: FC = () => {
  const { data, isLoading, isError } =
    api.zenithMedia.getAllAsAuthorized.useQuery();

  return (
    <>
      <AdvancedDataTable
        columns={columns}
        data={data ?? []}
        error={isError}
        loading={isLoading}
        toolbar={ZenithMediaTableToolbar}
      />
    </>
  );
};

export default ZenithMediaTable;
