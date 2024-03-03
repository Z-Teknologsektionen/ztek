import { useState, type FC } from "react";
import { UpsertMemberForm } from "~/components/active/members/upsert-member-form";
import DeleteTriggerButton from "~/components/buttons/delete-trigger-button";
import EditTriggerButton from "~/components/buttons/edit-trigger-button";
import DeleteDialog from "~/components/dialogs/delete-dialog";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import {
  useDeleteMemberAsAuthed,
  useUpdateMemberAsAuthed,
} from "~/hooks/mutations/useMutateMember";
import type { CommitteeMemberType } from "./member-columns";

export const CommitteeMemberTableActions: FC<CommitteeMemberType> = ({
  id,
  ...values
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: updateMember } = useUpdateMemberAsAuthed({
    onSuccess: () => setIsOpen(false),
  });

  const { mutate: deleteMember } = useDeleteMemberAsAuthed({});

  return (
    <div className="flex justify-end">
      <UpsertDialog
        form={
          <UpsertMemberForm
            key={id}
            defaultValues={values}
            formType="update"
            onSubmit={(updatesValues) =>
              updateMember({
                id: id,
                ...updatesValues,
              })
            }
          />
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Uppdatera aktiv"
        trigger={<EditTriggerButton />}
      />
      <DeleteDialog
        onSubmit={() => deleteMember({ id })}
        trigger={<DeleteTriggerButton />}
      />
    </div>
  );
};
