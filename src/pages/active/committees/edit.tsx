import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { EditCommitteeInformationSection } from "~/components/committees/EditCommitteeInformationSection";
import { UpdateCommitteeWizard } from "~/components/committees/UpdateCommitteeWizard";
import { UpdateUserWizard } from "~/components/committees/UpdateUserWizard";

import HeadLayout from "~/components/layout/HeadLayout";
import RoleWrapper from "~/components/layout/RoleWrapper";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { api } from "~/utils/api";

const EditCommitteePage: NextPage = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => void signIn("google"),
  });
  const userEmail = session?.user.email;
  const { data: committee, refetch: refetchCommittee } =
    api.committee.getOneByEmail.useQuery({
      email: userEmail || "",
    });

  return (
    <RoleWrapper accountRole={undefined}>
      <HeadLayout title="Redigera medlemmar"></HeadLayout>
      <main>
        {session && <EditCommitteeInformationSection />}
        {session && committee && (
          <SectionWrapper className="flex flex-col items-center justify-center space-y-8 py-16">
            <h1 className="text-center text-3xl font-semibold">
              {committee.name}
            </h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {committee.members.map((member) => (
                <UpdateUserWizard
                  key={member.role}
                  member={member}
                  refetch={() => void refetchCommittee()}
                />
              ))}
            </div>
            <UpdateCommitteeWizard
              committee={committee}
              refetchCommittee={() => void refetchCommittee()}
            />
          </SectionWrapper>
        )}
      </main>
    </RoleWrapper>
  );
};

export default EditCommitteePage;
