import { MoreHorizontal } from "lucide-react";
import { useState, type FC } from "react";
import { UpsertDocumentForm } from "~/components/active/documents/upsert-document-form";
import DeleteDialog from "~/components/dialogs/delete-dialog";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0" variant="ghost">
          <span className="sr-only">Öppna meny</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
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
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Redigera
            </DropdownMenuItem>
          }
        />
        <DeleteDialog
          onSubmit={() => deleteDocument({ id })}
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Radera
            </DropdownMenuItem>
          }
        ></DeleteDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
