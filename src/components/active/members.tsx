import type { FC } from "react";
import MemberTable from "~/components/data-table/members/member-table";
import AdminWrapper from "~/components/layout/AdminWrapper";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";

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
