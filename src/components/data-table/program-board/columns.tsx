import type { ColumnDef } from "@tanstack/react-table";

import type { RouterOutputs } from "~/utils/api";
import { ProgramBoardMemberTableActions } from "./program-board-table-actions";

type programBoard = RouterOutputs["programBoard"]["getAllAsAdmin"][0];

export const columns: ColumnDef<programBoard>[] = [
  {
    accessorKey: "name",
    header: "Namn",
  },
  {
    accessorKey: "role",
    header: "Roll",
  },
  {
    accessorKey: "phone",
    header: "Telefonnummer",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "order",
    header: "Ordning (lågt till vänster)",
  },
  {
    accessorKey: "updatedAt",
    header: "Senast uppdaterad",
    cell: ({ row }) => {
      const date = new Date(row.original.updatedAt);
      return date.toLocaleDateString("sv-SE", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    },
  },
  {
    id: "actions",
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    cell: ({ row }) => {
      const programBoardMember = {
        ...row.original,
        phone: row.original.phone || undefined,
        image: row.original.image || undefined,
      };

      return (
        <ProgramBoardMemberTableActions
          key={programBoardMember.id}
          {...programBoardMember}
        />
      );
    },
  },
];
