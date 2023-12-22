import type { ColumnDef } from "@tanstack/react-table";
import { type RouterOutputs } from "~/utils/api";
import { DocumentGroupTableActions } from "./document-group-table-actions";

type DocumentGroup = RouterOutputs["document"]["getAllGroupsAsAdmin"][0];

export const columns: ColumnDef<DocumentGroup>[] = [
  {
    accessorKey: "name",
    header: "namn",
  },
  {
    accessorKey: "_count",
    header: "Antal dokument",
    cell: ({ row }) => row.original._count.Document,
  },
  {
    accessorKey: "extraText",
    header: "Extra text",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const documentGroup = row.original;
      return (
        <DocumentGroupTableActions key={documentGroup.id} {...documentGroup} />
      );
    },
  },
];
