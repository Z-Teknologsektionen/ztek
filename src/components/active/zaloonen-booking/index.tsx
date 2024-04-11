import dayjs from "dayjs";
import type { FC } from "react";
import { AdvancedDataTable } from "~/components/data-table/advanced-data-table";
import RoleWrapper from "~/components/layout/role-wrapper";
import SecondaryTitle from "~/components/layout/secondary-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import { api } from "~/utils/api";
import { ActionRequiredBookingCard } from "./action-required-booking-card";
import { zaloonenBookingColumns } from "./zaloonen-booking-columns";
import { ZaloonenBookingTableToolbar } from "./zaloonen-booking-table-toolbar";

const ZaloonenBookingTab: FC = () => {
  const {
    data: bookings,
    isLoading: isLoadingBookings,
    isError: isBookingError,
  } = api.zaloonen.getAllBookingsAsAuthed.useQuery();

  if (isLoadingBookings) {
    return <SectionWrapper>Loading...</SectionWrapper>;
  }
  if (isBookingError) {
    return <SectionWrapper>Error</SectionWrapper>;
  }
  if (!bookings) {
    return <SectionWrapper>No bookings</SectionWrapper>;
  }

  const approvedBookingsSorted = bookings
    .filter(
      (booking) =>
        booking.bookingStatus === "APPROVED_FIRST_DATETIME" ||
        booking.bookingStatus === "APPROVED_SECOND_DATETIME",
    )
    .sort((a, b) =>
      a.approvedStartDateTime && b.approvedStartDateTime
        ? a.approvedStartDateTime > b.approvedStartDateTime
          ? 1
          : -1
        : 0,
    );

  const actionRequiredBookings = approvedBookingsSorted.filter(
    (booking) =>
      dayjs(new Date()).diff(dayjs(booking.primaryStartDateTime), "d") <= 0,
  );

  return (
    <RoleWrapper accountRole={"MODIFY_ZALOONEN_BOOKING"}>
      <SectionWrapper>
        <div className="grid grid-cols-6 gap-3">
          <div className="col-span-4">
            <SecondaryTitle center>Actions required</SecondaryTitle>
            <div className="grid grid-cols-3 gap-4">
              {actionRequiredBookings &&
                actionRequiredBookings.length > 0 &&
                actionRequiredBookings.map((booking) => (
                  <ActionRequiredBookingCard
                    key={booking.id + "card"}
                    booking={booking}
                  />
                ))}
            </div>
          </div>
          <div className="col-span-2 ">
            <SecondaryTitle center>Kommande bokningar</SecondaryTitle>
            <div className="flex flex-col items-center gap-2">
              {bookings &&
                bookings
                  .filter(
                    (booking) =>
                      booking.bookingStatus === "APPROVED_FIRST_DATETIME" ||
                      booking.bookingStatus === "APPROVED_SECOND_DATETIME",
                  )
                  .sort((a, b) =>
                    a.approvedStartDateTime && b.approvedStartDateTime
                      ? a.approvedStartDateTime > b.approvedStartDateTime
                        ? 1
                        : -1
                      : 0,
                  )
                  .map((booking) => (
                    <div key={booking.id} className="w-full px-4">
                      <div className="flex justify-between">
                        <p>
                          {booking.eventName}-{booking.organizerName}
                        </p>
                        <p>
                          Om{" "}
                          {dayjs(new Date()).diff(
                            dayjs(booking.primaryStartDateTime),
                            "d",
                          )}{" "}
                          dag(ar)
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
        <div className="">
          <SecondaryTitle center>Alla bokningar</SecondaryTitle>
          <AdvancedDataTable
            columns={zaloonenBookingColumns}
            data={bookings ?? []}
            error={isBookingError}
            loading={isLoadingBookings}
            toolbar={ZaloonenBookingTableToolbar}
          />
        </div>
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default ZaloonenBookingTab;
