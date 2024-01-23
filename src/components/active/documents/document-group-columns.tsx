import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import { type RouterOutputs } from "~/utils/api";
import { DocumentGroupTableActions } from "./document-group-table-actions";

type DocumentGroupType = RouterOutputs["document"]["getAllGroupsAsAdmin"][0];

export const documentGroupColumns: ColumnDef<DocumentGroupType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Namn" />
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Antal dokument" />
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => row.original._count.Document,
  },
  {
    accessorKey: "extraText",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Extra text" />
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <div className="mr-0 flex justify-end">
        <DataTableViewOptions table={table} />
      </div>
    ),
    cell: ({ row }) => {
      const documentGroup = row.original;
      return (
        <div className="flex justify-center">
          <DocumentGroupTableActions
            key={documentGroup.id}
            {...documentGroup}
          />
        </div>
      );
    },
  },
];
