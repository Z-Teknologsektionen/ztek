import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import type { FC } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { RouterOutputs } from "~/utils/api";
import { useRouterHelpers } from "~/utils/router";

type DocumentGroup = RouterOutputs["document"]["getAllGroupsAsAdmin"][0];

export const columns: ColumnDef<DocumentGroup>[] = [
  {
    accessorKey: "name",
    header: "Namn",
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
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    cell: ({ row }) => {
      const docuemntGroup = row.original;
      return (
        <DocumentGroupActions
          key={docuemntGroup.id}
          hasDocuments={docuemntGroup._count.Document !== 0}
          id={docuemntGroup.id}
        />
      );
    },
  },
];

const DocumentGroupActions: FC<{ hasDocuments: boolean; id: string }> = ({
  id,
  hasDocuments,
}) => {
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
        <DropdownMenuItem onClick={() => void replaceQuery("editGroup", id)}>
          Redigera
        </DropdownMenuItem>
        {!hasDocuments && (
          <DropdownMenuItem onClick={() => void replaceQuery("delGroup", id)}>
            Radera
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
