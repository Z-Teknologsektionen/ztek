import type { Metadata } from "next";
import type { FC } from "react";
import { CoursesSection } from "./components/courses-section";
import { ProgramManagerSection } from "./components/program-manager-section";
import { ReceptionSection } from "./components/reception-section";

export const metadata: Metadata = {
  title: "Ny student",
};

const NewStudentPage: FC = () => {
  return (
    <div className="divide-y-4 divide-zDarkGray divide-opacity-20">
      <ProgramManagerSection />
      <ReceptionSection />
      <CoursesSection />
    </div>
  );
};

export default NewStudentPage;
