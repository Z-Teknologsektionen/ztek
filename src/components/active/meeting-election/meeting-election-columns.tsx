import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { type RouterOutputs } from "~/utils/api";

type MeetingElectionType =
  RouterOutputs["member"]["getCommitteeMembersAsAdmin"][0];

export const meetingElectionColumns: ColumnDef<MeetingElectionType>[] = [
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
