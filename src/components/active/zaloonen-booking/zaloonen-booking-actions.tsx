import type { FC } from "react";
import DeleteTriggerButton from "~/components/buttons/delete-trigger-button";
import EditTriggerButton from "~/components/buttons/edit-trigger-button";

export const ZaloonenBookingActions: FC = () => {
  return (
    <div className="flex justify-end">
      {/* TODO: Add real actions */}
      <EditTriggerButton />
      <DeleteTriggerButton />
    </div>
  );
};
