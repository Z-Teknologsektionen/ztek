import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import type { FC } from "react";
import toast from "react-hot-toast";
import DeleteDialog from "~/components/admin/delete-dialog";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { api, type RouterOutputs } from "~/utils/api";
import { useRouterHelpers } from "~/utils/router";

type Committee = RouterOutputs["committee"]["getAllAsAdmin"][0];

export const columns: ColumnDef<Committee>[] = [
  {
    accessorKey: "name",
    header: "Namn",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "electionPeriod",
    header: "Har inval i LP",
  },
  {
    accessorKey: "_count.members",
    header: "Antal medlemmar",
    cell: ({ row }) => row.original._count.members,
  },
  {
    id: "actions",
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    cell: ({ row }) => {
      const committee = row.original;
      return (
        <CommitteeTableActions
          key={committee.id}
          id={committee.id}
          slug={committee.slug}
        />
      );
    },
  },
];
const CommitteeTableActions: FC<{ id: string; slug: string }> = ({
  id,
  slug,
}) => {
  const ctx = api.useUtils();
  const { replaceQuery } = useRouterHelpers();

  const { mutate: deleteCommittee } = api.committee.deleteCommittee.useMutation(
    {
      onMutate: () => toast.loading("Raderar organ..."),
      onSettled: (_c, _d, _e, toastId) => {
        toast.remove(toastId);
        void ctx.member.invalidate();
        void ctx.committee.invalidate();
      },
      onSuccess: () => toast.success("Organ har raderats!"),
      onError: (error) => {
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Något gick fel. Försök igen senare");
        }
      },
    },
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0" variant="ghost">
          <span className="sr-only">Öppna meny</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => void replaceQuery("editCommittee", slug)}
        >
          Redigera
        </DropdownMenuItem>
        <DeleteDialog
          onSubmit={() => deleteCommittee({ id })}
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Radera
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
