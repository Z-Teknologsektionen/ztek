import { useState, type FC } from "react";
import UpsertCommitteeForm from "~/components/active/committees/upsert-committee-form";
import DeleteTriggerButton from "~/components/buttons/delete-trigger-button";
import EditTriggerButton from "~/components/buttons/edit-trigger-button";
import ActionDialog from "~/components/dialogs/action-dialog";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";

import {
  useDeleteCommitteeAsAuthed,
  useUpdateCommitteeAsAuthed,
} from "~/hooks/mutations/useMutateCommittee";
import type { CommitteeType } from "./committee-columns";

export const CommitteeTableActions: FC<CommitteeType> = ({ id, ...values }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: updateCommittee } = useUpdateCommitteeAsAuthed({
    onSuccess: () => setIsOpen(false),
  });

  const { mutate: deleteMember } = useDeleteCommitteeAsAuthed({});

  return (
    <div className="flex justify-end">
      <UpsertDialog
        form={
          <UpsertCommitteeForm
            key={id}
            defaultValues={{
              ...values,
              socialLinks: values.socialLinks.map(
                ({ iconVariant, order, url }) => ({
                  iconAndUrl: {
                    iconVariant,
                    url,
                  },
                  order,
                }),
              ),
            }}
            formType="update"
            onSubmit={(updatedValues) =>
              updateCommittee({
                id: id,
                ...updatedValues,
              })
            }
          />
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Uppdatera organ"
        trigger={<EditTriggerButton />}
      />
      <ActionDialog
        onSubmit={() => deleteMember({ id })}
        trigger={<DeleteTriggerButton />}
      />
    </div>
  );
};
