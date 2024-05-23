import type { Metadata } from "next";
import type { FC } from "react";
import { FunkaSection } from "./components/funka-section";
import { SamoSection } from "./components/samo-section";
import { StudentHealthSection } from "./components/student-health-section";

export const metadata: Metadata = {
  title: "Studenthälsa",
};

const page: FC = () => {
  return (
    <div className="divide-y-4 divide-zDarkGray divide-opacity-20">
      <StudentHealthSection />
      <FunkaSection />
      <SamoSection />
    </div>
  );
};

export default page;
