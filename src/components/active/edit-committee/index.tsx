import { TooltipProvider } from "@radix-ui/react-tooltip";
import { type FC } from "react";
import HeadLayout from "~/components/layout/head-layout";
import LoadningSpinner from "~/components/layout/loadning-spinner";
import RoleWrapper from "~/components/layout/role-wrapper";
import SectionWrapper from "~/components/layout/section-wrapper";

import { useRequireAuth } from "~/hooks/useRequireAuth";
import { api } from "~/utils/api";
import MissingCommitteeSection from "./components/missing-committee-section";
import { UpdateCommitteeMemberSection } from "./components/update-committee-member-section";
import { UpdateCommitteeSection } from "./components/update-committee-section";

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
      <TooltipProvider>
        <SectionWrapper>
          {isLoadingCommittee && <LoadningSpinner />}
          {hasData && !committee && <MissingCommitteeSection />}
          {showStandardViews && (
            <div className="grid grid-cols-6 gap-20">
              <div className="order-last col-span-6 md:order-first md:col-span-4">
                <UpdateCommitteeMemberSection committee={committee} />
              </div>
              <div className="col-span-6 flex flex-col items-center md:col-span-2">
                <UpdateCommitteeSection committee={committee} />
              </div>
            </div>
          )}
        </SectionWrapper>
      </TooltipProvider>
    </RoleWrapper>
  );
};

export default EditCommitteePage;
