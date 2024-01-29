import { signIn, useSession } from "next-auth/react";
import type { FC } from "react";
import { UpdateCommitteeWizard } from "~/components/committees/UpdateCommitteeWizard";
import { UpdateUserWizard } from "~/components/committees/UpdateUserWizard";
import HeadLayout from "~/components/layout/HeadLayout";
import RoleWrapper from "~/components/layout/RoleWrapper";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { api } from "~/utils/api";

const EditCommitteePage: FC = () => {
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
      {session && !committee && (
        <SectionWrapper>
          <SectionTitle>Du existerar inte.</SectionTitle>
          Webbgruppen har inte lagt till dig som medlem i någon kommitté än.
          Kontakta dem för att få tillgång till denna sida.
          <br />
          Se till att vara inloggad med din postspecifika mail on inte hela
          organets mail.
        </SectionWrapper>
      )}
      {session && committee && (
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
            committee={committee}
            refetchCommittee={() => void refetchCommittee()}
          />
        </SectionWrapper>
      )}
    </RoleWrapper>
  );
};

export default EditCommitteePage;
