import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import { type RouterOutputs } from "~/utils/api";
import { ZenithMediaTableActions } from "./zenith-media-table-actions";

export type ZenithMediaType = RouterOutputs["zenithMedia"]["getAllAsAuthed"][0];

export type ZenithMediaTypeWithFile = ZenithMediaType & {
  fileInput: File[];
};

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
