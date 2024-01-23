import { MoreHorizontal } from "lucide-react";
import type { FC } from "react";
import toast from "react-hot-toast";
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
import { api } from "~/utils/api";

export const DocumentTableActions: FC<{
  group: {
    name: string;
  };
  id: string;
  isPDF: boolean;
  url: string;
}> = ({ id, ...values }) => {
  const ctx = api.useUtils();

  const { mutate: updateDocument } = api.document.updateOne.useMutation({
    onMutate: () => toast.loading("Uppdaterar dokument..."),
    onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
    onSuccess: () => {
      toast.success("Dokumentet har uppdaterats!");
      void ctx.document.invalidate();
    },
    onError: (error) => {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Något gick fel. Försök igen senare");
      }
    },
  });

  const { mutate: deleteDocument } = api.document.deleteOne.useMutation({
    onMutate: () => toast.loading("Raderar dokument..."),
    onSettled: (_c, _d, _e, toastId) => {
      toast.remove(toastId);
      void ctx.document.invalidate();
    },
    onSuccess: () => toast.success("Dokumentet har raderats!"),
    onError: (error) => {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Något gick fel. Försök igen senare");
      }
    },
  });

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
              onSubmit={({ ...rest }) =>
                updateDocument({
                  id: id,
                  ...rest,
                })
              }
              type="update"
            />
          }
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
