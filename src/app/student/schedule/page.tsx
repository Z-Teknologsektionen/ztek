import type { Metadata } from "next";
import { type FC } from "react";
import ScheduleInstructionSection from "./components/schedule-instruction-section";
import ScheduleLinkGeneratorSection from "./components/schedule-link-generator-section";

export const metadata: Metadata = {
  title: "Schema",
};

const SchedulePage: FC<{}> = () => {
  return (
    <>
      <ScheduleLinkGeneratorSection />
      <ScheduleInstructionSection />
    </>
  );
};

export default SchedulePage;
