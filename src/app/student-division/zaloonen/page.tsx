import type { Metadata } from "next";
import type { FC } from "react";
import { ZaloonenBookingsSection } from "./_components/zaloonen-bookings-section";
import { ZaloonenDocumentsSection } from "./_components/zaloonen-documents-section";
import { ZaloonenIntroSection } from "./_components/zaloonen-intro-section";

export const metadata: Metadata = {
  title: "Zaloonen",
};

const ZaloonenPage: FC = () => {
  return (
    <>
      <ZaloonenIntroSection />
      <ZaloonenDocumentsSection />
      <ZaloonenBookingsSection />
    </>
  );
};

export default ZaloonenPage;
