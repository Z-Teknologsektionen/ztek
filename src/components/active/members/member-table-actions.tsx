import { useState, type FC } from "react";
import { UpsertMemberForm } from "~/components/active/members/upsert-member-form";
import DeleteTriggerButton from "~/components/buttons/delete-trigger-button";
import EditTriggerButton from "~/components/buttons/edit-trigger-button";
import ActionDialog from "~/components/dialogs/action-dialog";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import {
  useDeleteMemberAsAuthed,
  useUpdateMemberAsAuthed,
} from "~/hooks/mutations/useMutateMember";
import { useRequireAuth } from "~/hooks/useRequireAuth";
import { canCurrentUserModifyTargetRoleUser } from "~/utils/can-user-edit-user";
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

  const { data: session } = useRequireAuth();

  const userCanDelete =
    session !== null &&
    canCurrentUserModifyTargetRoleUser(session.user.roles, values.userRoles);

  const isOwnUser = session !== null && session.user.memberId === id;

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
      <ActionDialog
        disabled={!userCanDelete || isOwnUser}
        onSubmit={() => deleteMember({ id })}
        trigger={<DeleteTriggerButton />}
      />
    </div>
  );
};
