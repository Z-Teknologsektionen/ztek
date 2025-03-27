import type { FC } from "react";
import { getOldCommitteeByCommitteeId } from "~/app/student-division/committees/[slug]/_utils/get-old-committees-by-committee-id";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import { OldCommitteeCard } from "./old-committee-card";

type OldCommitteeSectionProps = {
  committeeId: string;
  committeeName: string;
};

export const OldCommitteeSection: FC<OldCommitteeSectionProps> = async ({
  committeeId,
  committeeName,
}) => {
  const oldCommittees = await getOldCommitteeByCommitteeId(committeeId);

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
      <div className="mt-4 flex w-fit flex-row flex-wrap items-center justify-center gap-4">
        {oldCommittees.map((oldCommittee) => (
          <OldCommitteeCard key={oldCommittee.id} {...oldCommittee} />
        ))}
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} aria-hidden="true" className="w-64" />
        ))}
      </div>
    </SectionWrapper>
  );
};
