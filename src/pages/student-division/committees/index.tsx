import { CommitteeType } from "@prisma/client";
import { type GetStaticProps, type NextPage } from "next";
import CommitteeLayout from "~/components/committees/committee-layout";
import HeadLayout from "~/components/layout/head-layout";
import SecondaryTitle from "~/components/layout/secondary-title";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import ssg from "~/server/api/helpers/ssg";
import { api } from "~/utils/api";
import { getCommitteeTypeStringFromEnum } from "~/utils/get-committee-type-string-from-enum";

const Home: NextPage = () => {
  const { data: committees } = api.committee.getAll.useQuery();

  return (
    <>
      <HeadLayout title="Organ" />
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
            const filterdCommitteesByType = committees?.filter((committee) => {
              return committee.committeeType === committeeType;
            });
            if (filterdCommitteesByType?.length === 0) return null;
            return (
              <div key={committeeType}>
                <SecondaryTitle className="mb-4" center>
                  {getCommitteeTypeStringFromEnum(committeeType, true)}
                </SecondaryTitle>
                <CommitteeLayout committees={filterdCommitteesByType} />
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
