import { useState, type FC } from "react";
import { UpsertDocumentGroupForm } from "~/components/active/documents/upsert-document-group-form";
import DeleteTriggerButton from "~/components/buttons/delete-trigger-button";
import EditTriggerButton from "~/components/buttons/edit-trigger-button";
import DeleteDialog from "~/components/dialogs/delete-dialog";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import {
  useDeleteDocumentGroupAsAuthed,
  useUpdateDocumentGroupAsAuthed,
} from "~/hooks/mutations/useMutateDocumentGroup";

export const DocumentGroupTableActions: FC<{
  extraText: string;
  id: string;
  name: string;
}> = ({ id, ...values }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: updateDocumentGroup } = useUpdateDocumentGroupAsAuthed({
    onSuccess: () => setIsOpen(false),
  });

  const { mutate: deleteDocumentGroup } = useDeleteDocumentGroupAsAuthed({});

  return (
    <div className="flex justify-end">
      <UpsertDialog
        form={
          <UpsertDocumentGroupForm
            key={id}
            defaultValues={values}
            formType="update"
            onSubmit={({ ...rest }) =>
              updateDocumentGroup({
                id: id,
                ...rest,
              })
            }
          />
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Uppdatera dokument"
        trigger={<EditTriggerButton />}
      />
      <DeleteDialog
        onSubmit={() => deleteDocumentGroup({ id })}
        trigger={<DeleteTriggerButton />}
      />
    </div>
  );
};
