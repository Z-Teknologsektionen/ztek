import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import type { FC } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useRouterHelpers } from "~/utils/router";

// type programBoard = RouterOutputs["programBoard"]["getAllAsAdmin"][0];

export const columns: ColumnDef<zaloonenBooking>[] = [
  {
    accessorKey: "name",
    header: "Namn",
  },
  {
    accessorKey: "role",
    header: "Roll",
  },
  {
    accessorKey: "phone",
    header: "Telefonnummer",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "order",
    header: "Ordning (lågt till vänster)",
  },
  {
    accessorKey: "updatedAt",
    header: "Senast uppdaterad",
    cell: ({ row }) => {
      const date = new Date(row.original.updatedAt);
      return date.toLocaleDateString("sv-SE", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    },
  },
  {
    id: "actions",
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    cell: ({ row }) => {
      const programBoardMember = row.original;
      return (
        <ProgramBoardTableActions
          key={programBoardMember.id}
          id={programBoardMember.id}
        />
      );
    },
  },
];
const ProgramBoardTableActions: FC<{ id: string }> = ({ id }) => {
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
        <DropdownMenuItem
          onClick={() => void replaceQuery("editProgramBoardMember", id)}
        >
          Redigera
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => void replaceQuery("delProgramBoardMember", id)}
        >
          Radera
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
