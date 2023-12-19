import type { ColumnDef } from "@tanstack/react-table";
import { type RouterOutputs } from "~/utils/api";
import { CommitteeMemberTableActions } from "./member-table-actions";

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
    cell: ({ row }) => {
      const committeeMember = row.original;
      return (
        <CommitteeMemberTableActions
          key={committeeMember.id}
          {...committeeMember}
        />
      );
    },
  },
];
