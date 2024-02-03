import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { type RouterOutputs } from "~/utils/api";

type OldCommitteeMemberType =
  RouterOutputs["oldCommittee"]["getManyByCommitteeId"][0];

export const oldCommitteeColumns: ColumnDef<OldCommitteeMemberType>[] = [
  {
    id: "Namn",
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
];
