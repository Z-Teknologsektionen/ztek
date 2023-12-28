import { AccountRoles } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "~/components/ui/badge";
import { type RouterOutputs } from "~/utils/api";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableViewOptions } from "../data-table-view-options";
import { MemberRolesActions } from "./member-roles-actions";
import { CommitteeMemberTableActions } from "./member-table-actions";

type CommitteeMember = RouterOutputs["member"]["getCommitteeMembersAsAdmin"][0];

type User = RouterOutputs["user"]["getAllUserRolesAsAdmin"][0];
type CommitteeMemberUser = CommitteeMember & {
  roles: User["roles"] | undefined;
  userId: User["id"] | undefined;
};

export const columns: ColumnDef<CommitteeMemberUser>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Namn" />
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "nickName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kommitténamn" />
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Post" />
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "roles",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Behörigheter" />
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => {
      if (row.original.userId === undefined) {
        return <Badge variant="outline">Inget kopplat konto</Badge>;
      }
      return (
        <div className="space-x-1 space-y-1">
          <MemberRolesActions
            currentRoles={row.original.roles}
            userId={row.original.userId}
          />
          {row.original.roles?.map((role) => (
            <Badge
              key={role}
              variant={role === AccountRoles.ADMIN ? "destructive" : "outline"}
            >
              {role}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return value.includes(row.getValue(id));
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Telefon" />
    ),
    cell: ({ row }) => row.original.phone || "Finns ej",
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <div className="flex justify-end">
        <DataTableViewOptions table={table} />
      </div>
    ),
    cell: ({ row }) => {
      const committeeMember = row.original;
      return (
        <div className="flex justify-end pr-4">
          <CommitteeMemberTableActions
            key={committeeMember.id}
            {...committeeMember}
          />
        </div>
      );
    },
  },
];
