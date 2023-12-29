import type { FC } from "react";
import SectionTitle from "~/components/layout/SectionTitle";
import { api } from "~/utils/api";
import { AdvancedDataTable } from "../advanced-data-table";
import { columns } from "./columns";
import { ProgramBoardTableToolbar } from "./program-board-table-toolbar";

const ProgramBoardTable: FC = () => {
  const { data, isLoading, isError } =
    api.programBoard.getAllAsAdmin.useQuery();

  return (
    <>
      <SectionTitle center>Programledningen</SectionTitle>

      <AdvancedDataTable
        columns={columns}
        data={data || []}
        error={isError}
        loading={isLoading}
        toolbar={ProgramBoardTableToolbar}
      />
    </>
  );
};

export default ProgramBoardTable;
