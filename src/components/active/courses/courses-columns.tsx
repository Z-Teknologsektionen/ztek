import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { type RouterOutputs } from "~/utils/api";

export type Course = RouterOutputs["course"]["getAllCoursesAsAuthed"][0];

export const coursesColumns: ColumnDef<Course>[] = [
  {
    id: "Kod",
    accessorKey: "code",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    filterFn: "includesString",
  },
  {
    id: "Namn",
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    filterFn: "includesString",
  },
  {
    id: "Antal HP",
    accessorKey: "credits",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "Årskurs",
    accessorKey: "year",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    filterFn: "inNumberRange",
  },
  {
    id: "Examenstyp",
    accessorKey: "examinationType",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    filterFn: "includesString",
  },
  {
    id: "Dokument",
    accessorKey: "examinationType",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      row.original.documents.length;
    },
    enableSorting: true,
    enableHiding: true,
    filterFn: "includesString",
  },
  {
    id: "Examinator",
    accessorKey: "examiner",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    filterFn: "includesString",
  },
  {
    id: "Ersatt av",
    accessorKey: "successor",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      row.original.successor?.code || "";
    },
    enableSorting: true,
    enableHiding: true,
    filterFn: "includesString",
  },
  {
    id: "Ersatt kurs",
    accessorKey: "predecessor",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      row.original.predecessor?.code || "";
    },
    enableSorting: true,
    enableHiding: true,
    filterFn: "includesString",
  },
  // {
  //   id: "actions",
  //   enableSorting: false,
  //   enableHiding: false,
  //   header: ({ table }) => <DataTableViewOptions table={table} />,
  //   cell: ({ row }) => {
  //     const committee = row.original;
  //     return <CommitteeTableActions key={committee.id} {...committee} />;
  //   },
  // },
];
