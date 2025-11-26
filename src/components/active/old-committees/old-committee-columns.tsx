import type { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import BadgeCell from "~/components/columns/badge-cell";
import BooleanCell from "~/components/columns/boolean-cell";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import { objectId } from "~/schemas/helpers/common-zod-helpers";
import { validYear } from "~/schemas/helpers/time-zod-helpers";
import { type RouterOutputs } from "~/utils/api";
import { OldCommitteeTableActions } from "./old-committee-table-actions";

export type OldCommitteeType =
  RouterOutputs["oldCommittee"]["getManyByCommitteeIdAsActive"][0];

export const oldCommitteeColumns: ColumnDef<OldCommitteeType>[] = [
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
    id: "År",
    accessorKey: "year",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: (row, columnId, rawFilterValue) => {
      const filterValue = z.array(validYear).safeParse(rawFilterValue);
      if (!filterValue.success) return false;

      const year = row.original.year;

      return filterValue.data.includes(year);
    },
  },
  {
    id: "Organ",
    accessorKey: "belongsToCommittee.name",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: (row, columnId, rawFilterValue) => {
      const filterValue = z.array(objectId).safeParse(rawFilterValue);
      if (!filterValue.success) return false;

      const committeeId = row.original.belongsToCommittee.id;

      return filterValue.data.includes(committeeId);
    },
  },
  {
    id: "Antal medlemmar",
    accessorKey: "members",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => <BadgeCell>{row.original.members.length}</BadgeCell>,
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "Har bild",
    accessorKey: "image",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => <BooleanCell value={!!row.original.image} />,
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "Har logga",
    accessorKey: "logo",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => <BooleanCell value={!!row.original.logo} />,
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    header: ({ table }) => <DataTableViewOptions table={table} />,
    cell: ({ row }) => {
      const committee = row.original;
      return <OldCommitteeTableActions key={committee.id} {...committee} />;
    },
  },
];
