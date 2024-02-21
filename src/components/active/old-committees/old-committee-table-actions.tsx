import { useState, type FC } from "react";
import toast from "react-hot-toast";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";

import DeleteTriggerButton from "~/components/buttons/delete-trigger-button";
import EditTriggerButton from "~/components/buttons/edit-trigger-button";
import DeleteDialog from "~/components/dialogs/delete-dialog";
import { TooltipProvider } from "~/components/ui/tooltip";
import { api } from "~/utils/api";
import type { OldCommitteeType } from "./old-committee-columns";
import UpsertOldCommitteeForm from "./upsert-old-committee-form";

export const OldCommitteeTableActions: FC<OldCommitteeType> = ({
  id,
  ...values
}) => {
  const ctx = api.useUtils();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: updateOldCommittee } =
    api.oldCommittee.updateOneAsActive.useMutation({
      onMutate: () => toast.loading("Uppdaterar organet..."),
      onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
      onSuccess: () => {
        toast.success(`Patetorganet har uppdaterats!`);
        setIsOpen(false);
        void ctx.oldCommittee.invalidate();
      },
      onError: (error) => {
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Något gick fel. Försök igen senare");
        }
      },
    });

  const { mutate: deleteOldCommittee } =
    api.oldCommittee.deleteOneAsActive.useMutation({
      onMutate: () => toast.loading("Raderar patetorgan..."),
      onSettled: (_c, _d, _e, toastId) => {
        toast.remove(toastId);
        void ctx.oldCommittee.invalidate();
      },
      onSuccess: () => toast.success("Patetorganet har raderats!"),
      onError: (error) => {
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Något gick fel. Försök igen senare");
        }
      },
    });

  return (
    <TooltipProvider>
      <div className="flex justify-end">
        <UpsertDialog
          form={
            <UpsertOldCommitteeForm
              key={id}
              defaultValues={values}
              formType="update"
              onSubmit={(updatedValues) =>
                updateOldCommittee({
                  id: id,
                  ...updatedValues,
                })
              }
            />
          }
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title="Uppdatera patetorgan"
          trigger={<EditTriggerButton />}
        />
        <DeleteDialog
          onSubmit={() => deleteOldCommittee({ id })}
          trigger={<DeleteTriggerButton />}
        />
      </div>
    </TooltipProvider>
  );
};
