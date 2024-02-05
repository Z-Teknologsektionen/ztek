import { AccountRoles } from "@prisma/client";
import type { FC } from "react";
import RoleWrapper from "~/components/layout/RoleWrapper";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { Button } from "~/components/ui/button";

const MeetingElectionTab: FC = () => {
  return (
    <RoleWrapper accountRole={AccountRoles.CREATE_MEETING_ELECTION}>
      <SectionWrapper>
        <Button>Skapa ny omröstning</Button>
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default MeetingElectionTab;
