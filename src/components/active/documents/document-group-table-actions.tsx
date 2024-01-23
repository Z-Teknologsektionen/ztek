import { MoreHorizontal } from "lucide-react";
import type { FC } from "react";
import toast from "react-hot-toast";
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
import { api } from "~/utils/api";

export const DocumentGroupTableActions: FC<{
  extraText: string;
  id: string;
  name: string;
}> = ({ id, ...values }) => {
  const ctx = api.useUtils();

  const { mutate: updateDocumentGroup } =
    api.document.updateOneGroup.useMutation({
      onMutate: () => toast.loading("Uppdaterar dokumentgrupp..."),
      onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
      onSuccess: (res) => {
        toast.success(JSON.stringify(res, null, 2));
        void ctx.committee.invalidate();
      },
      onError: (error) => {
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Något gick fel. Försök igen senare");
        }
      },
    });

  const { mutate: deleteDocumentGroup } =
    api.document.deleteOneGroup.useMutation({
      onMutate: () => toast.loading("Raderar dokumentgrupp..."),
      onSettled: (_c, _d, _e, toastId) => {
        toast.remove(toastId);
        void ctx.document.invalidate();
      },
      onSuccess: () => toast.success("Dokumentgruppen har raderats!"),
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
            <UpsertDocumentGroupForm
              key={id}
              defaultValues={values}
              onSubmit={({ ...rest }) =>
                updateDocumentGroup({
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
