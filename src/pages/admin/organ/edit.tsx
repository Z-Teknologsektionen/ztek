import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import HeadLayout from "~/components/layout/HeadLayout";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { UpdateUserWizard } from "~/components/organ/UpdateUserWizard";
import { api } from "~/utils/api";
import localeObject from "~/utils/dayjs";
import { EditCommitteeInformationSection } from "../../../components/organ/EditCommitteeInformationSection";
import { UpdateCommitteeWizard } from "../../../components/organ/UpdateCommitteeWizard";

dayjs.extend(relativeTime);
dayjs.locale(localeObject);

const EditOrganPage: NextPage = () => {
  const { data: session } = useSession();
  const userEmail = session?.user.email;
  const { data: committee, refetch: refetchCommittee } =
    api.committee.getOneByEmail.useQuery({
      email: userEmail ?? "",
    });

  return (
    <>
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
        <SectionWrapper className="flex items-center justify-center py-8">
          {session ? (
            <button
              className="rounded border-2 px-4 py-2 shadow hover:bg-slate-50"
              onClick={() => {
                void signOut();
              }}
              type="button"
            >
              Logga ut
            </button>
          ) : (
            <div className="h-96">
              <button
                className="rounded border-2 px-4 py-2 shadow hover:bg-slate-50"
                onClick={() => {
                  void signIn("google");
                }}
                type="button"
              >
                Logga in
              </button>
            </div>
          )}
        </SectionWrapper>
      </main>
    </>
  );
};

export default EditOrganPage;
