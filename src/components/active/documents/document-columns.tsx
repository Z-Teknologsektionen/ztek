import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import { type RouterOutputs } from "~/utils/api";
import { DocumentTableActions } from "./document-table-actions";

export type DocumentType = RouterOutputs["document"]["getAllAsAdmin"][0];

export const documentColumns: ColumnDef<DocumentType>[] = [
  {
    id: "Titel",
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    filterFn: "includesString",
  },
  {
    id: "Grupp",
    accessorKey: "groupName",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    filterFn: "includesString",
  },
  {
    id: "Url",
    accessorKey: "url",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    filterFn: "includesString",
  },
  {
    id: "PDF?",
    accessorKey: "isPDF",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
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
