import { useState, type FC } from "react";
import DeleteTriggerButton from "~/components/buttons/delete-trigger-button";
import EditTriggerButton from "~/components/buttons/edit-trigger-button";
import DeleteDialog from "~/components/dialogs/delete-dialog";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import {
  useDeleteOldCommitteeAsAuthed,
  useUpdateOldCommitteeAsAuthed,
} from "~/hooks/mutations/useMutateOldCommittee";
import { imageOperations } from "~/utils/sftp/handle-image-forms";
import { slugifyString } from "~/utils/string-utils";
import type { OldCommitteeType } from "./old-committee-columns";
import UpsertOldCommitteeForm from "./upsert-old-committee-form";

export const OldCommitteeTableActions: FC<OldCommitteeType> = ({
  id,
  ...values
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: updateOldCommittee } = useUpdateOldCommitteeAsAuthed({
    onSuccess: () => setIsOpen(false),
  });

  const { mutate: deleteOldCommittee } = useDeleteOldCommitteeAsAuthed({});

  return (
    <div className="flex justify-end">
      <UpsertDialog
        form={
          <UpsertOldCommitteeForm
            key={id}
            defaultValues={values}
            formType="update"
            onSubmit={async ({
              name,
              year,
              image,
              imageFile,
              logo,
              logoFile,
              ...rest
            }) => {
              const imageResult = await imageOperations.processImageChanges({
                newImageFile: imageFile,
                currentImageUrl: image,
                oldImageUrl: "",
                entityName: slugifyString(`${name}-${year}-group`),
              });

              if (!imageResult.success) {
                return;
              }

              const logoResult = await imageOperations.processImageChanges({
                newImageFile: logoFile,
                currentImageUrl: logo,
                oldImageUrl: "",
                entityName: slugifyString(`${name}-${year}-group`),
              });

              if (!logoResult.success) {
                return;
              }
              updateOldCommittee({
                id: id,
                name,
                year,
                logo: logoResult.data,
                image: imageResult.data,
                ...rest,
              });
            }}
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
