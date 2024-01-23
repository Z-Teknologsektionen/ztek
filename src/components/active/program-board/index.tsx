import { AccountRoles } from "@prisma/client";
import type { FC } from "react";
import { AdvancedDataTable } from "~/components/data-table/advanced-data-table";
import RoleWrapper from "~/components/layout/RoleWrapper";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { api } from "~/utils/api";
import { programBoardColumns } from "./program-board-columns";
import { ProgramBoardTableToolbar } from "./program-board-table-toolbar";

const ProgramBoardTab: FC = () => {
  const {
    data: programBoardMembers,
    isLoading: isLoadingProgramBoardMembers,
    isError: isProgramBoardError,
  } = api.programBoard.getAllAsAdmin.useQuery();

  return (
    <RoleWrapper accountRole={AccountRoles.MODIFY_PROGRAM_BOARD}>
      <SectionWrapper>
        <SectionTitle center>Programledningen</SectionTitle>
        <AdvancedDataTable
          columns={programBoardColumns}
          data={programBoardMembers || []}
          error={isProgramBoardError}
          loading={isLoadingProgramBoardMembers}
          toolbar={ProgramBoardTableToolbar}
        />
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default ProgramBoardTab;
