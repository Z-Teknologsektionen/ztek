import moment from "moment";
import type { FC } from "react";
import { FaInfoCircle } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Separator } from "~/components/ui/separator";
import { TABLE_ICON_SIZE } from "~/constants/size-constants";
import {
  getZaloonenBookingEventNameFromType,
  getZaloonenBookingNameFromType,
} from "~/utils/get-zaloonen-info-from-enum";
import { cn } from "~/utils/utils";
import type { ZaloonenBookingType } from "./all-bookings/zaloonen-booking-columns";

type BookingPopoverInfoProps = {
  booking: ZaloonenBookingType;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
};

export const BookingPopoverInfo: FC<BookingPopoverInfoProps> = ({
  booking,
  onOpenChange,
  open,
}) => {
  return (
    <Popover onOpenChange={onOpenChange} open={open}>
      <PopoverTrigger>
        <FaInfoCircle className={cn("fill-zBlack")} size={TABLE_ICON_SIZE} />
        <p className="sr-only">Visa beskrivning</p>
      </PopoverTrigger>
      <PopoverContent className="text-sm" side="top">
        <div className="text-center ">
          <h1 className="font-medium underline">{booking.eventName}</h1>
          <p>{booking.eventDescription}</p>
        </div>
        <Separator className="my-2" />
        <div>
          <div>
            <p className="font-medium underline">Tid:</p>
            {moment(booking.startDateTime).format("D MMM HH:mm")} -{" "}
            {moment(booking.endDateTime).format("D MMM HH:mm")}.{" "}
            <p>
              {moment(booking.endDateTime).diff(
                moment(booking.startDateTime),
                "hours",
              )}{" "}
              timmar
            </p>
          </div>
          <div>
            <p className="font-medium underline">Typ: </p>
            {getZaloonenBookingEventNameFromType(booking.eventType)}
          </div>
          <div>
            <p className="font-medium underline">Vad: </p>
            {getZaloonenBookingNameFromType(booking.bookingType)}
          </div>
          <p className="font-medium underline">Arragör:</p>
          <p>{booking.organizerName}</p>
          <p>
            <a
              className="text-blue-400 underline underline-offset-1"
              href={`mailto:${booking.organizerEmail}`}
            >
              {booking.organizerEmail}
            </a>
          </p>
          <p className="font-medium underline">Festansvarig:</p>
          <p>
            {booking.partyManagerName}{" "}
            <a
              className="text-blue-400 underline underline-offset-1"
              href={`tel:${booking.partyManagerPhone}`}
            >
              {booking.partyManagerPhone}
            </a>
          </p>
          <p>
            <a
              className="text-blue-400 underline underline-offset-1"
              href={`mailto:${booking.partyManagerEmail}`}
            >
              {booking.partyManagerEmail}
            </a>
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};
