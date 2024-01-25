import type { ColumnDef } from "@tanstack/react-table";
import { type RouterOutputs } from "~/utils/api";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableViewOptions } from "../data-table-view-options";
import { ZenithMediaTableActions } from "./zenith-media-table-actions";

export type ZenithMediaType =
  RouterOutputs["zenithMedia"]["getAllAsAuthorized"][0];

export const columns: ColumnDef<ZenithMediaType>[] = [
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
    cell: ({ row }) => (row.original.isPDF ? "Ja" : "Nej"),
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "equals",
  },
  {
    id: "actions",
    header: ({ table }) => (
      <div className="mr-0 flex justify-end">
        <DataTableViewOptions table={table} />
      </div>
    ),
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
