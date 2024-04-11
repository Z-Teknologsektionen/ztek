import { ZaloonenBookingStatus } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { MdCheck, MdDangerous } from "react-icons/md";
import DeleteTriggerButton from "~/components/buttons/delete-trigger-button";
import EditTriggerButton from "~/components/buttons/edit-trigger-button";
import ActionDialog from "~/components/dialogs/action-dialog";
import ButtonWithIconAndTooltip from "~/components/tooltips/button-with-icon-and-tooltip";
import {
  useDeleteZaloonenBookingAsAuthed,
  useUpdateZaloonenBookingStatusAsAuthed,
} from "~/hooks/mutations/useMutateZaloonenBooking";
import type { ZaloonenBookingType } from "./zaloonen-booking-columns";

export const ZaloonenBookingActions: FC<ZaloonenBookingType> = ({
  id,
  ...values
}) => {
  const router = useRouter();

  const { mutate: deleteZaloonenBooking } = useDeleteZaloonenBookingAsAuthed(
    {},
  );

  const { mutate: updateZaloonenBookingStatus } =
    useUpdateZaloonenBookingStatusAsAuthed({});

  const ApproveBookingButton = (
    <ButtonWithIconAndTooltip
      classNameButton="mx-2 h-6"
      classNameIcon="fill-success"
      disabled={values.bookingStatus === ZaloonenBookingStatus.APPROVED}
      icon={MdCheck}
      tooltipText={"Godkänn bokning"}
    />
  );

  const RejectBoookingButton = (
    <ButtonWithIconAndTooltip
      classNameButton="mx-2 h-6"
      classNameIcon="fill-danger"
      disabled={values.bookingStatus === ZaloonenBookingStatus.DENIED}
      icon={MdDangerous}
      tooltipText={"Neka bokning"}
    />
  );

  return (
    <>
      <div className="flex justify-end">
        {values.bookingStatus !== ZaloonenBookingStatus.APPROVED ? (
          <ActionDialog
            classNameButton="bg-success"
            description={`${values.eventName} kommer att godkännas och visas publikt i kalendern.`}
            onSubmit={() =>
              updateZaloonenBookingStatus({
                id,
                bookingStatus: ZaloonenBookingStatus.APPROVED,
              })
            }
            primaryButtonText="Godkänn"
            title="Godkänn bokning?"
            trigger={ApproveBookingButton}
            variant="default"
          />
        ) : (
          ApproveBookingButton
        )}

        <Link
          href={`${router.basePath}/student-division/zaloonen/edit-booking?id=${id}&hash=${values.hash}`}
          target="_blank"
        >
          <EditTriggerButton />
        </Link>
      </div>
      <div className="mt-2 flex justify-end">
        {values.bookingStatus !== ZaloonenBookingStatus.DENIED ? (
          <ActionDialog
            onSubmit={() =>
              updateZaloonenBookingStatus({
                id,
                bookingStatus: ZaloonenBookingStatus.DENIED,
              })
            }
            trigger={RejectBoookingButton}
          />
        ) : (
          RejectBoookingButton
        )}
        <ActionDialog
          onSubmit={() => deleteZaloonenBooking({ id })}
          trigger={<DeleteTriggerButton />}
        />
      </div>
    </>
  );
};
