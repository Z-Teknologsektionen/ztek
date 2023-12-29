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

  const {
    data: userAsAdmin,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = api.user.getAllUserRolesAsAdmin.useQuery();

  const usersAndMembersCombined = membersAsAdmin?.map((member) => {
    const user = userAsAdmin?.find((u) => u.email === member.email);
    return {
      ...member,
      roles: user?.roles,
      userId: user?.id,
    };
  });

  return (
    <AdvancedDataTable
      columns={columns}
      data={usersAndMembersCombined || []}
      error={isErrorMembers || isErrorUser}
      loading={isLoadingMembers || isLoadingUser}
      toolbar={MemberTableToolbar}
    />
  );
};

export default MemberTable;
