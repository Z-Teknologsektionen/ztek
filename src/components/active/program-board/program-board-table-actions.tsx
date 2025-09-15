import { useState, type FC } from "react";
import UpsertProgramBoardMemberForm from "~/components/active/program-board/upsert-program-board-form";
import DeleteTriggerButton from "~/components/buttons/delete-trigger-button";
import EditTriggerButton from "~/components/buttons/edit-trigger-button";
import DeleteDialog from "~/components/dialogs/delete-dialog";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import {
  useDeleteProgramBoardMemberAsAuthed,
  useUpdateProgramBoardMemberAsAuthed,
} from "~/hooks/mutations/useMutateProgramBoardMember";
import { imageOperations } from "~/utils/sftp/handle-image-forms";
import { slugifyString } from "~/utils/string-utils";
import type { ProgramBoardType } from "./program-board-columns";

export const ProgramBoardMemberTableActions: FC<ProgramBoardType> = ({
  id,
  ...values
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: updateProgramBoardMember } =
    useUpdateProgramBoardMemberAsAuthed({
      onSuccess: () => {
        setIsOpen(false);
      },
    });

  const { mutate: deleteProgramBoardMember } =
    useDeleteProgramBoardMemberAsAuthed({});

  return (
    <div className="flex justify-end">
      <UpsertDialog
        form={
          <UpsertProgramBoardMemberForm
            key={id}
            defaultValues={values}
            formType="update"
            onSubmit={async ({ role, imageFile, image, ...updatesValues }) => {
              const imageResult = await imageOperations.processImageChanges({
                newImageFile: imageFile,
                currentImageUrl: image,
                oldImageUrl: values.image,
                entityName: slugifyString(role),
              });

              if (!imageResult.success) {
                return;
              }
              updateProgramBoardMember({
                id: id,
                image: imageResult.data,
                role,
                ...updatesValues,
              });
            }}
          />
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Uppdatera programmedlem"
        trigger={<EditTriggerButton />}
      />
      <DeleteDialog
        onSubmit={() => deleteProgramBoardMember({ id })}
        trigger={<DeleteTriggerButton />}
      />
    </div>
  );
};
