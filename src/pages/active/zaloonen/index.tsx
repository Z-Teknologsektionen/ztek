import type { NextPage } from "next";
import ZaloonenBookingTable from "~/components/data-table/zaloonen-bookings/zaloonen-booking-table";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";

const ZaloonenAdminPage: NextPage = () => {
  return (
    <SectionWrapper>
      <SectionTitle>Zaloonen</SectionTitle>
      <ZaloonenBookingTable />
    </SectionWrapper>
  );
};

export default ZaloonenAdminPage;
