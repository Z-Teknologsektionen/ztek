import { MoreHorizontal } from "lucide-react";
import { useState, type FC } from "react";
import UpsertProgramBoardMemberForm from "~/components/active/program-board/upsert-program-board-form";
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
  useDeleteProgramBoardMember,
  useUpdateProgramBoardMember,
} from "~/hooks/mutations/useMutateProgramBoardMember";

export const ProgramBoardMemberTableActions: FC<{
  email: string;
  id: string;
  image: string | undefined;
  name: string;
  order: number;
  phone: string | undefined;
  role: string;
  url: string;
}> = ({ id, ...values }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: updateProgramBoardMember } = useUpdateProgramBoardMember({
    onSuccess: () => {
      setIsOpen(false);
    },
  });

  const { mutate: deleteProgramBoardMember } = useDeleteProgramBoardMember({});

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0" variant="ghost">
          <span className="sr-only">Öppna meny</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <UpsertDialog
          form={
            <UpsertProgramBoardMemberForm
              key={id}
              defaultValues={values}
              formType="update"
              onSubmit={(updatesValues) =>
                updateProgramBoardMember({
                  id: id,
                  ...updatesValues,
                })
              }
            />
          }
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title="Uppdatera programmedlem"
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Redigera
            </DropdownMenuItem>
          }
        />
        <DeleteDialog
          onSubmit={() => deleteProgramBoardMember({ id })}
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
