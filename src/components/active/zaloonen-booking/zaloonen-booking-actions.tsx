import { ZaloonenBookingStatus } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { FaFileContract } from "react-icons/fa";
import DeleteTriggerButton from "~/components/buttons/delete-trigger-button";
import EditTriggerButton from "~/components/buttons/edit-trigger-button";
import ActionDialog from "~/components/dialogs/action-dialog";
import IconWithTooltip from "~/components/tooltips/icon-with-tooltip";

import { MdEdit } from "react-icons/md";
import IconNextToText from "~/components/layout/icon-next-to-text";
import { useDeleteZaloonenBookingAsAuthed } from "~/hooks/mutations/useMutateZaloonenBooking";
import { cn } from "~/utils/utils";
import type { ZaloonenBookingType } from "./zaloonen-booking-columns";
import { ZaloonenStatusBadge } from "./zaloonen-status-badge";

export const ZaloonenBookingActions: FC<ZaloonenBookingType> = ({
  id,
  ...values
}) => {
  const router = useRouter();

  const { mutate: deleteZaloonenBooking } = useDeleteZaloonenBookingAsAuthed(
    {},
  );
  return (
    <div className="flex justify-end">
      <Link
        href={`${router.basePath}/student-division/zaloonen/edit-booking?id=${id}&hash=${values.hash}`}
        target="_blank"
      >
        <EditTriggerButton />
      </Link>
      <ActionDialog
        onSubmit={() => deleteZaloonenBooking({ id })}
        trigger={<DeleteTriggerButton />}
      />
    </div>
  );
};

export const ZaloonenBookingStatusActions: FC<ZaloonenBookingType> = ({
  id,
  ...values
}) => {
  // const { mutate: updateZaloonenBookingStatus } =
  //   useUpdateZaloonenBookingStatusAsAuthed({});

  //   onValueChange={(value) =>
  //         updateZaloonenBookingStatus({
  //           id,
  //           bookingStatus: value as ZaloonenBookingStatus,
  //         })
  //       }

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
