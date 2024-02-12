import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import { type RouterOutputs } from "~/utils/api";
import { MeetingElectionTableActions } from "./meeting-table-actions";

export type MeetingElectionType = RouterOutputs["meetingElection"]["getAll"][0];

export const meetingElectionColumns: ColumnDef<MeetingElectionType>[] = [
  {
    id: "Titel",
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    header: ({ table }) => <DataTableViewOptions table={table} />,
    cell: ({ row }) => {
      const committee = row.original;
      return <MeetingElectionTableActions key={committee.id} {...committee} />;
    },
  },
];
