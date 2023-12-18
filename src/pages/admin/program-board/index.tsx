import { type NextPage } from "next";
import ProgramBoardTable from "~/components/data-table/program-board/program-board-table";
import AdminWrapper from "~/components/layout/AdminWrapper";
import SectionWrapper from "~/components/layout/SectionWrapper";

const AdminProgramBoardPage: NextPage = () => {
  return (
    <AdminWrapper>
      <SectionWrapper>
        <ProgramBoardTable />
      </SectionWrapper>
    </AdminWrapper>
  );
};

export default AdminProgramBoardPage;
