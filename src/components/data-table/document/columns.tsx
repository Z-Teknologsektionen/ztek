import type { ColumnDef } from "@tanstack/react-table";
import { type RouterOutputs } from "~/utils/api";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableViewOptions } from "../data-table-view-options";
import { DocumentTableActions } from "./document-table-actions";

type Document = RouterOutputs["document"]["getAllAsAdmin"][0];

export const columns: ColumnDef<Document>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Titel" />
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "group",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Grupp" />
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: "includesString",
    cell: ({ row }) => row.original.group.name,
  },
  {
    accessorKey: "url",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Url" />
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "isPDF",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PDF?" />
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return value && row.getValue(id);
    },
    cell: ({ row }) => (row.original.isPDF ? "Ja" : "Nej"),
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <div className="flex justify-center">
        <DataTableViewOptions table={table} />
      </div>
    ),
    cell: ({ row }) => {
      const document = row.original;
      return (
        <div className="flex justify-center">
          <DocumentTableActions key={document.id} {...document} />
        </div>
      );
    },
  },
];
