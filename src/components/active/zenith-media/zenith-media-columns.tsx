import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import { type RouterOutputs } from "~/utils/api";
import { ZenithMediaTableActions } from "./zenith-media-table-actions";

export type ZenithMediaType =
  RouterOutputs["zenithMedia"]["getAllAsAuthorized"][0];

export const zenithMediaColumns: ColumnDef<ZenithMediaType>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Titel" />
    ),
    enableSorting: true,
    enableHiding: false,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "url",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="URL" />
    ),
    enableSorting: false,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "year",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="År" />
    ),
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "inNumberRange",
  },
  {
    accessorKey: "isPDF",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PDF?" />
    ),
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
