import type { FC } from "react";
import { UpdateCommitteeWizard } from "~/components/active/edit-committee/update-committee-wizard";
import { UpdateUserWizard } from "~/components/active/edit-committee/update-user-wizard";
import HeadLayout from "~/components/layout/HeadLayout";
import RoleWrapper from "~/components/layout/RoleWrapper";
import SecondaryTitle from "~/components/layout/SecondaryTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import LoadningSpinner from "~/components/layout/loadning-spinner";
import { useRequireAuth } from "~/hooks/useRequireAuth";
import { api } from "~/utils/api";
import CommitteeSocialLinksList from "./committee-social-links-list";
import MissingCommitteeSection from "./missing-committee-section";

const EditCommitteePage: FC = () => {
  const { data: session } = useRequireAuth();
  if (!session) return null;

  const {
    data: committee,
    isLoading: isLoadingCommittee,
    isError: isCommitteeError,
  } = api.committee.getOneByEmail.useQuery({
    email: session.user.email,
  });

  const hasData = !isLoadingCommittee && !isCommitteeError;
  const showStandardViews = hasData && committee !== undefined;

  return (
    <RoleWrapper accountRole={undefined}>
      <HeadLayout title="Redigera medlemmar" />
      {isLoadingCommittee && <LoadningSpinner />}
      {hasData && !committee && <MissingCommitteeSection />}
      {showStandardViews && (
        <SectionWrapper className="flex flex-col items-center justify-center space-y-8 py-16">
          <h1 className="text-center text-3xl font-semibold">
            {committee.name}
          </h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {committee.members.map((member) => (
              <UpdateUserWizard key={member.id} member={member} />
            ))}
          </div>
          <UpdateCommitteeWizard key={committee.id} committee={committee} />
          <div className="w-full space-y-4">
            <SecondaryTitle center>Sociala länkar</SecondaryTitle>
            <CommitteeSocialLinksList
              committeeId={committee.id}
              initialSocialLinks={committee.socialLinks.map(
                ({ iconVariant, order, url }) => ({
                  iconAndUrl: {
                    iconVariant,
                    url,
                  },
                  order,
                }),
              )}
            />
          </div>
        </SectionWrapper>
      )}
    </RoleWrapper>
  );
};

export default EditCommitteePage;
