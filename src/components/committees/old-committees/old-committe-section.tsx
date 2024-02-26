import type { FC } from "react";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import { api } from "~/utils/api";
import OldCommitteeCard from "./old-committee-card";

const OldCommitteSection: FC<{
  committeeId: string;
  committeeName: string;
}> = ({ committeeId, committeeName }) => {
  const { data: oldCommittees } =
    api.oldCommittee.getManyByCommitteeId.useQuery({
      belongsToCommitteeId: committeeId,
    });

  if (!oldCommittees || oldCommittees.length === 0) return null;

  return (
    <SectionWrapper>
      <div className="mx-auto max-w-3xl space-y-2 border-b-2 border-t-2 p-4 text-center">
        <SectionTitle center>Patethimmel</SectionTitle>
        <p>
          Här hittar du alla medlemmar som varit med i {committeeName} genom
          åren. Tryck på de olika åren för att få mer information.
        </p>
      </div>
      <div className="mt-4 grid grid-cols-1 place-items-center gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {oldCommittees.map((oldCommittee) => (
          <div key={oldCommittee.id}>
            <OldCommitteeCard {...oldCommittee} />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default OldCommitteSection;
