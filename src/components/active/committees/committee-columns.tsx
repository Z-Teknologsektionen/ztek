import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import { TABLE_ICON_SIZE } from "~/constants/size-constants";
import { type RouterOutputs } from "~/utils/api";
import { getCommitteeTypeStringFromEnum } from "~/utils/get-committee-type-string-from-enum";
import { getSocialIconFromEnum } from "~/utils/get-social-from-enum";
import { CommitteeTableActions } from "./committee-table-actions";

export type CommitteeType = RouterOutputs["committee"]["getAllAsAuthed"][0];

export const committeeColumns: ColumnDef<CommitteeType>[] = [
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
    filterFn: "includesString",
    cell: ({ row }) =>
      getCommitteeTypeStringFromEnum(row.original.committeeType, false),
  },
  {
    id: "Har inval i LP",
    accessorKey: "electionPeriod",
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
    id: "Sociala länkar",
    accessorKey: "socialLinks",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: false,
    enableHiding: true,
    cell: ({ row }) => {
      const socialLinks = row.original.socialLinks;
      const hasSocialLinks = socialLinks.length > 0;
      return (
        <div className="flex flex-row gap-1">
          {hasSocialLinks ? (
            <>
              {socialLinks.map(({ iconVariant, url }) => {
                const Icon = getSocialIconFromEnum(iconVariant);
                return <Icon key={url} size={TABLE_ICON_SIZE} />;
              })}
            </>
          ) : (
            <p>Inga sociala länkar</p>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <div className="mr-0 flex justify-end">
        <DataTableViewOptions table={table} />
      </div>
    ),
    cell: ({ row }) => {
      const committee = row.original;
      return (
        <div className="flex justify-center">
          <CommitteeTableActions key={committee.id} {...committee} />
        </div>
      );
    },
  },
];
