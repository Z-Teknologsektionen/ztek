import type { ColumnDef } from "@tanstack/react-table";
import { type RouterOutputs } from "~/utils/api";
import { DocumentTableActions } from "./document-table-actions";

type Document = RouterOutputs["document"]["getAllAsAdmin"][0];

export const columns: ColumnDef<Document>[] = [
  {
    accessorKey: "title",
    header: "Titel",
  },
  {
    accessorKey: "group",
    header: "Group",
    cell: ({ row }) => row.original.group.name,
  },
  {
    accessorKey: "url",
    header: "Url",
  },
  {
    accessorKey: "isPDF",
    header: "PDF?",
    cell: ({ row }) => (row.original.isPDF ? "Ja" : "Nej"),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const document = row.original;
      return <DocumentTableActions key={document.id} {...document} />;
    },
  },
];
