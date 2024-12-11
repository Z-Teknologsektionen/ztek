import { ZaloonenBookingStatus } from "@prisma/client";
import { SelectLabel } from "@radix-ui/react-select";
import dayjs from "dayjs";
import type { FC } from "react";
import { MdCancel, MdCheck } from "react-icons/md";
import IconNextToText from "~/components/layout/icon-next-to-text";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  useSendZaloonenPartyNoticeAsAuthed,
  useUpdateZaloonenBookingInspectorAsAuthed,
  useUpdateZaloonenBookingStatusAsAuthed,
} from "~/hooks/mutations/useMutateZaloonenBooking";
import type { RouterOutputs } from "~/utils/api";
import { BookingPopoverInfo } from "./booking-popover-info";
import { PartyManagerPopoverInfo } from "./party-manager-popover-info";
import { ZaloonenStatusBadge } from "./zaloonen-status-badge";

type BookingCardProps = {
  booking: RouterOutputs["zaloonen"]["getAllBookingsAsAuthed"]["0"];
  bookingInspectors?: RouterOutputs["zaloonen"]["getAllBookingInspectorsAsAuthed"];
};
export const ActionRequiredBookingCard: FC<BookingCardProps> = ({
  booking,
  bookingInspectors,
}) => {
  const {
    mutate: updateZaloonenBookingInspector,
    isLoading: updatingBookingInspector,
  } = useUpdateZaloonenBookingInspectorAsAuthed({});

  const {
    mutate: updateZaloonenBookingStatus,
    isLoading: updatingZaloonenBookingStatus,
  } = useUpdateZaloonenBookingStatusAsAuthed({});

  const {
    mutate: sendZaloonenPartyNotice,
    isLoading: sendingZaloonenPartyNotice,
  } = useSendZaloonenPartyNoticeAsAuthed({});

  const isInspected =
    booking.bookingStatus === ZaloonenBookingStatus.COMPLETED ||
    booking.bookingStatus === ZaloonenBookingStatus.ON_HOLD;

  const partyNoticeRequired =
    booking.bookingStatus === ZaloonenBookingStatus.APPROVED &&
    !booking.partyNoticeSent;

  const inspectionRequired =
    booking.bookingStatus === ZaloonenBookingStatus.APPROVED &&
    booking.partyNoticeSent &&
    booking.startDateTime < dayjs().toDate();

  const assignInspectorRequired =
    booking.bookingStatus === ZaloonenBookingStatus.APPROVED &&
    booking.partyNoticeSent &&
    booking.startDateTime > dayjs().toDate() &&
    dayjs(booking.startDateTime).diff(dayjs(), "d") < 30;

  const awaitingPayment =
    booking.bookingStatus === ZaloonenBookingStatus.ON_HOLD;

  return (
    <Card className="w-fit bg-white text-center">
      <CardHeader className="pb-2">
        <CardTitle className="flex flex-row justify-center gap-2 text-lg">
          <p className="max-w-56 truncate">{booking.eventName}</p>
          <BookingPopoverInfo booking={booking} />
        </CardTitle>
        <div className="flex justify-center align-top">
          <Badge>
            {assignInspectorRequired && "Välj avsynare"}
            {inspectionRequired && "Avsyning krävs"}
            {partyNoticeRequired && "Festanmäl bokning"}
            {awaitingPayment && "Inväntar depp"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="h-44 text-sm">
        <div className="grid grid-cols-2">
          <div className="flex flex-col text-left">
            <h3 className="font-semibold underline">Start</h3>
            <p>{dayjs(booking.startDateTime).format("DD-MM-YYYY")}</p>
            <p>{dayjs(booking.startDateTime).format("HH:mm")}</p>
          </div>
          <div className="flex flex-col text-right">
            <h3 className="font-semibold underline">Slut</h3>
            <p>{dayjs(booking.endDateTime).format("DD-MM-YYYY")}</p>
            <p>{dayjs(booking.endDateTime).format("HH:mm")}</p>
          </div>
        </div>

        <div className="flex gap-2 text-left ">
          <p className="font-medium">Ansvarig: </p>
          {booking.partyManagerName}
          <PartyManagerPopoverInfo booking={booking} />
        </div>
        <div className="flex gap-2">
          <p className="font-medium">Status:</p>
          <ZaloonenStatusBadge status={booking.bookingStatus}>
            {booking.bookingStatus}
          </ZaloonenStatusBadge>
        </div>
        <IconNextToText
          className="text-sm font-medium"
          icon={booking.partyNoticeSent ? MdCheck : MdCancel}
          iconClassName={
            booking.partyNoticeSent ? "fill-success" : "fill-danger"
          }
          text="Festanmälan:"
          textFirst={true}
          tooltipText={`Festanmälan ${booking.partyNoticeSent ? "skickad" : "ej skickad"}`}
        />
        <div className="flex w-fit justify-between gap-2">
          <p className="text-left font-medium">Avsynare:</p>
          <Select
            defaultValue={booking.bookingInspectorId ?? ""}
            disabled={updatingBookingInspector}
            onValueChange={(value) =>
              updateZaloonenBookingInspector({
                id: booking.id,
                bookingInspectorId: value,
              })
            }
          >
            <SelectTrigger className=" mt-0.5 h-4">
              <SelectValue placeholder="Ingen" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {bookingInspectors && (
                  <>
                    <SelectLabel className="">Avsynare</SelectLabel>
                    {bookingInspectors.map((inspector) => {
                      return inspector.committeeMembers.map((member) => {
                        return (
                          <SelectItem
                            key={member.id}
                            className="h-4 "
                            value={member.id}
                          >
                            {member.name}
                          </SelectItem>
                        );
                      });
                    })}
                  </>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* </div> */}
        </div>
        <IconNextToText
          className="text-sm font-medium"
          icon={isInspected ? MdCheck : MdCancel}
          iconClassName={isInspected ? "fill-success" : "fill-danger"}
          text="Avsynad:"
          textFirst={true}
          tooltipText={`${isInspected ? "Avsynad" : "Ej avsynad"}`}
        />
      </CardContent>
      <CardFooter className="pb-4">
        <div className="flex w-full flex-col">
          {/* If APPROVED AND partyNoticeSent AND time is after startDate, display Godkänn avsyning -> COMPLETED. Deppa -> ON_HOLD */}
          {inspectionRequired && (
            <div className="flex justify-between gap-2">
              <Button
                className="h-6 px-2 lg:px-3"
                disabled={updatingZaloonenBookingStatus}
                onClick={() =>
                  updateZaloonenBookingStatus({
                    id: booking.id,
                    bookingStatus: ZaloonenBookingStatus.ON_HOLD,
                  })
                }
                size="lg"
                type="button"
                variant="outline"
              >
                Deppa
              </Button>
              <Button
                className="h-6 px-2 lg:px-3"
                disabled={updatingZaloonenBookingStatus}
                onClick={() =>
                  updateZaloonenBookingStatus({
                    id: booking.id,
                    bookingStatus: ZaloonenBookingStatus.COMPLETED,
                  })
                }
                size="lg"
                type="button"
                variant="outline"
              >
                Godkänn avsyning
              </Button>
            </div>
          )}
          {/* If APPROVED AND !partyNoticeSent, display Festanmäl */}
          {partyNoticeRequired && (
            <div className="flex justify-center">
              <Button
                className="h-6 px-2 lg:px-3"
                disabled={sendingZaloonenPartyNotice}
                onClick={() => sendZaloonenPartyNotice({ id: booking.id })}
                size="lg"
                type="button"
                variant="outline"
              >
                Festanmäl
              </Button>
            </div>
          )}
          {/* Status is ON_HOLD, show only "avsluta" */}
          {booking.bookingStatus === ZaloonenBookingStatus.ON_HOLD && (
            <div className="flex justify-center">
              <Button
                className="h-6 px-2 lg:px-3"
                disabled={updatingZaloonenBookingStatus}
                onClick={() =>
                  updateZaloonenBookingStatus({
                    id: booking.id,
                    bookingStatus: ZaloonenBookingStatus.COMPLETED,
                  })
                }
                size="lg"
                type="button"
                variant="outline"
              >
                Avsluta bokning
              </Button>
            </div>
          )}
          <div className="text-sm italic">
            {dayjs(booking.startDateTime).fromNow()}
          </div>
        </div>
        {/* </div> */}
      </CardFooter>
    </Card>
  );
};
