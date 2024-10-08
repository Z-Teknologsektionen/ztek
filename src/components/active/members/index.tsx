import { AccountRoles } from "@prisma/client";
import type { FC } from "react";
import { AdvancedDataTable } from "~/components/data-table/advanced-data-table";
import RoleWrapper from "~/components/layout/role-wrapper";
import SectionWrapper from "~/components/layout/section-wrapper";
import { api } from "~/utils/api";
import { memberColumns } from "./member-columns";
import { MemberTableToolbar } from "./member-table-toolbar";

const AdministerMembersTab: FC = () => {
  const {
    data: membersAsAuthed,
    isLoading: isLoadingMembers,
    isError: isErrorMembers,
  } = api.member.getCommitteeMembersAsAuthed.useQuery();
  return (
    <RoleWrapper accountRole={AccountRoles.ORGANIZATION_MANAGEMENT}>
      <SectionWrapper>
        <AdvancedDataTable
          columns={memberColumns}
          data={membersAsAuthed || []}
          error={isErrorMembers}
          loading={isLoadingMembers}
          toolbar={MemberTableToolbar}
        />
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default AdministerMembersTab;
