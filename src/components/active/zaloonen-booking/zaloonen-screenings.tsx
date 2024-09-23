import { ZaloonenBookingStatus, type ZaloonenBooking } from "@prisma/client";
import type { FC } from "react";

type ZaloonenScreeningProps = {
  bookings: ZaloonenBooking[];
};

const ZaloonenScreeningTab: FC<ZaloonenScreeningProps> = ({ bookings }) => {
  const notAssignedBookings = bookings.filter(
    (b) => b.bookingInspectorId === null,
  );
  const noVerdictBookings = bookings.filter(
    (b) => b.bookingStatus === ZaloonenBookingStatus.APPROVED,
  );

  const isOnHoldBookings = bookings.filter(
    (b) => b.bookingStatus === ZaloonenBookingStatus.ON_HOLD,
  );

  const usersAssignedBookings = bookings.filter();

  return <div>Hej</div>;
};

export default ZaloonenScreeningTab;
