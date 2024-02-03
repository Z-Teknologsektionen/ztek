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
  const userEmail = session?.user.email;
  const {
    data: committee,
    // refetch: refetchCommittee,
    isLoading: isLoadingCommittee,
    isError: isErrorCommittee,
  } = api.committee.getOneByEmail.useQuery({
    email: userEmail || "",
  });

  const {
    data: oldCommittees,
    isError: isErrorOldCommittees,
    isLoading: isLoadingOldCommittees,
  } = api.oldCommittee.getManyByCommitteeId.useQuery({
    belongsToCommitteeId: committee?.id || "",
  });

  return (
    <RoleWrapper accountRole={undefined}>
      <SectionWrapper>
        <AdvancedDataTable
          columns={oldCommitteeColumns}
          data={oldCommittees || []}
          error={isErrorCommittee || isErrorOldCommittees}
          loading={isLoadingOldCommittees || isLoadingCommittee}
          toolbar={OldCommitteeTableToolbar}
        />
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default OldCommitteesTab;
