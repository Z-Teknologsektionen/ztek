import { MoreHorizontal } from "lucide-react";
import type { FC } from "react";
import toast from "react-hot-toast";
import DeleteDialog from "~/components/admin/delete-dialog";
import UpsertProgramBoardMemberForm from "~/components/admin/program-board/upsert-program-board-form";
import { UpsertDialog } from "~/components/admin/upsert-dialog";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { api } from "~/utils/api";

export const ProgramBoardMemberTableActions: FC<{
  email: string;
  id: string;
  image: string | undefined;
  name: string;
  order: number;
  phone: string | undefined;
  role: string;
  url: string;
}> = ({ id, ...values }) => {
  const ctx = api.useUtils();

  const { mutate: updateProgramBoardMember } =
    api.programBoard.updateOne.useMutation({
      onMutate: () => toast.loading("Uppdaterar medlem..."),
      onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
      onSuccess: () => {
        toast.success(`Medlemen har uppdaterats!`);
        void ctx.programBoard.invalidate();
      },
      onError: (error) => {
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Något gick fel. Försök igen senare");
        }
      },
    });

  const { mutate: deleteProgramBoardMember } =
    api.programBoard.deleteOne.useMutation({
      onMutate: () => toast.loading("Raderar medlem..."),
      onSettled: (_c, _d, _e, toastId) => {
        toast.remove(toastId);
        void ctx.programBoard.invalidate();
      },
      onSuccess: () => toast.success("Medlem har raderats!"),
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
            <UpsertProgramBoardMemberForm
              key={id}
              defaultValues={values}
              onSubmit={({ phone, image, ...rest }) =>
                updateProgramBoardMember({
                  id: id,
                  image: image !== "" ? image : undefined,
                  phone: phone !== "" ? phone : undefined,
                  ...rest,
                })
              }
              type="update"
            />
          }
          title="Uppdatera programmedlem"
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Redigera
            </DropdownMenuItem>
          }
        />
        <DeleteDialog
          onSubmit={() => deleteProgramBoardMember({ id })}
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