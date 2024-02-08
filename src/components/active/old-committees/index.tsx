import type { FC } from "react";
import { AdvancedDataTable } from "~/components/data-table/advanced-data-table";
import RoleWrapper from "~/components/layout/RoleWrapper";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { useRequireAuth } from "~/hooks/useRequireAuth";
import { api } from "~/utils/api";
import { oldCommitteeColumns } from "./old-committee-columns";
import { OldCommitteeTableToolbar } from "./old-committee-table-toolbar";

const OldCommitteesTab: FC = () => {
  const { data: session } = useRequireAuth();
  const userCommittee =
    session?.user.committeeMembers[session.user.committeeMemberIdx || 0];

  const {
    data: oldCommittees,
    isError: isErrorOldCommittees,
    isLoading: isLoadingOldCommittees,
  } = api.oldCommittee.getManyByCommitteeId.useQuery({
    belongsToCommitteeId: userCommittee?.committeeId || "",
  });

  return (
    <RoleWrapper accountRole={undefined}>
      <SectionWrapper>
        <AdvancedDataTable
          columns={oldCommitteeColumns}
          data={oldCommittees || []}
          error={isErrorOldCommittees}
          loading={isLoadingOldCommittees}
          toolbar={OldCommitteeTableToolbar}
        />
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default OldCommitteesTab;
