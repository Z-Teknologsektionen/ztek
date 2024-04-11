import { useState, type FC } from "react";
import { UpsertDocumentForm } from "~/components/active/documents/upsert-document-form";
import DeleteTriggerButton from "~/components/buttons/delete-trigger-button";
import EditTriggerButton from "~/components/buttons/edit-trigger-button";
import ActionDialog from "~/components/dialogs/action-dialog";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import {
  useDeleteDocumentAsAuthed,
  useUpdateDocumentAsAuthed,
} from "~/hooks/mutations/useMutateDocument";
import type { DocumentType } from "./document-columns";

export const DocumentTableActions: FC<DocumentType> = ({ id, ...values }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: updateDocument } = useUpdateDocumentAsAuthed({
    onSuccess: () => setIsOpen(false),
  });

  const { mutate: deleteDocument } = useDeleteDocumentAsAuthed({});

  return (
    <div className="flex justify-end">
      <UpsertDialog
        form={
          <UpsertDocumentForm
            key={id}
            defaultValues={values}
            formType="update"
            onSubmit={({ ...rest }) =>
              updateDocument({
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
      <ActionDialog
        onSubmit={() => deleteDocument({ id })}
        trigger={<DeleteTriggerButton />}
      />
    </div>
  );
};
