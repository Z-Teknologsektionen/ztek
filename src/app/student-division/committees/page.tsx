import { CommitteeType } from "@prisma/client";
import type { Metadata } from "next";
import type { FC } from "react";
import SecondaryTitle from "~/components/layout/secondary-title";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import { getCommitteeTypeStringFromEnum } from "~/utils/get-committee-type-string-from-enum";
import { CommitteesLayout } from "./_components/committee-layout";
import { getAllCommittees } from "./_utils/get-all-committees";

export const metadata: Metadata = {
  title: "Organ",
};

const CommitteesPage: FC = async () => {
  const committees = await getAllCommittees();

  return (
    <SectionWrapper>
      <SectionTitle className="mb-8" center>
        Sektionsorgan
      </SectionTitle>
      <div>
        Sektionen består av flera olika organ som alla har olika uppgifter.
        Kommittéer är organ som har en egen ekonomi och som har en specifik
        uppgift. Utöver kommittéer finns det även utskott som är organ som inte
        har en egen ekonomi och som har lite mindre uppgifter. Sektionen kan
        också tillsätta tillfälliga arbetsgrupper för att utreda specifika
        frågor. För att läsa mer om de olika organen kan du klicka på dem nedan.
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
            <CommitteesLayout committees={filterdCommitteesByType} />
          </div>
        );
      })}
    </SectionWrapper>
  );
};

export default CommitteesPage;
