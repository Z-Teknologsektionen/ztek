import { TooltipProvider } from "@radix-ui/react-tooltip";
import { type FC } from "react";
import HeadLayout from "~/components/layout/head-layout";
import LoadningSpinner from "~/components/layout/loadning-spinner";
import RoleWrapper from "~/components/layout/role-wrapper";
import SectionWrapper from "~/components/layout/section-wrapper";

import { useRequireAuth } from "~/hooks/useRequireAuth";
import { api } from "~/utils/api";
import MissingCommitteeSection from "./missing-committee-section";
import { UpdateCommitteeMemberSection } from "./update-committee-member-section";
import { UpdateCommitteeSection } from "./update-committee-section";

const EditCommitteePage: FC = () => {
  const { data: session } = useRequireAuth();
  if (!session) return null;

  const {
    data: committee,
    isLoading: isLoadingCommittee,
    isError: isCommitteeError,
  } = api.committee.getOneByIdAsActive.useQuery({
    id: session.user.committeeId || "",
  });

  const hasData = !isLoadingCommittee && !isCommitteeError;
  const showStandardViews = hasData && committee !== undefined;

  return (
    <RoleWrapper accountRole={undefined}>
      <HeadLayout title="Redigera medlemmar" />
      <SectionWrapper>
        {isLoadingCommittee && <LoadningSpinner />}
        {hasData && !committee && <MissingCommitteeSection />}
        {showStandardViews && (
          <TooltipProvider>
            <div className="grid grid-cols-6 ">
              <div className="order-last col-span-6 mx-4 lg:order-first lg:col-span-4">
                <div className="sticky top-2 grid grid-cols-2 gap-4 md:grid-cols-3">
                  {committee.members.map((member) => (
                    <UpdateCommitteeMemberSection
                      key={member.id}
                      member={member}
                    />
                  ))}
                </div>
              </div>
              <div className="col-span-6 mx-4 mb-4 lg:col-span-2 lg:mb-0">
                <UpdateCommitteeSection committee={committee} />
              </div>
            </div>
          </TooltipProvider>
        )}
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default EditCommitteePage;
