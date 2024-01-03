import type { ColumnDef } from "@tanstack/react-table";
import { type RouterOutputs } from "~/utils/api";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableViewOptions } from "../data-table-view-options";
import { CommitteeTableActions } from "./committee-table-actions";

type CommitteeType = RouterOutputs["committee"]["getAllAsAdmin"][0];

export const columns: ColumnDef<CommitteeType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Namn" />
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slug" />
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "electionPeriod",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Har inval i LP" />
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: "inNumberRange",
  },
  {
    accessorKey: "_count.members",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Antal medlemmar" />
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: "inNumberRange",
    cell: ({ row }) => row.original.members.length,
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <div className="mr-0 flex justify-end">
        <DataTableViewOptions table={table} />
      </div>
    ),
    cell: ({ row }) => {
      const committee = row.original;
      return (
        <div className="flex justify-center">
          <CommitteeTableActions key={committee.id} {...committee} />
        </div>
      );
    },
  },
];
