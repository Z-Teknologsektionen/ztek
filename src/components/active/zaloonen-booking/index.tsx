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

import { useLocalStorage } from "usehooks-ts";

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
    "table",
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
                        <Link
                          className="truncate"
                          href={`#${booking.id}`}
                          onClick={() => setSelectedTab("table")}
                        >
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
          <Tabs
            className=""
            defaultValue={selectedTab}
            onValueChange={setSelectedTab}
            value={selectedTab}
          >
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
                    //   toolbar: (props) => {
                    //     return (
                    //       <div className="mb-4 grid grid-cols-3">
                    //         <div className="flex justify-start gap-2">
                    //           <Popover>
                    //             <PopoverTrigger asChild>
                    //               <Button
                    //                 className="h-8 border-dashed"
                    //                 size="sm"
                    //                 variant="outline"
                    //               >
                    //                 <PlusCircledIcon className="mr-2 h-4 w-4" />
                    //                 Filtrera på status
                    //                 {selectedBookingStatuses.length > 0 && (
                    //                   <>
                    //                     <Separator
                    //                       className="mx-2 h-4"
                    //                       orientation="vertical"
                    //                     />
                    //                     <Badge
                    //                       className="rounded-sm px-1 font-normal lg:hidden"
                    //                       variant="secondary"
                    //                     >
                    //                       {selectedBookingStatuses.length}
                    //                     </Badge>
                    //                     <div className="hidden space-x-1 lg:flex">
                    //                       {selectedBookingStatuses.length > 2 ? (
                    //                         <Badge
                    //                           className="rounded-sm px-1 font-normal"
                    //                           variant="secondary"
                    //                         >
                    //                           {selectedBookingStatuses.length}{" "}
                    //                           valda
                    //                         </Badge>
                    //                       ) : (
                    //                         Object.values(ZaloonenBookingStatus)
                    //                           .filter((option) =>
                    //                             selectedBookingStatuses.includes(
                    //                               option,
                    //                             ),
                    //                           )
                    //                           .map((option) => (
                    //                             <Badge
                    //                               key={option}
                    //                               className={`rounded-sm px-1 font-normal`}
                    //                               // color={option.iconColor}
                    //                               variant="secondary"
                    //                             >
                    //                               {option}
                    //                             </Badge>
                    //                           ))
                    //                       )}
                    //                     </div>
                    //                   </>
                    //                 )}
                    //               </Button>
                    //             </PopoverTrigger>
                    //             <PopoverContent
                    //               align="start"
                    //               className="w-auto p-0"
                    //             >
                    //               <Command>
                    //                 <CommandInput placeholder={"Sök"} />
                    //                 <CommandList>
                    //                   <CommandEmpty>
                    //                     Inga resultat hittades.
                    //                   </CommandEmpty>
                    //                   <CommandGroup>
                    //                     {Object.values(ZaloonenBookingStatus).map(
                    //                       (option) => {
                    //                         const isSelected =
                    //                           selectedBookingStatuses.includes(
                    //                             option,
                    //                           );
                    //                         return (
                    //                           <CommandItem
                    //                             key={option}
                    //                             onSelect={() => {
                    //                               if (isSelected) {
                    //                                 setSelectedBookingStatuses(
                    //                                   (prev) =>
                    //                                     prev.filter(
                    //                                       (s) => s !== option,
                    //                                     ),
                    //                                 );
                    //                               } else {
                    //                                 setSelectedBookingStatuses(
                    //                                   (prev) => [...prev, option],
                    //                                 );
                    //                               }
                    //                             }}
                    //                           >
                    //                             <div
                    //                               className={cn(
                    //                                 "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                    //                                 isSelected
                    //                                   ? "bg-primary text-primary-foreground"
                    //                                   : "opacity-50 [&_svg]:invisible",
                    //                               )}
                    //                             >
                    //                               <CheckIcon
                    //                                 className={cn("h-4 w-4")}
                    //                               />
                    //                             </div>

                    //                             <span>{option}</span>
                    //                           </CommandItem>
                    //                         );
                    //                       },
                    //                     )}
                    //                   </CommandGroup>
                    //                   {selectedBookingStatuses.length > 0 && (
                    //                     <>
                    //                       <CommandSeparator />
                    //                       <CommandGroup>
                    //                         <CommandItem
                    //                           className="justify-center text-center"
                    //                           onSelect={() => {
                    //                             setSelectedBookingStatuses([]);
                    //                           }}
                    //                         >
                    //                           Rensa filter
                    //                         </CommandItem>
                    //                       </CommandGroup>
                    //                     </>
                    //                   )}
                    //                 </CommandList>
                    //               </Command>
                    //             </PopoverContent>
                    //           </Popover>
                    //           {selectedBookingStatuses.length > 0 && (
                    //             <Button
                    //               className="h-8 px-2 lg:px-3"
                    //               onClick={() => setSelectedBookingStatuses([])}
                    //               variant="outline"
                    //             >
                    //               Återställ
                    //               <Cross2Icon className="ml-2 h-4 w-4" />
                    //             </Button>
                    //           )}
                    //         </div>
                    //         <div className="flex justify-center text-center text-lg">
                    //           <MdArrowBack
                    //             className="cursor-pointer"
                    //             onClick={() => props.onNavigate("PREV")}
                    //             size={20}
                    //           />
                    //           <p className="w-56 text-base font-medium capitalize  underline">
                    //             {props.view === "month" &&
                    //               moment(props.label)
                    //                 .format("MMMM")
                    //                 .toUpperCase()}
                    //             {props.view === "week" && props.label}
                    //             {props.view === "day" && props.label}
                    //           </p>
                    //           <MdArrowForward
                    //             className="cursor-pointer"
                    //             onClick={() => props.onNavigate("NEXT")}
                    //             size={20}
                    //           />
                    //         </div>
                    //         <div className="flex h-6 justify-end p-2">
                    //           <Button
                    //             className={cn(
                    //               "mr-3 h-6",
                    //               props.view === "day" ? "bg-slate-300" : "",
                    //             )}
                    //             onClick={() => props.onNavigate("TODAY")}
                    //             variant={"outline"}
                    //           >
                    //             Idag
                    //           </Button>
                    //           <Button
                    //             className={cn(
                    //               "h-6 rounded-l-md rounded-r-none",
                    //               props.view === "day" ? "bg-slate-300" : "",
                    //             )}
                    //             onClick={() => props.onView("day")}
                    //             variant={"outline"}
                    //           >
                    //             Dag
                    //           </Button>
                    //           <Button
                    //             className={cn(
                    //               "h-6 rounded-none",
                    //               props.view === "week" ? "bg-slate-300" : "",
                    //             )}
                    //             onClick={() => props.onView("week")}
                    //             variant={"outline"}
                    //           >
                    //             Vecka
                    //           </Button>
                    //           <Button
                    //             className={cn(
                    //               "h-6 rounded-l-none rounded-r-md",
                    //               props.view === "month" ? "bg-slate-300" : "",
                    //             )}
                    //             onClick={() => props.onView("month")}
                    //             variant={"outline"}
                    //           >
                    //             Månad
                    //           </Button>
                    //         </div>
                    //       </div>
                    //     );
                    //   },
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
                        zaloonenBookingStatusColorClassnames[
                          event.bookingStatus
                        ],
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
        </div>
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default ZaloonenBookingTab;
