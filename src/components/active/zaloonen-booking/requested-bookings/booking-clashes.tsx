import { ZaloonenBookingStatus } from "@prisma/client";
import moment from "moment";
import type { FC } from "react";
import { MdCheckBox } from "react-icons/md";
import IconWithTooltip from "~/components/tooltips/icon-with-tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import type { ZaloonenBooking } from "..";

type BookingClashesProps = {
  booking: ZaloonenBooking;
};

export const BookingClashes: FC<BookingClashesProps> = ({ booking }) => {
  const warningOverlaps = booking.overlaps.filter(
    (b) => b.bookingStatus == ZaloonenBookingStatus.REQUESTED,
  );

  const dangerOverlaps = booking.overlaps.filter((b) =>
    (
      [
        ZaloonenBookingStatus.APPROVED,
        ZaloonenBookingStatus.ON_HOLD,
        ZaloonenBookingStatus.COMPLETED,
      ] as ZaloonenBookingStatus[]
    ).includes(b.bookingStatus),
  );

  return (
    <div>
      {booking.overlaps.length == 0 && (
        <div className="flex justify-center">
          <IconWithTooltip
            className="fill-success"
            icon={MdCheckBox}
            size={20}
            tooltipText={"Inga krockar"}
          />
        </div>
      )}

      {booking.overlaps.length > 0 && (
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center justify-center">
              <div className="flex space-x-3 rounded-md bg-gray-200 p-2 hover:cursor-pointer hover:bg-gray-300">
                {warningOverlaps.length + 1 > 0 && (
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-warning">
                    {warningOverlaps.length}
                  </div>
                )}
                {dangerOverlaps.length > 0 && (
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-danger">
                    {dangerOverlaps.length}
                  </div>
                )}
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4 space-y-2">
              <h4 className="font-medium leading-none">Bokningskrockar</h4>
              <p className="text-muted-foreground text-sm">
                Denna bokning krockar med följande bokningar.
              </p>
              <ul>
                {booking.overlaps.map((overlap) => (
                  <li key={booking.id + "_" + overlap.id + "_overlap"}>
                    <strong>Event:</strong> {overlap.eventName} <br />
                    <strong>Ansvarig:</strong> {overlap.organizerName} <br />
                    <strong>Status:</strong> {overlap.bookingStatus} <br />
                    <strong>Tid:</strong>{" "}
                    {moment(overlap.startDateTime).format("D MMM HH:mm")} -{" "}
                    {moment(overlap.endDateTime).format("D MMM HH:mm")}
                  </li>
                ))}
              </ul>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
