import dayjs from "dayjs";
import type { FC } from "react";
import TooltipWithChildren from "~/components/tooltips/tooltip-with-children";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { RouterOutputs } from "~/utils/api";

type BookingCardProps = {
  booking: RouterOutputs["zaloonen"]["getAllBookingsAsAuthed"]["0"];
};
export const ActionRequiredBookingCard: FC<BookingCardProps> = ({
  booking,
}) => {
  return (
    <Card className="justify-between bg-cardBackground text-center">
      <CardHeader className="h-32 max-h-32">
        <CardTitle className="truncate text-lg">
          <TooltipWithChildren
            tooltipChildren={<p className="text-sm">{booking.eventName}</p>}
            tooltipTriggerChildren={
              <p className="truncate">{booking.eventName}</p>
            }
          />
        </CardTitle>
        <TooltipWithChildren
          tooltipChildren={
            <p className="max-w-40 text-wrap">{booking.eventDescription}</p>
          }
          tooltipTriggerChildren={
            <CardDescription className="line-clamp-2">
              {booking.eventDescription}
            </CardDescription>
          }
        />
      </CardHeader>
      <CardContent className="h-40">
        <div className="grid grid-cols-2 text-sm">
          <div className="flex flex-col text-left">
            <p className="font-semibold underline">Start</p>
            <p>{dayjs(booking.startDateTime).format("DD-MM-YYYY")}</p>
            <p>{dayjs(booking.startDateTime).format("HH:mm")}</p>
          </div>
          <div className="flex flex-col text-right">
            <p className="font-semibold underline">Slut</p>
            <p>{dayjs(booking.endDateTime).format("DD-MM-YYYY HH:mm")}</p>
          </div>
        </div>
      </CardContent>
      {/* </div> */}
    </Card>
  );
};
