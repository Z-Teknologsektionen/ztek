import { AccountRoles } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import BadgeCell from "~/components/columns/badge-cell";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import { type RouterOutputs } from "~/utils/api";
import { MemberRolesActions } from "./member-roles-actions";
import { CommitteeMemberTableActions } from "./member-table-actions";

type CommitteeMemberType =
  RouterOutputs["member"]["getCommitteeMembersAsAuthed"][0];

export const memberColumns: ColumnDef<CommitteeMemberType>[] = [
  {
    id: "Namn",
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "Email",
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "Kommitténamn",
    accessorKey: "nickName",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "Kommitté",
    accessorKey: "committeeName",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesStringSensitive",
  },
  {
    id: "Post",
    accessorKey: "role",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "Behörigheter",
    accessorKey: "userRoles",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "arrIncludesSome",
    cell: ({ row }) => {
      const member = row.original;
      if (member.userId === null || member.userRoles === undefined) {
        return <BadgeCell>Inget konto</BadgeCell>;
      }

      return (
        <div className="flex gap-1">
          <MemberRolesActions
            currentRoles={member.userRoles}
            userId={member.userId}
          />
          {member.userRoles.length < 3 ? (
            member.userRoles.map((role) => (
              <BadgeCell
                key={role}
                variant={
                  role === AccountRoles.ADMIN ? "destructive" : "outline"
                }
              >
                {role}
              </BadgeCell>
            ))
          ) : (
            <BadgeCell
              variant={
                member.userRoles.includes(AccountRoles.ADMIN)
                  ? "destructive"
                  : "outline"
              }
            >
              {member.userRoles.length} roller
            </BadgeCell>
          )}
        </div>
      );
    },
  },
  {
    id: "Telefonnummer",
    accessorKey: "phone",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: false,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    header: ({ table }) => (
      <div className="mr-0 flex justify-end">
        <DataTableViewOptions table={table} />
      </div>
    ),
    cell: ({ row }) => {
      const committeeMember = row.original;
      return (
        <div className="flex justify-center">
          <CommitteeMemberTableActions
            key={committeeMember.id}
            {...committeeMember}
          />
        </div>
      );
    },
  },
];
