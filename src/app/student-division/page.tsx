import type { Metadata } from "next";
import type { FC } from "react";
import { StudentDivisionCommitteesSection } from "./_components/student-division-committees-section";
import { StudentDivisionConstructionSection } from "./_components/student-division-construction-section";
import { StudentDivisionHeaderInfoSection } from "./_components/student-division-header-info-section";
import { StudentDivisionMeetingSection } from "./_components/student-division-meeting-section";

export const metadata: Metadata = {
  title: "Sektionen",
};

const StudentDivisionPage: FC = () => {
  return (
    <div className="container mx-auto divide-y-4 divide-zDarkGray divide-opacity-20">
      <StudentDivisionHeaderInfoSection />
      <StudentDivisionConstructionSection />
      <StudentDivisionMeetingSection />
      <StudentDivisionCommitteesSection />
    </div>
  );
};

export default StudentDivisionPage;
