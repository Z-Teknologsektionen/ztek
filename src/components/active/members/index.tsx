import { AccountRoles } from "@prisma/client";
import type { FC } from "react";
import { AdvancedDataTable } from "~/components/data-table/advanced-data-table";
import RoleWrapper from "~/components/layout/RoleWrapper";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { api } from "~/utils/api";
import { memberColumns } from "./member-columns";
import { MemberTableToolbar } from "./member-table-toolbar";

const AdminMembersTab: FC = () => {
  const {
    data: membersAsAdmin,
    isLoading: isLoadingMembers,
    isError: isErrorMembers,
  } = api.member.getCommitteeMembersAsAdmin.useQuery();

  return (
    <RoleWrapper accountRole={AccountRoles.ADMIN}>
      <SectionWrapper>
        <SectionTitle center>Medlemmar</SectionTitle>
        <AdvancedDataTable
          columns={memberColumns}
          data={membersAsAdmin || []}
          error={isErrorMembers}
          loading={isLoadingMembers}
          toolbar={MemberTableToolbar}
        />
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default AdminMembersTab;
