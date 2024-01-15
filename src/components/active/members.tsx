import { AccountRoles } from "@prisma/client";
import type { FC } from "react";
import MemberTable from "~/components/data-table/members/member-table";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import RoleWrapper from "../layout/RoleWrapper";

const AdminMemberPage: FC = () => {
  return (
    <RoleWrapper accountRole={AccountRoles.ADMIN}>
      <SectionWrapper>
        <SectionTitle center>Medlemmar</SectionTitle>
        <MemberTable />
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default AdminMemberPage;
