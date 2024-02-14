import { MoreHorizontal } from "lucide-react";
import { useState, type FC } from "react";
import { UpsertMemberForm } from "~/components/active/members/upsert-member-form";
import DeleteDialog from "~/components/dialogs/delete-dialog";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  useDeleteMemberAsAuthed,
  useUpdateMemberAsAuthed,
} from "~/hooks/mutations/useMutateMember";

export const CommitteeMemberTableActions: FC<{
  committeeId: string;
  email: string;
  id: string;
  image: string;
  name: string;
  nickName: string;
  order: number;
  phone: string;
  role: string;
}> = ({ id, ...values }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: updateMember } = useUpdateMemberAsAuthed({
    onSuccess: () => setIsOpen(false),
  });

  const { mutate: deleteMember } = useDeleteMemberAsAuthed({});

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8  p-0" variant="ghost">
          <span className="sr-only">Öppna meny</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <UpsertDialog
          form={
            <UpsertMemberForm
              key={id}
              defaultValues={values}
              formType="update"
              onSubmit={(updatesValues) =>
                updateMember({
                  id: id,
                  ...updatesValues,
                })
              }
            />
          }
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title="Uppdatera aktiv"
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Redigera
            </DropdownMenuItem>
          }
        />
        <DeleteDialog
          onSubmit={() => deleteMember({ id })}
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Radera
            </DropdownMenuItem>
          }
        ></DeleteDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
