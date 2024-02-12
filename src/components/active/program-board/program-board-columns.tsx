import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import type { RouterOutputs } from "~/utils/api";
import { ProgramBoardMemberTableActions } from "./program-board-table-actions";

export type ProgramBoardType =
  RouterOutputs["programBoard"]["getAllAsAuthed"][0];

export const programBoardColumns: ColumnDef<ProgramBoardType>[] = [
  {
    id: "Namn",
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "Roll",
    accessorKey: "role",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "Telefonnummer",
    accessorKey: "phone",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: false,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "Epost",
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "Ordning",
    accessorKey: "order",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Ordning (lågt till vänster)"
      />
    ),
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "Senast uppdaterad",
    accessorKey: "updatedAt",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
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
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    header: ({ table }) => (
      <div className="mr-0 flex justify-end">
        <DataTableViewOptions table={table} />
      </div>
    ),
    cell: ({ row }) => {
      const programBoardMember = row.original;

      return (
        <div className="flex justify-center">
          <ProgramBoardMemberTableActions
            key={programBoardMember.id}
            {...programBoardMember}
          />
        </div>
      );
    },
  },
];
