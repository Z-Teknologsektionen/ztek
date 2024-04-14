import type { ZaloonenBooking } from "@prisma/client";
import { AccountRoles, ZaloonenBookingStatus } from "@prisma/client";
import dayjs from "dayjs";
import "moment/locale/sv";
import { useState, type FC } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AdvancedDataTable } from "~/components/data-table/advanced-data-table";
import RoleWrapper from "~/components/layout/role-wrapper";
import SecondaryTitle from "~/components/layout/secondary-title";
import SectionWrapper from "~/components/layout/section-wrapper";

import moment from "moment";
import Link from "next/link";
import { Calendar, momentLocalizer } from "react-big-calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from "~/utils/api";
import { ActionRequiredBookingCard } from "./action-required-booking-card";
import { zaloonenBookingColumns } from "./zaloonen-booking-columns";
import { ZaloonenBookingTableToolbar } from "./zaloonen-booking-table-toolbar";

const ZaloonenBookingTab: FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<ZaloonenBooking | null>(
    null,
  );

  const {
    data: bookings,
    isLoading: isLoadingBookings,
    isError: isBookingError,
  } = api.zaloonen.getAllBookingsAsAuthed.useQuery();

  const { data: bookingInspectors } =
    api.zaloonen.getAllBookingInspectorsAsAuthed.useQuery();
  if (isLoadingBookings) {
    return <SectionWrapper>Loading...</SectionWrapper>;
  }
  if (isBookingError) {
    return <SectionWrapper>Error</SectionWrapper>;
  }
  if (!bookings) {
    return <SectionWrapper>No bookings</SectionWrapper>;
  }
  moment.locale("sv");
  const localizer = momentLocalizer(moment);

  // const approvedBookingsSorted = bookings
  //   .filter(
  //     (booking) => booking.bookingStatus === ZaloonenBookingStatus.APPROVED,
  //   )
  //   .sort((a, b) => (a.startDateTime > b.startDateTime ? 1 : -1));

  const actionRequiredBookings = bookings
    .filter((booking) => {
      const isWitin30Days =
        dayjs(booking.startDateTime).diff(dayjs(), "d") < 30;
      const isApprovedButNoInspector =
        booking.bookingStatus === ZaloonenBookingStatus.APPROVED &&
        !booking.bookingInspectorId &&
        isWitin30Days;
      const isApprovedButNoPartyNoticeSent =
        booking.bookingStatus === ZaloonenBookingStatus.APPROVED &&
        !booking.partyNoticeSent &&
        isWitin30Days;
      const approvedAndStartDatePassed =
        booking.bookingStatus === ZaloonenBookingStatus.APPROVED &&
        dayjs(booking.startDateTime).isBefore(dayjs());
      const isOnHold = booking.bookingStatus === ZaloonenBookingStatus.ON_HOLD;
      // return true;
      return (
        isApprovedButNoInspector ||
        isApprovedButNoPartyNoticeSent ||
        approvedAndStartDatePassed ||
        isOnHold
      );
    })
    .sort((a, b) => (a.startDateTime > b.startDateTime ? 1 : -1));

  return (
    <RoleWrapper accountRole={AccountRoles.MODIFY_ZALOONEN_BOOKING}>
      <SectionWrapper>
        <div className="grid grid-cols-6 gap-3">
          <div className="col-span-4 rounded-md border bg-cardBackground">
            <SecondaryTitle className="mt-2" center>
              Åtgärd krävs
            </SecondaryTitle>
            <ScrollArea className="w-full p-4">
              <div className="flex w-max gap-2">
                {actionRequiredBookings &&
                  actionRequiredBookings.length > 0 &&
                  actionRequiredBookings.map((booking) => (
                    <ActionRequiredBookingCard
                      key={booking.id + "card"}
                      booking={booking}
                      bookingInspectors={bookingInspectors}
                    />
                  ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          <div className="col-span-2 rounded-md border bg-cardBackground">
            <SecondaryTitle className="my-2" center>
              Kommande bokningar
            </SecondaryTitle>
            <div className="flex flex-col items-center gap-2 overflow-y-auto">
              {bookings &&
                bookings
                  .filter(
                    (booking) =>
                      booking.bookingStatus ===
                        ZaloonenBookingStatus.APPROVED &&
                      dayjs(dayjs(booking.startDateTime)).diff(dayjs()) > 0,
                    "d",
                  )
                  .sort((a, b) => (a.startDateTime < b.startDateTime ? -1 : 1))
                  .map((booking) => (
                    <div key={booking.id} className="w-full px-4">
                      <div className="flex justify-between hover:cursor-pointer hover:font-bold">
                        <Link className="truncate" href={`#${booking.id}`}>
                          {booking.eventName}-{booking.organizerName}
                        </Link>
                        <p className="shrink-0">
                          Om{" "}
                          {dayjs(dayjs(booking.startDateTime)).diff(
                            dayjs(),
                            "d",
                          )}{" "}
                          {dayjs(dayjs(booking.startDateTime)).diff(dayjs()) ===
                          1
                            ? " dag"
                            : " dagar"}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
        <div className="">
          <SecondaryTitle center>Alla bokningar</SecondaryTitle>
          <Tabs className="" defaultValue="table">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="table">Lista</TabsTrigger>
              <TabsTrigger value="calendar">Kalender</TabsTrigger>
            </TabsList>
            <TabsContent value="table">
              <AdvancedDataTable
                columns={zaloonenBookingColumns}
                data={bookings ?? []}
                error={isBookingError}
                initialSortingState={[
                  { id: "Bokningsdatum", desc: true },
                  { id: "Inskickad", desc: true },
                ]}
                loading={isLoadingBookings}
                toolbar={ZaloonenBookingTableToolbar}
              />
            </TabsContent>
            <TabsContent value="calendar">
              <Calendar
                endAccessor="endDateTime"
                eventPropGetter={(event) => {
                  let backgroundColor;
                  switch (event.bookingStatus) {
                    case "DENIED":
                      backgroundColor = "#f87171";
                      break;
                    case "APPROVED":
                      backgroundColor = "#34d399";
                      break;
                    case "REQUESTED":
                      backgroundColor = "#fbbf24";
                      break;
                    case "ON_HOLD":
                      backgroundColor = "#60a5fa";
                      break;
                    case "COMPLETED":
                      backgroundColor = "#9ca3af";
                      break;
                    default:
                      backgroundColor = "#ffffff";
                  }
                  return {
                    style: {
                      backgroundColor,
                    },
                  };
                }}
                events={bookings}
                localizer={localizer}
                onSelectEvent={(event) => setSelectedEvent(event)}
                scrollToTime={new Date("2021-09-01T17:00:00.000Z")}
                showMultiDayTimes={true}
                startAccessor="startDateTime"
                style={{ height: 500 }}
                titleAccessor={(event) =>
                  `${event.eventName} - ${event.organizerName}`
                }
              />
              {!!selectedEvent && (
                <Popover
                  onOpenChange={() => setSelectedEvent(null)}
                  open={true}
                >
                  <PopoverTrigger>
                    <div />
                  </PopoverTrigger>
                  <PopoverContent>
                    <p>Event Name: {selectedEvent.eventName}</p>
                    <p>Organizer Name: {selectedEvent.organizerName}</p>
                    {/* Add more event details as needed */}
                  </PopoverContent>
                </Popover>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default ZaloonenBookingTab;
