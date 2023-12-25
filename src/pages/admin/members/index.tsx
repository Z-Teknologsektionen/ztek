import type { GetServerSideProps } from "next";
import type { FC } from "react";
import MemberTable from "~/components/data-table/members/member-table";
import AdminWrapper from "~/components/layout/AdminWrapper";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import ssg from "~/server/api/helpers/ssg";

const AdminMemberPage: FC = () => {
  return (
    <AdminWrapper>
      <SectionWrapper>
        <SectionTitle center>Medlemmar</SectionTitle>
        <MemberTable />
      </SectionWrapper>
    </AdminWrapper>
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
