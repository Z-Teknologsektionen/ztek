import type { Metadata } from "next";
import type { FC } from "react";
import { EducationalSupportSection } from "./components/educational-support-section";
import { SamoSection } from "./components/samo-section";
import { StudentHealthSection } from "./components/student-health-section";

export const metadata: Metadata = {
  title: "Studenthälsa",
};

const page: FC = () => {
  return (
    <div className="divide-y-4 divide-zDarkGray divide-opacity-20">
      <StudentHealthSection />
      <EducationalSupportSection />
      <SamoSection />
    </div>
  );
};

export default page;
