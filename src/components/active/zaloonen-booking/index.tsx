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
import { Calendar, momentLocalizer } from "react-big-calendar";

import { FaFileContract } from "react-icons/fa";
import { useLocalStorage } from "usehooks-ts";
import IconWithTooltip from "~/components/tooltips/icon-with-tooltip";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { zaloonenBookingStatusColorClassnames } from "~/constants/zaloonen";
import { api } from "~/utils/api";
import { cn } from "~/utils/utils";
import { ActionRequiredBookingCard } from "./action-required-booking-card";
import { BookingPopoverInfo } from "./booking-popover-info";
import CalendarToolbar from "./calendar-toolbar";
import { zaloonenBookingColumns } from "./zaloonen-booking-columns";
import { ZaloonenBookingTableToolbar } from "./zaloonen-booking-table-toolbar";

import { FaBuildingCircleExclamation } from "react-icons/fa6";
import ZaloonenScreeningTab from "./zaloonen-screenings";
const ZaloonenBookingTab: FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<ZaloonenBooking | null>(
    null,
  );

  const [selectedBookingStatuses, setSelectedBookingStatuses] = useLocalStorage<
    ZaloonenBookingStatus[]
  >("zaloonenCalendarFilter", [
    ZaloonenBookingStatus.APPROVED,
    ZaloonenBookingStatus.COMPLETED,
    ZaloonenBookingStatus.ON_HOLD,
    ZaloonenBookingStatus.REQUESTED,
  ]);

  const [selectedTab, setSelectedTab] = useLocalStorage(
    "zaloonenSelectedTab",
    "overview",
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
    return <SectionWrapper>Inga bokningar</SectionWrapper>;
  }

  //DayJS does NOT work with this calendar
  moment.locale("sv");
  const localizer = momentLocalizer(moment);

  const actionRequiredBookings = bookings
    .filter((booking) => {
      const isWithin30Days =
        dayjs(booking.startDateTime).diff(dayjs(), "d") < 30;

      const isRequested =
        booking.bookingStatus === ZaloonenBookingStatus.REQUESTED &&
        isWithin30Days;
      const isApprovedButNoInspector =
        booking.bookingStatus === ZaloonenBookingStatus.APPROVED &&
        !booking.bookingInspectorId &&
        isWithin30Days;
      const isApprovedButNoPartyNoticeSent =
        booking.bookingStatus === ZaloonenBookingStatus.APPROVED &&
        !booking.partyNoticeSent &&
        isWithin30Days;
      const approvedAndStartDatePassed =
        booking.bookingStatus === ZaloonenBookingStatus.APPROVED &&
        dayjs(booking.startDateTime).isBefore(dayjs());
      const isOnHold = booking.bookingStatus === ZaloonenBookingStatus.ON_HOLD;
      // return true;
      return (
        isApprovedButNoInspector ||
        isApprovedButNoPartyNoticeSent ||
        approvedAndStartDatePassed ||
        isOnHold ||
        isRequested
      );
    })
    .sort((a, b) => (a.startDateTime > b.startDateTime ? 1 : -1));

  return (
    <RoleWrapper accountRole={AccountRoles.MODIFY_ZALOONEN_BOOKING}>
      <SectionWrapper className="pt-2">
        <Tabs
          className="mt-0"
          defaultValue={selectedTab}
          onValueChange={setSelectedTab}
          value={selectedTab}
        >
          <TabsList className="grid w-full grid-cols-5">
            {/* TODO: Lägg till najs INFO om de finns t.ex. avsyningar att administrera */}
            <TabsTrigger value="overview">Överblick</TabsTrigger>
            <TabsTrigger value="requested">Bokningsförfrågningar</TabsTrigger>
            <TabsTrigger value="screenings">Avsyningar</TabsTrigger>
            <TabsTrigger value="allBookings">Alla bokningar</TabsTrigger>
            <TabsTrigger value="calendar">Kalender</TabsTrigger>
          </TabsList>
          <TabsContent value="screenings">
            <ZaloonenScreeningTab bookings={bookings} />
          </TabsContent>
          <TabsContent value="overview">
            <div className="min-h-80 grid grid-cols-6 gap-3">
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
                  Kommande godkända bokningar
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
                      .sort((a, b) =>
                        a.startDateTime < b.startDateTime ? -1 : 1,
                      )
                      .map((booking) => (
                        <div key={booking.id} className="w-full px-4">
                          <div className="flex justify-between">
                            <div className="flex gap-x-1">
                              <IconWithTooltip
                                className={cn(
                                  booking.partyNoticeSent
                                    ? "fill-success"
                                    : "fill-danger",
                                )}
                                icon={FaFileContract}
                                size={15}
                                tooltipText={
                                  booking.partyNoticeSent
                                    ? "Festanmälan skickad"
                                    : "Festanmälan ej skickad"
                                }
                              />
                              <IconWithTooltip
                                className={cn(
                                  booking.bookingInspectorId
                                    ? "fill-success"
                                    : "fill-danger",
                                )}
                                icon={FaBuildingCircleExclamation}
                                size={17}
                                tooltipText={
                                  booking.bookingInspectorId
                                    ? "Avsynare tilldelad"
                                    : "Avsynare ej tilldelad"
                                }
                              />
                              {booking.eventName}-{booking.organizerName}
                            </div>
                            <p className="shrink-0">
                              Om{" "}
                              {dayjs(dayjs(booking.startDateTime)).diff(
                                dayjs(),
                                "d",
                              )}{" "}
                              {dayjs(dayjs(booking.startDateTime)).diff(
                                dayjs(),
                              ) === 1
                                ? " dag"
                                : " dagar"}
                            </p>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="allBookings">
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
            <div>
              <Calendar
                className="col-span-5"
                components={{
                  event: ({ event }) => (
                    <div className={cn("flex flex-row rounded-md")}>
                      <BookingPopoverInfo
                        booking={event}
                        onOpenChange={(open) => {
                          if (!open) {
                            setSelectedEvent(null);
                          }
                        }}
                        open={
                          (selectedEvent && event.id === selectedEvent.id) ??
                          undefined
                        }
                      />
                      {event.eventName}-{event.organizerName}
                    </div>
                  ),
                  toolbar: (props) => (
                    <CalendarToolbar
                      label={props.label}
                      onNavigate={props.onNavigate}
                      onView={props.onView}
                      selectedBookingStatuses={selectedBookingStatuses}
                      setSelectedBookingStatuses={setSelectedBookingStatuses}
                      view={props.view}
                    />
                  ),
                }}
                culture="sv"
                dayLayoutAlgorithm={"overlap"}
                defaultView="week"
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
                    className:
                      zaloonenBookingStatusColorClassnames[event.bookingStatus],
                    style: {
                      backgroundColor,
                    },
                  };
                }}
                events={bookings.filter(
                  (booking) =>
                    selectedBookingStatuses.includes(booking.bookingStatus) ||
                    selectedBookingStatuses.length === 0,
                )}
                localizer={localizer}
                onSelectEvent={setSelectedEvent}
                scrollToTime={new Date("2021-09-01T17:00:00.000Z")}
                showMultiDayTimes={false}
                startAccessor="startDateTime"
                style={{ height: 800 }}
              />
            </div>
          </TabsContent>
        </Tabs>
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default ZaloonenBookingTab;
