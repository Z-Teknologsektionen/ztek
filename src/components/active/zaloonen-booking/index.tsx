import type { FC } from "react";
import { AdvancedDataTable } from "~/components/data-table/advanced-data-table";
import RoleWrapper from "~/components/layout/role-wrapper";
import SectionWrapper from "~/components/layout/section-wrapper";
import { api } from "~/utils/api";
import { zaloonenBookingColumns } from "./zaloonen-booking-columns";
import { ZaloonenBookingTableToolbar } from "./zaloonen-booking-table-toolbar";

const ZaloonenBookingTab: FC = () => {
  const {
    data: bookings,
    isLoading: isLoadingBookings,
    isError: isBookingError,
  } = api.zaloonen.getAllBookingsAsAuthed.useQuery();

  return (
    <RoleWrapper accountRole={"MODIFY_ZALOONEN_BOOKING"}>
      <SectionWrapper>
        <AdvancedDataTable
          columns={zaloonenBookingColumns}
          data={bookings ?? []}
          error={isBookingError}
          loading={isLoadingBookings}
          toolbar={ZaloonenBookingTableToolbar}
        />
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default ZaloonenBookingTab;
