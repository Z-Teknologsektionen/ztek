import { AccountRoles } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "~/components/ui/badge";
import { type RouterOutputs } from "~/utils/api";
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
    header: "Namn",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "nickName",
    header: "Kommitténamn",
  },
  {
    accessorKey: "role",
    header: "Roll",
  },
  {
    accessorKey: "roles",
    header: "Behörigheter",
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
    header: "Telefon",
    cell: ({ row }) => row.original.phone || "Finns ej",
  },
  {
    id: "actions",
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
