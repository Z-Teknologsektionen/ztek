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
import type { RouterOutputs } from "~/utils/api";
import { useRouterHelpers } from "~/utils/router";

type Committee = RouterOutputs["committee"]["getAllAsAdmin"][0];

export const columns: ColumnDef<Committee>[] = [
  {
    accessorKey: "name",
    header: "Namn",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "electionPeriod",
    header: "Har inval i LP",
  },
  {
    accessorKey: "_count.members",
    header: "Antal medlemmar",
    cell: ({ row }) => row.original._count.members,
  },
  {
    id: "actions",
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    cell: ({ row }) => {
      const committee = row.original;
      return (
        <CommitteeTableActions
          key={committee.id}
          id={committee.id}
          slug={committee.slug}
        />
      );
    },
  },
];
const CommitteeTableActions: FC<{ id: string; slug: string }> = ({
  id,
  slug,
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
        <DropdownMenuItem
          onClick={() => void replaceQuery("editCommittee", slug)}
        >
          Redigera
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => void replaceQuery("delCommittee", id)}>
          Radera
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
