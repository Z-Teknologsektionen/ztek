import type { ColumnDef } from "@tanstack/react-table";
import BooleanCell from "~/components/columns/boolean-cell";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import { type RouterOutputs } from "~/utils/api";
import { DocumentTableActions } from "./document-table-actions";

export type DocumentType = RouterOutputs["document"]["getAllAsAuthed"][0];

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
    cell: ({ row }) => <BooleanCell value={row.original.isPDF} />,
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <div className="flex justify-end">
        <DataTableViewOptions table={table} />
      </div>
    ),
    cell: ({ row }) => {
      const document = row.original;
      return <DocumentTableActions key={document.id} {...document} />;
    },
  },
];
