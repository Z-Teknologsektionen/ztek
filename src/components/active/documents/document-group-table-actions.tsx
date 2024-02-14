import { MoreHorizontal } from "lucide-react";
import { useState, type FC } from "react";
import { UpsertDocumentGroupForm } from "~/components/active/documents/upsert-document-group-form";
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
  useDeleteDocumentGroup,
  useUpdateDocumentGroup,
} from "~/hooks/mutations/useMutateDocumentGroup";

export const DocumentGroupTableActions: FC<{
  extraText: string;
  id: string;
  name: string;
}> = ({ id, ...values }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: updateDocumentGroup } = useUpdateDocumentGroup({
    onSuccess: () => setIsOpen(false),
  });

  const { mutate: deleteDocumentGroup } = useDeleteDocumentGroup({});

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
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Redigera
            </DropdownMenuItem>
          }
        />
        <DeleteDialog
          onSubmit={() => deleteDocumentGroup({ id })}
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
