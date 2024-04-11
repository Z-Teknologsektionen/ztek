import dayjs from "dayjs";
import type { FC } from "react";
import { MdBadge, MdUpdate } from "react-icons/md";
import IconNextToText from "~/components/layout/icon-next-to-text";
import { Separator } from "~/components/ui/separator";
import type { RouterOutputs } from "~/utils/api";

type BookingCardProps = {
  booking: RouterOutputs["zaloonen"]["getAllBookingsAsAuthed"]["0"];
};
export const ActionRequiredBookingCard: FC<BookingCardProps> = ({
  booking,
}) => {
  return (
    <div className="flex flex-col content-center items-center gap-2 rounded border bg-cardBackground">
      <div className="gap-2">
        <IconNextToText
          className="my-2"
          icon={MdBadge}
          text={booking.eventName}
          tooltipText="Roll"
        />

        <Separator className="my-2 h-0.5" />
        <IconNextToText
          className="my-2"
          icon={MdUpdate}
          text={dayjs(booking.updatedAt).fromNow()}
          tooltipText="Uppdaterades senast"
        />
      </div>
    </div>
  );
};
