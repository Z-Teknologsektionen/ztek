import { ZaloonenBookingStatus } from "@prisma/client";
import type { FC } from "react";
import { ActionRequiredBookingCard } from "~/components/active/zaloonen-booking/action-required-booking-card";
import SecondaryTitle from "~/components/layout/secondary-title";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { api } from "~/utils/api";
import type { ZaloonenBooking } from "..";

type ZaloonenScreeningProps = {
  bookings: ZaloonenBooking[];
};

const ZaloonenScreeningTab: FC<ZaloonenScreeningProps> = ({ bookings }) => {
  const { data: bookingInspectors } =
    api.zaloonen.getAllBookingInspectorsAsAuthed.useQuery();

  const screeningBookings = bookings
    .filter(
      (b) =>
        (
          [
            ZaloonenBookingStatus.ON_HOLD,
            ZaloonenBookingStatus.APPROVED,
          ] as ZaloonenBookingStatus[]
        ).includes(b.bookingStatus) && b.partyNoticeSent,
    )
    .sort((b1, b2) => (b1.startDateTime > b2.startDateTime ? 1 : -1));

  // const completedBookings = bookings.filter(
  //   (b) => b.bookingStatus === ZaloonenBookingStatus.COMPLETED,
  // );

  const partyNoticeRequiredBookings = bookings.filter(
    (b) =>
      !b.partyNoticeSent && b.bookingStatus != ZaloonenBookingStatus.REQUESTED,
  );

  return (
    <div className="grid grid-cols-2 space-x-2">
      <div className="col-span-2 rounded-md bg-cardBackground md:col-span-1">
        <SecondaryTitle className="mt-2 pl-4">
          Aktuella avsyningar
        </SecondaryTitle>
        <ScrollArea className="w-full p-4">
          <div className="flex w-max gap-2">
            {screeningBookings &&
              screeningBookings.length > 0 &&
              screeningBookings.map((booking) => (
                <ActionRequiredBookingCard
                  key={booking.id + "screening"}
                  booking={booking}
                  bookingInspectors={bookingInspectors}
                />
              ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="col-span-2 rounded-md bg-cardBackground md:col-span-1">
        <SecondaryTitle className="mt-2 pl-4">Festanmälan krävs</SecondaryTitle>
        <ScrollArea className="w-full p-4">
          <div className="flex w-max gap-2">
            {partyNoticeRequiredBookings &&
              partyNoticeRequiredBookings.length > 0 &&
              partyNoticeRequiredBookings.map((booking) => (
                <ActionRequiredBookingCard
                  key={booking.id + "party"}
                  booking={booking}
                  bookingInspectors={bookingInspectors}
                />
              ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <h2 className="text-lg">Tidigare avsyningar</h2>
    </div>
  );
};

export default ZaloonenScreeningTab;
