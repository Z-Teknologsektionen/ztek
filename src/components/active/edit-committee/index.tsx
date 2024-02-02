import type { FC } from "react";
import { UpdateCommitteeWizard } from "~/components/active/edit-committee/update-committee-wizard";
import { UpdateUserWizard } from "~/components/active/edit-committee/update-user-wizard";
import HeadLayout from "~/components/layout/HeadLayout";
import RoleWrapper from "~/components/layout/RoleWrapper";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { useRequireAuth } from "~/hooks/useRequireAuth";
import { api } from "~/utils/api";
import MissingCommitteeSection from "./missing-committee-section";

const EditCommitteePage: FC = () => {
  const { data: session } = useRequireAuth();
  if (!session) return null;

  const {
    data: committee,
    isLoading,
    refetch: refetchCommittee,
  } = api.committee.getOneByEmail.useQuery({
    email: session.user.email,
  });

  return (
    <RoleWrapper accountRole={undefined}>
      <HeadLayout title="Redigera medlemmar" />
      {isLoading && <p>Hämtar data...</p>}
      {!isLoading && !committee && <MissingCommitteeSection />}
      {!isLoading && committee && (
        <SectionWrapper className="flex flex-col items-center justify-center space-y-8 py-16">
          <h1 className="text-center text-3xl font-semibold">
            {committee.name}
          </h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {committee.members.map((member) => (
              <UpdateUserWizard
                key={member.id}
                member={member}
                refetch={() => void refetchCommittee()}
              />
            ))}
          </div>
          <UpdateCommitteeWizard
            key={committee.id}
            committee={committee}
            refetchCommittee={() => void refetchCommittee()}
          />
        </SectionWrapper>
      )}
    </RoleWrapper>
  );
};

export default EditCommitteePage;
