import { type NextPage } from "next";
import ProgramBoardTable from "~/components/data-table/programBoard/programBoard-table";
import SectionWrapper from "~/components/layout/SectionWrapper";

const AdminProgramBoardPage: NextPage = () => {
  return (
    <>
      <SectionWrapper>
        <ProgramBoardTable></ProgramBoardTable>
      </SectionWrapper>
    </>
  );
};

export default AdminProgramBoardPage;
