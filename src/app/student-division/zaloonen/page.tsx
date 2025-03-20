import type { Metadata } from "next";
import type { FC } from "react";
import { ZaloonenCalenderSection } from "./_components/zaloonen-calender-section";
import { ZaloonenDocumentSection } from "./_components/zaloonen-document-section";
import { ZaloonenIntroSection } from "./_components/zaloonen-intro-section";

export const metadata: Metadata = {
  title: "Zaloonen",
};

const ZaloonenPage: FC = () => {
  return (
    <>
      <ZaloonenIntroSection />
      <ZaloonenDocumentSection />
      <ZaloonenCalenderSection />
    </>
  );
};

export default ZaloonenPage;
