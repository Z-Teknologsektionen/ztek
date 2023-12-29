import type { FC } from "react";
import ProgramBoardTable from "~/components/data-table/program-board/program-board-table";
import AdminWrapper from "~/components/layout/AdminWrapper";
import SectionWrapper from "~/components/layout/SectionWrapper";

const AdminProgramBoardPage: FC = () => {
  return (
    <AdminWrapper>
      <SectionWrapper>
        <ProgramBoardTable />
      </SectionWrapper>
    </AdminWrapper>
  );
};

export default AdminProgramBoardPage;
