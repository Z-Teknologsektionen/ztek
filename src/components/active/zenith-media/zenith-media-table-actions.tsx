import { MoreHorizontal } from "lucide-react";
import { useState, type FC } from "react";
import toast from "react-hot-toast";
import { UpsertZenithMediaForm } from "~/components/active/zenith-media/upsert-zenith-media-form";
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
import type { ZenithMediaType } from "./zenith-media-columns";

export const ZenithMediaTableActions: FC<ZenithMediaType> = ({
  id,
  ...values
}) => {
  const ctx = api.useUtils();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: updateZenithMedia } = api.zenithMedia.updateOne.useMutation({
    onMutate: () => toast.loading("Uppdaterar media..."),
    onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
    onSuccess: () => {
      setIsOpen(false);
      toast.success("Median har uppdaterats!");
      void ctx.zenithMedia.invalidate();
    },
    onError: (error) => {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Något gick fel. Försök igen senare");
      }
    },
  });

  const { mutate: deleteZenithMedia } = api.zenithMedia.deleteOne.useMutation({
    onMutate: () => toast.loading("Raderar media..."),
    onSettled: (_c, _d, _e, toastId) => {
      toast.remove(toastId);
      void ctx.zenithMedia.invalidate();
    },
    onSuccess: () => toast.success("Median har raderats!"),
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
            <UpsertZenithMediaForm
              key={id}
              defaultValues={values}
              formType="update"
              onSubmit={({ ...rest }) =>
                updateZenithMedia({
                  id: id,
                  ...rest,
                })
              }
            />
          }
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title="Uppdatera media"
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Redigera
            </DropdownMenuItem>
          }
        />
        <DeleteDialog
          onSubmit={() => deleteZenithMedia({ id })}
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
