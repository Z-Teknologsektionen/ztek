import type { ColumnDef } from "@tanstack/react-table";
import { type RouterOutputs } from "~/utils/api";
import { DocumentTableActions } from "./document-table-actions";

export type ZenithDocument =
  RouterOutputs["zenithDocuments"]["getAllAsAdmin"][0];

export const columns: ColumnDef<ZenithDocument>[] = [
  {
    accessorKey: "title",
    header: "Titel",
  },
  {
    accessorKey: "url",
    header: "Url",
  },
  {
    accessorKey: "year",
    header: "År",
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
