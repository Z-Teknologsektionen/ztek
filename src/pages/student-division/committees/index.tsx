import { CommitteeType } from "@prisma/client";
import { type GetStaticProps, type NextPage } from "next";
import CommitteeLayout from "~/components/committees/CommitteeLayout";
import HeadLayout from "~/components/layout/HeadLayout";
import SecondaryTitle from "~/components/layout/SecondaryTitle";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";

import ssg from "~/server/api/helpers/ssg";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: committees } = api.committee.getAll.useQuery();

  return (
    <>
      <HeadLayout title="Organ"></HeadLayout>
      <main>
        <SectionWrapper>
          <SectionTitle className="mb-8" center>
            Sektionsorgan
          </SectionTitle>
          <div>
            Sektionen består av flera olika organ som alla har olika uppgifter.
            Kommittéer är organ som har en egen ekonomi och som har en specifik
            uppgift. Utöver kommittéer finns det även utskott som är organ som
            inte har en egen ekonomi och som har lite mindre uppgifter.
            Sektionen kan också tillsätta tillfälliga arbetsgrupper för att
            utreda specifika frågor. För att läsa mer om de olika organen kan du
            klicka på dem nedan.
          </div>

          {Object.values(CommitteeType).map((committeeType) => {
            const current_type = committees?.filter((committee) => {
              return committee.committeeType === committeeType;
            });
            if (current_type?.length === 0) return null;
            return (
              <div key={committeeType}>
                <SecondaryTitle className="mb-4" center>
                  {committeeType === CommitteeType.COMMITTEE
                    ? "Kommittéer"
                    : committeeType === CommitteeType.SUB_COMMITTEE
                    ? "Utskott"
                    : committeeType === CommitteeType.OTHER
                    ? "Övrigt"
                    : "Arbetsgrupper"}
                </SecondaryTitle>
                <CommitteeLayout
                  committees={committees?.filter((committee) => {
                    return committee.committeeType === committeeType;
                  })}
                />
              </div>
            );
          })}
        </SectionWrapper>
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  await ssg.committee.getAll.prefetch();
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};
