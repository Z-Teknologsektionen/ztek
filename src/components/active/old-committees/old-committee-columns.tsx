import type { ColumnDef } from "@tanstack/react-table";
import { MdCancel, MdCheck } from "react-icons/md";
import { z } from "zod";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import { Badge } from "~/components/ui/badge";
import { objectId, validYear } from "~/server/api/helpers/custom-zod-helpers";
import { type RouterOutputs } from "~/utils/api";
import { OldCommitteeTableActions } from "./old-committee-table-actions";

export type OldCommitteeType =
  RouterOutputs["oldCommittee"]["getManyByCommitteeIdAsActive"][0];

const ICON_SIZE = 15;

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
    id: "Har bild",
    accessorKey: "image",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => (
      <div className="ml-2">
        {row.original.image ? (
          <MdCheck color="green" size={ICON_SIZE} />
        ) : (
          <MdCancel color="red" size={ICON_SIZE} />
        )}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "Har logga",
    accessorKey: "logo",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => (
      <div className="ml-2">
        {row.original.logo ? (
          <MdCheck color="green" size={ICON_SIZE} />
        ) : (
          <MdCancel color="red" size={ICON_SIZE} />
        )}
      </div>
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
