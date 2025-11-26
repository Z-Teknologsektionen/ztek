import type { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import BadgeCell from "~/components/columns/badge-cell";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import { objectId } from "~/schemas/helpers/common-zod-helpers";
import { type RouterOutputs } from "~/utils/api";
import { userHasAdminAccess } from "~/utils/user-has-correct-role";
import { MemberRolesActions } from "./member-roles-actions";
import { CommitteeMemberTableActions } from "./member-table-actions";

export type CommitteeMemberType =
  RouterOutputs["member"]["getCommitteeMembersAsAuthed"][0];

export const memberColumns: ColumnDef<CommitteeMemberType>[] = [
  {
    id: "Namn",
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: (row, _columnId, rawFilterValue) => {
      const filterValue = z.string().toLowerCase().safeParse(rawFilterValue);
      if (!filterValue.success) return false;

      const filterString = filterValue.data;
      const name = row.original.name.toLowerCase();
      const nickName = row.original.nickName.toLowerCase();

      return name.includes(filterString) || nickName.includes(filterString);
    },
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
    filterFn: (row, _columnId, rawFilterValue) => {
      const filterValue = z.array(objectId).safeParse(rawFilterValue);
      if (!filterValue.success) return false;

      const committeeId = row.original.committeeId;

      return filterValue.data.includes(committeeId);
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
    enableSorting: false,
    enableHiding: true,
    enableResizing: true,
    filterFn: "arrIncludesSome",
    cell: ({ row }) => {
      const member = row.original;

      if (member.userId === null || member.userRoles === undefined)
        return <BadgeCell>Inget konto</BadgeCell>;

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
                variant={userHasAdminAccess([role]) ? "destructive" : "outline"}
              >
                {role}
              </BadgeCell>
            ))
          ) : (
            <BadgeCell
              variant={
                userHasAdminAccess(member.userRoles) ? "destructive" : "outline"
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
    header: ({ table }) => <DataTableViewOptions table={table} />,
    cell: ({ row }) => {
      const committeeMember = row.original;
      return (
        <CommitteeMemberTableActions
          key={committeeMember.id}
          {...committeeMember}
        />
      );
    },
  },
];
