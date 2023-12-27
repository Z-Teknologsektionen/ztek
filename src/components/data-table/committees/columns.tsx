import type { ColumnDef } from "@tanstack/react-table";
import { type RouterOutputs } from "~/utils/api";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableViewOptions } from "../data-table-view-options";
import { CommitteeTableActions } from "./committee-table-actions";

type Committee = RouterOutputs["committee"]["getAllAsAdmin"][0];

export const columns: ColumnDef<Committee>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Namn" />
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slug" />
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "electionPeriod",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Har inval i LP" />
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "_count.members",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Antal medlemmar" />
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => row.original.members.length,
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <div className="flex justify-end">
        <DataTableViewOptions table={table} />
      </div>
    ),
    cell: ({ row }) => {
      const committee = row.original;
      return (
        <div className="flex justify-end pr-4">
          <CommitteeTableActions key={committee.id} {...committee} />
        </div>
      );
    },
  },
];
