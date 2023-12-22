import type { NextPage } from "next";
import { ZaloonenBookingForm } from "~/components/forms/zaloonen-booking-form";
import HeadLayout from "~/components/layout/HeadLayout";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";

const NewZaloonenBookingPage: NextPage = () => {
  return (
    <>
      <HeadLayout title="Ny bokning" />
      <SectionWrapper>
        <SectionTitle>Ny bokning</SectionTitle>
        <ZaloonenBookingForm />
      </SectionWrapper>
    </>
  );
};

export default NewZaloonenBookingPage;
