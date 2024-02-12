import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import { type RouterOutputs } from "~/utils/api";
import { HomeMediaTableActions } from "./home-media-table-actions";

export type HomeMediaType = RouterOutputs["homeMedia"]["getAllAsAuthorized"][0];

export const homeMediaColumns: ColumnDef<HomeMediaType>[] = [
  {
    id: "Ordning",
    accessorKey: "order",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: false,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "Titel",
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: false,
    enableHiding: false,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "Undertext",
    accessorKey: "description",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: false,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "Fotograf",
    accessorKey: "photographer",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: false,
    enableHiding: true,
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
    id: "Bild Url",
    accessorKey: "imageurl",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: false,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "Startdatum",
    accessorKey: "startDate",
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
    id: "Slutdatum",
    accessorKey: "endDate",
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
    header: ({ table }) => (
      <div className="mr-0 flex justify-end">
        <DataTableViewOptions table={table} />
      </div>
    ),
    cell: ({ row }) => {
      const homeMedia = row.original;
      return <HomeMediaTableActions key={homeMedia.id} {...homeMedia} />;
    },
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    filterFn: undefined,
  },
];
