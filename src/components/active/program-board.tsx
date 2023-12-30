import { AccountRoles } from "@prisma/client";
import type { FC } from "react";
import ProgramBoardTable from "~/components/data-table/program-board/program-board-table";
import SectionWrapper from "~/components/layout/SectionWrapper";
import RoleWrapper from "../layout/RoleWrapper";

const AdminProgramBoardPage: FC = () => {
  return (
    <RoleWrapper accountRole={AccountRoles.MODIFY_PROGRAM_BOARD}>
      <SectionWrapper>
        <ProgramBoardTable />
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default AdminProgramBoardPage;
