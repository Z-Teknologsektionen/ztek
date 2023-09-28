import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import type { FC } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { RouterOutputs } from "~/utils/api";
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
        <DropdownMenuItem onClick={() => void replaceQuery("delMember", id)}>
          Radera
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
