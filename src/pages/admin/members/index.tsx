import type { GetServerSideProps, NextPage } from "next";
import MemberTable from "~/components/data-table/members/member-table";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import ssg from "~/server/api/helpers/ssg";

const AdminMemberPage: NextPage = () => {
  return (
    <>
      <SectionWrapper>
        <SectionTitle center>Medlemmar</SectionTitle>
        <MemberTable />
      </SectionWrapper>
    </>
  );
};

export default AdminMemberPage;

export const getServerSideProps: GetServerSideProps = async () => {
  await Promise.all([
    ssg.member.getCommitteeMembersAsAdmin.prefetch({}),
    ssg.committee.getAllAsAdmin.prefetch(),
  ]);

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};
