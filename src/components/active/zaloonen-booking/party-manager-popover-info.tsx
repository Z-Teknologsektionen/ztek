import type { FC } from "react";
import { FaInfoCircle } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { TABLE_ICON_SIZE } from "~/constants/size-constants";
import { cn } from "~/utils/utils";
import type { ZaloonenBookingType } from "./all-bookings/zaloonen-booking-columns";

type PartyManagerPopoverInfoProps = {
  booking: ZaloonenBookingType;
};

export const PartyManagerPopoverInfo: FC<PartyManagerPopoverInfoProps> = ({
  booking,
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <FaInfoCircle className={cn("fill-zBlack")} size={TABLE_ICON_SIZE} />
        <p className="sr-only">Visa mer information</p>
      </PopoverTrigger>
      <PopoverContent className="w-fit max-w-xs" side="top">
        <p className="font-medium">{booking.partyManagerName}</p>
        <p>
          <a
            className="text-blue-400 underline underline-offset-1"
            href={`mailto:${booking.partyManagerEmail}`}
          >
            {booking.partyManagerEmail}
          </a>
        </p>
        <p>
          <a
            className="text-blue-400 underline underline-offset-1"
            href={`tel:${booking.partyManagerPhone}`}
          >
            {booking.partyManagerPhone}
          </a>
        </p>
      </PopoverContent>
    </Popover>
  );
};
