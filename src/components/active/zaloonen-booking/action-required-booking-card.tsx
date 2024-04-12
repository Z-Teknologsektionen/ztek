import dayjs from "dayjs";
import type { FC } from "react";
import { MdPunchClock } from "react-icons/md";
import IconNextToText from "~/components/layout/icon-next-to-text";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import type { RouterOutputs } from "~/utils/api";

type BookingCardProps = {
  booking: RouterOutputs["zaloonen"]["getAllBookingsAsAuthed"]["0"];
};
export const ActionRequiredBookingCard: FC<BookingCardProps> = ({
  booking,
}) => {
  return (
    <Card className="bg-cardBackground text-center">
      <CardHeader>
        <CardTitle>{booking.eventName}</CardTitle>
        <CardDescription className="line-clamp-2">
          {booking.eventDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <IconNextToText
          className="my-2"
          icon={MdPunchClock}
          text={
            dayjs(booking.startDateTime).format("DD-MM-YYYY HH:mm") +
            " - " +
            dayjs(booking.endDateTime).format("DD-MM-YYYY HH:mm")
          }
          tooltipText="Bokningen börjar"
        />
      </CardContent>
      <div className="flex flex-col content-center items-center gap-2 rounded border bg-cardBackground">
        <Separator className="my-2 h-0.5" />
      </div>
      {/* </div> */}
    </Card>
  );
};
