import { ZaloonenBookingStatus } from "@prisma/client";
import type { FC } from "react";
import { FaFileContract } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import IconNextToText from "~/components/layout/icon-next-to-text";
import IconWithTooltip from "~/components/tooltips/icon-with-tooltip";
import { cn } from "~/utils/utils";
import type { ZaloonenBookingType } from "./zaloonen-booking-columns";
import { ZaloonenStatusBadge } from "./zaloonen-status-badge";

export const ZaloonenBookingStatusActions: FC<ZaloonenBookingType> = ({
  id,
  ...values
}) => {
  //   const { mutate: updateZaloonenBookingStatus } =
  //     useUpdateZaloonenBookingStatusAsAuthed({});

  //     onValueChange={(value) =>
  //           updateZaloonenBookingStatus({
  //             id,
  //             bookingStatus: value as ZaloonenBookingStatus,
  //           })
  //         }

  return (
    <div className="flex w-fit flex-row gap-2">
      <ZaloonenStatusBadge status={values.bookingStatus}>
        <IconNextToText
          icon={MdEdit}
          iconClassName="fill-white"
          text={values.bookingStatus}
          textFirst={true}
          tooltipText="Ändra status"
        />
      </ZaloonenStatusBadge>
      {values.bookingStatus !== ZaloonenBookingStatus.DENIED &&
        values.bookingStatus !== ZaloonenBookingStatus.REQUESTED && (
          <div className="content-center">
            <IconWithTooltip
              className={cn(
                values.partyNoticeSent ? "fill-success" : "fill-danger",
              )}
              icon={FaFileContract}
              size={15}
              tooltipText={
                values.partyNoticeSent
                  ? "Festanmälan skickad"
                  : "Festanmälan ej skickad"
              }
            />
          </div>
        )}
    </div>
  );
};
