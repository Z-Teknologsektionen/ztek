import type { ColumnDef } from "@tanstack/react-table";
import BooleanCell from "~/components/columns/boolean-cell";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import { type RouterOutputs } from "~/utils/api";
import { ZenithMediaTableActions } from "./zenith-media-table-actions";

export type ZenithMediaType = RouterOutputs["zenithMedia"]["getAllAsAuthed"][0];

export const zenithMediaColumns: ColumnDef<ZenithMediaType>[] = [
  {
    id: "Titel",
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: false,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "Url",
    accessorKey: "url",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: false,
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
    filterFn: "inNumberRange",
  },
  {
    id: "PDF?",
    accessorKey: "isPDF",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => <BooleanCell value={row.original.isPDF} />,
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "equals",
  },
  {
    id: "actions",
    header: ({ table }) => <DataTableViewOptions table={table} />,
    cell: ({ row }) => {
      const zenithMedia = row.original;
      return <ZenithMediaTableActions key={zenithMedia.id} {...zenithMedia} />;
    },
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    filterFn: undefined,
  },
];
