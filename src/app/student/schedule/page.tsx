import type { Metadata } from "next";
import type { FC } from "react";
import ScheduleLinkGeneratorSection from "./components/schedule-link-generator-section";
import SubscriptionInstructionsSection from "./components/subscription-instructions-section";
import TimeEditIntroductionSection from "./components/timeedit-introduction-section";

export const metadata: Metadata = {
  title: "Schema",
};

const SchedulePage: FC = () => {
  return (
    <div className="container mx-auto mt-8 divide-y-4 divide-zDarkGray divide-opacity-20">
      <TimeEditIntroductionSection />
      <SubscriptionInstructionsSection />
      <ScheduleLinkGeneratorSection />
    </div>
  );
};

export default SchedulePage;
