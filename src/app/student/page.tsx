import type { Metadata } from "next";
import type { FC } from "react";
import ProgramBoardSection from "./components/program-board-section";
import { StudentLongerInfoSection } from "./components/student-longer-info-section";
import { StudentQuickInformationSection } from "./components/student-quick-information-section";
import { StudentQuickLinksSection } from "./components/student-quick-links-section";
import { StudentSNZSection } from "./components/student-snz-section";

export const metadata: Metadata = {
  title: "Student",
  description:
    "Här finner du information för dig som är student på Z-teknologsektionen",
};

const StudentPage: FC = () => {
  return (
    <div className="container mx-auto mt-8 divide-y-4 divide-zDarkGray divide-opacity-20">
      <StudentQuickLinksSection />
      <StudentQuickInformationSection />
      <StudentLongerInfoSection />
      <StudentSNZSection />
      <ProgramBoardSection />
    </div>
  );
};

export default StudentPage;
