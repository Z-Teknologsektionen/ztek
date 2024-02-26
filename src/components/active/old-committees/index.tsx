import type { FC } from "react";
import { AdvancedDataTable } from "~/components/data-table/advanced-data-table";
import RoleWrapper from "~/components/layout/role-wrapper";
import SectionWrapper from "~/components/layout/section-wrapper";
import { useRequireAuth } from "~/hooks/useRequireAuth";
import { api } from "~/utils/api";
import { oldCommitteeColumns } from "./old-committee-columns";
import { OldCommitteeTableToolbar } from "./old-committee-table-toolbar";

const OldCommitteesTab: FC = () => {
  const { data: session } = useRequireAuth();

  const {
    data: oldCommittees,
    isError: isErrorOldCommittees,
    isLoading: isLoadingOldCommittees,
  } = api.oldCommittee.getManyByCommitteeIdAsActive.useQuery({
    belongsToCommitteeId: session?.user.committeeId || "",
    isAdmin: session?.user.roles.includes("ADMIN") || false,
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
