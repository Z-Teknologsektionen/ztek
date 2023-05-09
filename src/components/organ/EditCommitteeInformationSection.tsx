import type { FC } from "react";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";

export const EditCommitteeInformationSection: FC = () => (
  <SectionWrapper className="flex flex-col space-y-4 py-8">
    <SectionTitle>Information</SectionTitle>
    <ul className="list-disc">
      <li>
        <p>
          Om du lämnar båda namn fälten tomma så kommer personen inte visas på
          hemsidan. Om du vill att de ska visas ändå kan du sätta namnet till
          &quot;Vakant&quot;
        </p>
      </li>
      <li>
        <p>Personer med högt värde på &quot;Ordning&quot; kommer visas först</p>
      </li>
      <li>
        <p>Om kommitenamn finns så kommer det prioriteras och visas större</p>
      </li>
      <li>
        <p>
          Om du vill redigera något av de fält som är statiska så kan enbart
          webbgruppen göra detta, kontakta dem via slack eller mail.
        </p>
      </li>
    </ul>
  </SectionWrapper>
);
