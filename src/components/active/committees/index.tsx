import { AccountRoles } from "@prisma/client";
import type { FC } from "react";
import { AdvancedDataTable } from "~/components/data-table/advanced-data-table";
import RoleWrapper from "~/components/layout/role-wrapper";
import SectionWrapper from "~/components/layout/section-wrapper";
import { api } from "~/utils/api";
import { committeeColumns } from "./committee-columns";
import { CommitteeTableToolbar } from "./committee-table-toolbar";

const AdministerCommitteesTab: FC = () => {
  const {
    data: committees,
    isLoading: isLoadingCommittees,
    isError: isCommitteesError,
  } = api.committee.getAllAsAuthed.useQuery();

  return (
    <RoleWrapper accountRole={AccountRoles.ORGANIZATION_MANAGEMENT}>
      <SectionWrapper>
        <AdvancedDataTable
          columns={committeeColumns}
          data={committees || []}
          error={isCommitteesError}
          loading={isLoadingCommittees}
          toolbar={CommitteeTableToolbar}
          usePagination={true}
        />
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default AdministerCommitteesTab;
