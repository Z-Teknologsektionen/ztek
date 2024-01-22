import type { ColumnDef } from "@tanstack/react-table";
import { type RouterOutputs } from "~/utils/api";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableViewOptions } from "../data-table-view-options";
import { DocumentTableActions } from "./zenith-document-table-actions";

export type ZenithDocumentType =
  RouterOutputs["zenithDocuments"]["getAllAsAuthorized"][0];

export const columns: ColumnDef<ZenithDocumentType>[] = [
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
      const document = row.original;
      return <DocumentTableActions key={document.id} {...document} />;
    },
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    filterFn: undefined,
  },
];
