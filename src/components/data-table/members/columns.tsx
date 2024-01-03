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

type UserType = RouterOutputs["user"]["getAllUserRolesAsAdmin"][0];

type CommitteeMemberUserType = CommitteeMemberType & {
  roles?: UserType["roles"];
  userId?: UserType["id"];
};

export const columns: ColumnDef<CommitteeMemberUserType>[] = [
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
    accessorKey: "committee.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kommitté" />
    ),
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: (row, id, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => {
      return row.original.committee.name;
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
    accessorKey: "roles",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Behörigheter" />
    ),
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "arrIncludesSome",
    cell: ({ row }) => {
      if (row.original.userId === undefined) {
        return (
          <Badge className="text-center" variant="outline">
            Inget konto
          </Badge>
        );
      }
      return (
        <div className="flex gap-1">
          <MemberRolesActions
            currentRoles={row.original.roles}
            userId={row.original.userId}
          />
          {(row.original.roles?.length ?? 0) < 3 ? (
            row.original.roles?.map((role) => (
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
                row.original.roles?.includes(AccountRoles.ADMIN)
                  ? "destructive"
                  : "outline"
              }
            >
              {row.original.roles?.length} roller
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
