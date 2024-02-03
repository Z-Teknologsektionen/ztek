import { useSession } from "next-auth/react";
import type { FC } from "react";
import { AdvancedDataTable } from "~/components/data-table/advanced-data-table";
import RoleWrapper from "~/components/layout/RoleWrapper";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { api } from "~/utils/api";
import { oldCommitteeColumns } from "./old-committee-columns";
import { OldCommitteeTableToolbar } from "./old-committee-table-toolbar";

const OldMembersTab: FC = () => {
  const session = useSession();

  const {
    data: committeeMember,
    isLoading: isLoadingCommitteeMember,
    isError: isErrorCommitteeMember,
  } = api.member.getOneByUserId.useQuery({
    userId: session.data?.user.id || "",
  });

  const {
    data: oldCommittees,
    isError: isErrorOldCommittees,
    isLoading: isLoadingOldCommittees,
  } = api.oldCommittee.getManyByCommitteeId.useQuery({
    belongsToCommitteeId: committeeMember?.committeeId || "",
  });
  return (
    <RoleWrapper accountRole={undefined}>
      <SectionWrapper>
        <AdvancedDataTable
          columns={oldCommitteeColumns}
          data={oldCommittees || []}
          error={isErrorCommitteeMember || isErrorOldCommittees}
          loading={isLoadingCommitteeMember || isLoadingOldCommittees}
          toolbar={OldCommitteeTableToolbar}
        />
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default OldMembersTab;
