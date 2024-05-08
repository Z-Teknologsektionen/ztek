import { useState, type FC } from "react";
import DeleteTriggerButton from "~/components/buttons/delete-trigger-button";
import EditTriggerButton from "~/components/buttons/edit-trigger-button";
import DeleteDialog from "~/components/dialogs/delete-dialog";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import {
  useDeleteOldCommitteAsAuthed,
  useUpdateOldCommitteAsAuthed,
} from "~/hooks/mutations/useMutateOldCommittee";
import type { OldCommitteeType } from "./old-committee-columns";
import UpsertOldCommitteeForm from "./upsert-old-committee-form";

export const OldCommitteeTableActions: FC<OldCommitteeType> = ({
  id,
  ...values
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: updateOldCommittee } = useUpdateOldCommitteAsAuthed({
    onSuccess: () => setIsOpen(false),
  });

  const { mutate: deleteOldCommittee } = useDeleteOldCommitteAsAuthed({});

  return (
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
  );
};
