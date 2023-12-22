import type { GetServerSideProps, NextPage } from "next";
import CommitteeTable from "~/components/data-table/committees/committee-table";
import AdminWrapper from "~/components/layout/AdminWrapper";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import ssg from "~/server/api/helpers/ssg";

const AdminCommitteePage: NextPage = () => {
  return (
    <AdminWrapper>
      <SectionWrapper>
        <SectionTitle center>Sektionsorgan</SectionTitle>
        <CommitteeTable />
      </SectionWrapper>
    </AdminWrapper>
  );
};

export default AdminCommitteePage;

export const getServerSideProps: GetServerSideProps = async () => {
  await ssg.committee.getAllAsAdmin.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};
