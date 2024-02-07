import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import { Badge } from "~/components/ui/badge";
import { type RouterOutputs } from "~/utils/api";
import { OldCommitteeTableActions } from "./old-committee-table-actions";

export type OldCommitteeType =
  RouterOutputs["oldCommittee"]["getManyByCommitteeId"][0];

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
    filterFn: "includesString",
  },
  {
    id: "Antal medlemmar",
    accessorKey: "members",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => (
      <Badge className="text-center" variant="outline">
        {row.original.members.length}
      </Badge>
    ),
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
