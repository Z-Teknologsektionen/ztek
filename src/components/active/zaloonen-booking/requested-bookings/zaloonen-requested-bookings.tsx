import { ZaloonenBookingStatus } from "@prisma/client";
import type { FC } from "react";
import { AdvancedDataTable } from "~/components/data-table/advanced-data-table";
import type { ZaloonenBooking } from "..";
import { ZaloonenRequestedBookingColumns } from "./zaloonen-requested-booking-columns";

type ZaloonenRequestedBookingsProps = {
  bookings: ZaloonenBooking[];
  isBookingError: boolean;
  isBookingLoading: boolean;
};

const ZaloonenRequestedBookings: FC<ZaloonenRequestedBookingsProps> = ({
  bookings,
  isBookingError,
  isBookingLoading,
}) => {
  return (
    <div>
      <AdvancedDataTable
        columns={ZaloonenRequestedBookingColumns}
        data={bookings ?? []}
        error={isBookingError}
        initialColumnFiltersState={[
          { id: "bookingStatus", value: ZaloonenBookingStatus.REQUESTED },
        ]}
        initialSortingState={[
          { id: "Bokningsdatum", desc: true },
          { id: "Inskickad", desc: true },
        ]}
        initialVisibilityState={{ status: false }}
        loading={isBookingLoading}
      />
      hello
    </div>
  );
};

export default ZaloonenRequestedBookings;
