import { AccountRoles } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "~/components/ui/badge";
import { type RouterOutputs } from "~/utils/api";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableViewOptions } from "../data-table-view-options";
import { MemberRolesActions } from "./member-roles-actions";
import { CommitteeMemberTableActions } from "./member-table-actions";

type CommitteeMemberType =
  RouterOutputs["member"]["getCommitteeMembersAsAdmin"][0];

export const columns: ColumnDef<CommitteeMemberType>[] = [
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
    cell: ({ row }) => {
      return row.original.committeeName;
    },
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
