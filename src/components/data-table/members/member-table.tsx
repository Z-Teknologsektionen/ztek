import type { FC } from "react";
import { api } from "~/utils/api";
import { AdvancedDataTable } from "../advanced-data-table";
import { columns } from "./columns";
import { MemberTableToolbar } from "./member-table-toolbar";

const MemberTable: FC = () => {
  const {
    data: membersAsAdmin,
    isLoading: isLoadingMembers,
    isError: isErrorMembers,
  } = api.member.getCommitteeMembersAsAdmin.useQuery({
    committeeId: undefined,
  });

  return (
    <AdvancedDataTable
      columns={columns}
      data={membersAsAdmin || []}
      error={isErrorMembers}
      loading={isLoadingMembers}
      toolbar={MemberTableToolbar}
    />
  );
};

export default MemberTable;
