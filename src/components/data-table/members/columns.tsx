import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import type { FC } from "react";
import toast from "react-hot-toast";
import DeleteDialog from "~/components/admin/delete-dialog";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { api, type RouterOutputs } from "~/utils/api";
import { useRouterHelpers } from "~/utils/router";

type CommitteeMember = RouterOutputs["member"]["getCommitteeMembersAsAdmin"][0];

export const columns: ColumnDef<CommitteeMember>[] = [
  {
    accessorKey: "name",
    header: "Namn",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "nickName",
    header: "Kommitténamn",
  },
  {
    accessorKey: "role",
    header: "Roll",
  },
  {
    accessorKey: "phone",
    header: "Telefon",
    cell: ({ row }) => row.original.phone || "Finns ej",
  },
  {
    id: "actions",
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    cell: ({ row }) => {
      const committeeMember = row.original;
      return (
        <CommitteeMemberTableActions
          key={committeeMember.id}
          id={committeeMember.id}
        />
      );
    },
  },
];
const CommitteeMemberTableActions: FC<{ id: string }> = ({ id }) => {
  const { replaceQuery } = useRouterHelpers();
  const ctx = api.useUtils();
  const { mutate: deleteMember } = api.member.deleteMemberAsAdmin.useMutation({
    onMutate: () => toast.loading("Raderar medlem..."),
    onSettled: (_c, _d, _e, toastId) => {
      toast.remove(toastId);
      void ctx.member.invalidate();
    },
    onError: () => toast.error("Okänt fel. Försök igen senare!"),
    onSuccess: () => toast.success("Medlem har raderats!"),
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
        <DropdownMenuItem onClick={() => void replaceQuery("editMember", id)}>
          Redigera
        </DropdownMenuItem>
        <DeleteDialog onSubmit={() => deleteMember({ id })}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Radera
          </DropdownMenuItem>
        </DeleteDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
