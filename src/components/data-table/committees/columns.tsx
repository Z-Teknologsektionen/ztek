import type { ColumnDef } from "@tanstack/react-table";
import { type RouterOutputs } from "~/utils/api";
import { CommitteeTableActions } from "./committee-table-actions";

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
    cell: ({ row }) => row.original.members.length,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const committee = row.original;
      return <CommitteeTableActions key={committee.id} {...committee} />;
    },
  },
];
