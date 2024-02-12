import { MoreHorizontal } from "lucide-react";
import { useState, type FC } from "react";
import toast from "react-hot-toast";
import { UpsertHomeMediaForm } from "~/components/active/home-media/upsert-home-media-form";
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
import type { HomeMediaType } from "./home-media-columns";

export const HomeMediaTableActions: FC<HomeMediaType> = ({ id, ...values }) => {
  const ctx = api.useUtils();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: updateHomeMedia } = api.homeMedia.updateOne.useMutation({
    onMutate: () => toast.loading("Uppdaterar media..."),
    onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
    onSuccess: () => {
      setIsOpen(false);
      toast.success("Median har uppdaterats!");
      void ctx.homeMedia.invalidate();
    },
    onError: (error) => {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Något gick fel. Försök igen senare");
      }
    },
  });

  const { mutate: deleteHomeMedia } = api.homeMedia.deleteOne.useMutation({
    onMutate: () => toast.loading("Raderar media..."),
    onSettled: (_c, _d, _e, toastId) => {
      toast.remove(toastId);
      void ctx.homeMedia.invalidate();
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
            <UpsertHomeMediaForm
              key={id}
              defaultValues={values}
              formType="update"
              onSubmit={({ ...rest }) =>
                updateHomeMedia({
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
          onSubmit={() => deleteHomeMedia({ id })}
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
