import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import DeleteTriggerButton from "~/components/buttons/delete-trigger-button";
import EditTriggerButton from "~/components/buttons/edit-trigger-button";
import ActionDialog from "~/components/dialogs/action-dialog";

import { useDeleteZaloonenBookingAsAuthed } from "~/hooks/mutations/useMutateZaloonenBooking";
import type { ZaloonenBookingType } from "./all-bookings/zaloonen-booking-columns";

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
