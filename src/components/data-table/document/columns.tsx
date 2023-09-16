import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { RouterOutputs } from "~/utils/api";
import { useRouterHelpers } from "~/utils/router";

type Document = RouterOutputs["document"]["getAllAsAdmin"][0];

export const columns: ColumnDef<Document>[] = [
  {
    accessorKey: "title",
    header: "Titel",
  },
  {
    accessorKey: "group",
    header: "Grupp",
    cell: ({ row }) => row.original.group.name,
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "isPDF",
    header: "PDF?",
    cell: ({ row }) => (row.original.isPDF ? "Ja" : "Nej"),
  },
  {
    id: "actions",
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    cell: ({ row }) => {
      const document = row.original;
      const href = document.isPDF
        ? `https://docs.google.com/viewer?url=${document.url}`
        : document.url;

      return <DocumentActions key={document.id} href={href} id={document.id} />;
    },
  },
];
const DocumentActions: FC<{ href: string; id: string }> = ({ href, id }) => {
  const { replaceQuery } = useRouterHelpers();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0" variant="ghost">
          <span className="sr-only">Öppna meny</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Åtgärder</DropdownMenuLabel>
        <DropdownMenuItem>
          <Link href={href} rel="noopener noreferrer" target="_blank">
            Visa
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => void replaceQuery("editDoc", id)}>
          Redigera
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => void replaceQuery("delDoc", id)}>
          Radera
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
