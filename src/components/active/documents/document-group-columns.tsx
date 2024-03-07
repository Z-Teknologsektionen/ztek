import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import { type RouterOutputs } from "~/utils/api";
import { DocumentGroupTableActions } from "./document-group-table-actions";

type DocumentGroupType = RouterOutputs["document"]["getAllGroupsAsAuthed"][0];

export const documentGroupColumns: ColumnDef<DocumentGroupType>[] = [
  {
    id: "Namn",
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    filterFn: "includesString",
  },
  {
    id: "Antal dokument",
    accessorKey: "documentCount",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    filterFn: "inNumberRange",
  },
  {
    id: "Extra text",
    accessorKey: "extraText",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    filterFn: "includesString",
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
        <div className="flex justify-end">
          <DocumentGroupTableActions
            key={documentGroup.id}
            {...documentGroup}
          />
        </div>
      );
    },
  },
];
