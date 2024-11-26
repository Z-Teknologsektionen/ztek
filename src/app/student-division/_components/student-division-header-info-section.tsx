import type { FC } from "react";
import SectionWrapper from "~/components/layout/section-wrapper";
import { StudentDivisionHeaderInfoCard } from "./student-division-header-info-card";

export const StudentDivisionHeaderInfoSection: FC = () => {
  return (
    <SectionWrapper className="grid grid-cols-1 gap-4 space-y-0 py-6 md:grid-cols-2 lg:grid-cols-3">
      <StudentDivisionHeaderInfoCard
        description="Zaloonen är Zätas sektionslokal som gemene Z-teknolog kan boka själv. Här hålls sittningar, pluggkvällar och annat dylikt."
        href="/student-division/zaloonen"
        label="Ta mig till Zaloonen!"
        title="Zaloonen"
      />
      <StudentDivisionHeaderInfoCard
        description="Sektionen drivs av frivilligt engagerade studenter som genom våra kommittéer och föreningar försöker göra din studietid så bra som möjligt! Om du också vill vara med och engagera dig, läs mer här."
        href="/student-division/#organ"
        label="Mer om azpning"
        title="Vill du också engagera dig?"
      />
      <StudentDivisionHeaderInfoCard
        description="Saknar du något här på sektionen eller vill du starta ett nytt utskott? Här kan du få mer information om hur du ska gå tillväga."
        href="/student-division#sektionsmote"
        label="Mer information"
        title="Var med och påverka!"
      />
    </SectionWrapper>
  );
};
