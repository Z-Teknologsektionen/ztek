import type { CommitteeType } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import BooleanCell from "~/components/columns/boolean-cell";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import { TABLE_ICON_SIZE } from "~/constants/size-constants";
import { type RouterOutputs } from "~/utils/api";
import { getCommitteeTypeStringFromEnum } from "~/utils/get-committee-type-string-from-enum";
import { getSocialIconFromEnum } from "~/utils/get-social-from-enum";
import { CommitteeTableActions } from "./committee-table-actions";

export type Committee = RouterOutputs["committee"]["getAllAsAuthed"][0];

export const committeeColumns: ColumnDef<Committee>[] = [
  {
    id: "Namn",
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    filterFn: "includesString",
  },
  {
    id: "Slug",
    accessorKey: "slug",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    filterFn: "includesString",
  },
  {
    id: "Typ",
    accessorKey: "committeeType",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, _columnId, rawFilterValue) => {
      const filterValue = z
        .custom<CommitteeType>()
        .array()
        .safeParse(rawFilterValue);
      if (!filterValue.success) return false;

      return filterValue.data.includes(row.original.committeeType);
    },
    cell: ({ row }) =>
      getCommitteeTypeStringFromEnum(row.original.committeeType, false),
  },
  {
    id: "Har inval i LP",
    accessorKey: "electionPeriods",
    cell: ({ row }) => row.original.electionPeriods.join(", "),
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    filterFn: "inNumberRange",
  },
  {
    id: "Antal medlemmar",
    accessorKey: "membersCount",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    filterFn: "inNumberRange",
  },
  {
    id: "Har dokument",
    accessorKey: "documentId",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: false,
    enableHiding: true,
    cell: ({ row }) => <BooleanCell value={row.original.documentId !== null} />,
  },
  {
    id: "Visar patethimmel",
    accessorKey: "showOldCommittee",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: false,
    enableHiding: true,
    cell: ({ row }) => <BooleanCell value={row.original.showOldCommittee} />,
  },
  {
    id: "Sociala länkar",
    accessorKey: "socialLinks",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: false,
    enableHiding: true,
    cell: ({ row }) => {
      const socialLinks = row.original.socialLinks;

      if (socialLinks.length === 0) return <BooleanCell value={false} />;

      return (
        <div className="flex flex-row items-center justify-center gap-1">
          {socialLinks.map(({ iconVariant, url }) => {
            const Icon = getSocialIconFromEnum(iconVariant);
            return <Icon key={url} size={TABLE_ICON_SIZE} />;
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => <DataTableViewOptions table={table} />,
    cell: ({ row }) => {
      const committee = row.original;
      return <CommitteeTableActions key={committee.id} {...committee} />;
    },
  },
];
