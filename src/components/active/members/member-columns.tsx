import { AccountRoles } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import { Badge } from "~/components/ui/badge";
import { type RouterOutputs } from "~/utils/api";
import { MemberRolesActions } from "./member-roles-actions";
import { CommitteeMemberTableActions } from "./member-table-actions";

type CommitteeMemberType =
  RouterOutputs["member"]["getCommitteeMembersAsAdmin"][0];

export const memberColumns: ColumnDef<CommitteeMemberType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Namn" />
    ),
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "nickName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kommitténamn" />
    ),
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "committeeName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kommitté" />
    ),
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesStringSensitive",
    cell: ({ row }) => {
      return row.original.committeeName;
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Post" />
    ),
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "userRoles",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Behörigheter" />
    ),
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "arrIncludesSome",
    cell: ({ row }) => {
      const member = row.original;
      if (member.userId === null || member.userRoles === undefined) {
        return (
          <Badge className="text-center" variant="outline">
            Inget konto
          </Badge>
        );
      }
      return (
        <div className="flex gap-1">
          <MemberRolesActions
            currentRoles={member.userRoles}
            userId={member.userId}
          />
          {member.userRoles.length < 3 ? (
            member.userRoles.map((role) => (
              <Badge
                key={role}
                variant={
                  role === AccountRoles.ADMIN ? "destructive" : "outline"
                }
              >
                {role}
              </Badge>
            ))
          ) : (
            <Badge
              variant={
                member.userRoles.includes(AccountRoles.ADMIN)
                  ? "destructive"
                  : "outline"
              }
            >
              {member.userRoles.length} roller
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Telefonnummer" />
    ),
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
