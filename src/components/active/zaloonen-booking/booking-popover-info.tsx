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
import type { ZaloonenBookingType } from "./zaloonen-booking-columns";

type BookingPopoverInfoProps = {
  booking: ZaloonenBookingType;
};

export const BookingPopoverInfo: FC<BookingPopoverInfoProps> = ({
  booking,
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <FaInfoCircle className={cn("fill-zBlack")} size={TABLE_ICON_SIZE} />
        <p className="sr-only">Visa beskrivning</p>
      </PopoverTrigger>
      <PopoverContent side="top">
        <h1 className="font-medium underline">{booking.eventName}</h1>
        <p>{booking.eventDescription}</p>
        <Separator />
        <p>Typ: {getZaloonenBookingEventNameFromType(booking.eventType)}</p>
        <div>
          <p className="">Vad: </p>
          {getZaloonenBookingNameFromType(booking.bookingType)}
        </div>
        <p className="font-medium">Arragör:</p>
        <p>{booking.organizerName}</p>
        <p>
          <a
            className="text-blue-400 underline underline-offset-1"
            href={`mailto:${booking.organizerEmail}`}
          >
            {booking.organizerEmail}
          </a>
        </p>
      </PopoverContent>
    </Popover>
  );
};
