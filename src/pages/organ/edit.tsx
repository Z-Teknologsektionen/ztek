import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { TempFooter, TempHeader } from "..";

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
      <TempHeader />
      <main>
        {session && (
          <SectionWrapper className="flex flex-col space-y-4 py-8">
            <SectionTitle>Information</SectionTitle>
            <ul className="list-disc">
              <li>
                <p>
                  Om du lämnar båda namn fälten tomma så kommer personen inte
                  visas på hemsidan. Om du vill att de ska visas ändå kan du
                  sätta namnet till &quot;Vakant&quot;
                </p>
              </li>
              <li>
                <p>
                  Personer med högt värde på &quot;Ordning&quot; kommer visas
                  först
                </p>
              </li>
              <li>
                <p>
                  Om kommitenamn finns så kommer det prioriteras och visas
                  större
                </p>
              </li>
              <li>
                <p>
                  Om du vill redigera något av de fält som är statiska så kan
                  enbart webbgruppen göra detta, kontakta dem via slack eller
                  mail.
                </p>
              </li>
            </ul>
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
                  key={member.role}
                  member={member}
                  refetch={() => void refetchCommittee()}
                />
              ))}
            </div>
          </SectionWrapper>
        )}
        <SectionWrapper className="flex items-center justify-center py-8">
          {session ? (
            <button
              className="rounded border-2 px-4 py-2 shadow "
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
                className="rounded border-2 px-4 py-2 shadow "
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
      <TempFooter />
    </>
  );
};

export default EditOrganPage;

import HeadLayout from "~/components/layout/HeadLayout";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import localeObject from "~/utils/dayjs";
import { UpdateUserWizard } from "../../components/organ/UpdateUserWizard";
