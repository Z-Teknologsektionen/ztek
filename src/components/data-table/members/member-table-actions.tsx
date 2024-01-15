import { MoreHorizontal } from "lucide-react";
import type { FC } from "react";
import toast from "react-hot-toast";
import DeleteDialog from "~/components/admin/delete-dialog";
import { UpsertMemberForm } from "~/components/admin/members/upsert-member-form";
import { UpsertDialog } from "~/components/admin/upsert-dialog";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { api } from "~/utils/api";

export const CommitteeMemberTableActions: FC<{
  committeeId: string;
  email: string;
  id: string;
  image: string;
  name: string;
  nickName: string;
  order: number;
  phone: string;
  role: string;
}> = ({ id, ...values }) => {
  const ctx = api.useUtils();

  const { mutate: updateMember } = api.member.updateMemberAsAdmin.useMutation({
    onMutate: () => toast.loading("Uppdaterar medlem..."),
    onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
    onSuccess: () => {
      toast.success(`Medlem har uppdaterats!`);
      void ctx.committee.invalidate();
      void ctx.member.invalidate();
    },
    onError: (error) => {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Något gick fel. Försök igen senare");
      }
    },
  });

  const { mutate: deleteMember } = api.member.deleteMemberAsAdmin.useMutation({
    onMutate: () => toast.loading("Raderar medlem..."),
    onSettled: (_c, _d, _e, toastId) => {
      toast.remove(toastId);
      void ctx.member.invalidate();
      void ctx.committee.invalidate();
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
        <Button className="h-8 w-8  p-0" variant="ghost">
          <span className="sr-only">Öppna meny</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <UpsertDialog
          form={
            <UpsertMemberForm
              key={id}
              defaultValues={values}
              onSubmit={(updatesValues) =>
                updateMember({
                  id: id,
                  ...updatesValues,
                })
              }
              type="update"
            />
          }
          title="Uppdatera aktiv"
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Redigera
            </DropdownMenuItem>
          }
        />
        <DeleteDialog
          onSubmit={() => deleteMember({ id })}
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
