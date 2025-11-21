import { useState, type FC } from "react";
import UpsertCommitteeForm from "~/components/active/committees/upsert-committee-form";
import DeleteTriggerButton from "~/components/buttons/delete-trigger-button";
import EditTriggerButton from "~/components/buttons/edit-trigger-button";
import DeleteDialog from "~/components/dialogs/delete-dialog";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import {
  useDeleteCommitteeAsAuthed,
  useUpdateCommitteeAsAuthed,
} from "~/hooks/mutations/useMutateCommittee";
import { imageOperations } from "~/utils/sftp/handle-image-forms";
import type { Committee } from "./committee-columns";

export const CommitteeTableActions: FC<Committee> = ({ id, ...values }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: updateCommittee } = useUpdateCommitteeAsAuthed({
    onSuccess: () => setIsOpen(false),
  });

  const { mutate: deleteCommittee } = useDeleteCommitteeAsAuthed({});

  return (
    <div className="flex justify-end">
      <UpsertDialog
        form={
          <UpsertCommitteeForm
            key={id}
            defaultValues={values}
            formType="update"
            onSubmit={async ({ image, slug, imageFile, ...rest }) => {
              const imageResult = await imageOperations.processImageChanges({
                newImageFile: imageFile,
                currentImageUrl: image,
                oldImageUrl: values.image,
                entityName: slug,
              });

              if (!imageResult.success) {
                return;
              }
              updateCommittee({
                id,
                slug,
                image: imageResult.data,
                ...rest,
              });
            }}
          />
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Uppdatera organ"
        trigger={<EditTriggerButton />}
      />
      <DeleteDialog
        onSubmit={() => deleteCommittee({ id })}
        trigger={<DeleteTriggerButton />}
      />
    </div>
  );
};
