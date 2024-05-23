import type { Metadata } from "next";
import type { FC } from "react";
import BusinessContactFooter from "./components/business-contact-footer";
import BusinessIntoSection from "./components/business-into-section";
import BusinessWorkWithUsSection from "./components/business-work-with-us-section";

export const metadata: Metadata = {
  title: "För företag",
  description:
    "Här kan du läsa om hur företag kan jobba med Z-teknologsektionen",
};

const BusinessPage: FC = () => {
  return (
    <>
      <BusinessIntoSection />
      <BusinessWorkWithUsSection />
      <BusinessContactFooter />
    </>
  );
};

export default BusinessPage;
