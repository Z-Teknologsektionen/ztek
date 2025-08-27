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
import { useRequireAuth } from "~/hooks/useRequireAuth";
import { canCurrentUserModifyTargetRoleUser } from "~/utils/can-user-edit-user";
import { imageOperations } from "~/utils/sftp/handle-image-forms";
import { slugifyString } from "~/utils/string-utils";
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
            onSubmit={async ({
              role,
              committeeId,
              imageFile,
              image,
              ...updatedValues
            }) => {
              const imageResult = await imageOperations.processImageChanges({
                newImageFile: imageFile,
                currentImageUrl: image,
                oldImageUrl: values.image,
                entityName: slugifyString(committeeId + role),
              });

              if (!imageResult.success) {
                return;
              }
              updateMember({
                id: id,
                image: imageResult.data || "",
                committeeId,
                role,
                ...updatedValues,
              });
            }}
          />
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Uppdatera aktiv"
        trigger={<EditTriggerButton />}
      />
      <DeleteDialog
        disabled={!userCanDelete || isOwnUser}
        onSubmit={() => deleteMember({ id })}
        trigger={<DeleteTriggerButton />}
      />
    </div>
  );
};
