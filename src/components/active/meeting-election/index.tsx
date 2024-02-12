import { AccountRoles } from "@prisma/client";
import type { FC } from "react";
import { AdvancedDataTable } from "~/components/data-table/advanced-data-table";
import RoleWrapper from "~/components/layout/RoleWrapper";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { api } from "~/utils/api";
import { meetingElectionColumns } from "./meeting-election-columns";
import { MeetingElectionTableToolbar } from "./meeting-election-toolbar";

const MeetingElectionTab: FC = () => {
  const {
    data: meetingElections,
    isLoading,
    isError,
  } = api.meetingElection.getAll.useQuery();

  return (
    <RoleWrapper accountRole={AccountRoles.CREATE_MEETING_ELECTION}>
      <SectionWrapper>
        <AdvancedDataTable
          columns={meetingElectionColumns}
          data={meetingElections || []}
          error={isError}
          loading={isLoading}
          toolbar={MeetingElectionTableToolbar}
        />
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default MeetingElectionTab;
