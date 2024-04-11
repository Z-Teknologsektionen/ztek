import { useState, type FC } from "react";
import UpsertProgramBoardMemberForm from "~/components/active/program-board/upsert-program-board-form";
import DeleteTriggerButton from "~/components/buttons/delete-trigger-button";
import EditTriggerButton from "~/components/buttons/edit-trigger-button";
import ActionDialog from "~/components/dialogs/action-dialog";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import {
  useDeleteProgramBoardMemberAsAuthed,
  useUpdateProgramBoardMemberAsAuthed,
} from "~/hooks/mutations/useMutateProgramBoardMember";
import type { ProgramBoardType } from "./program-board-columns";

export const ProgramBoardMemberTableActions: FC<ProgramBoardType> = ({
  id,
  ...values
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: updateProgramBoardMember } =
    useUpdateProgramBoardMemberAsAuthed({
      onSuccess: () => {
        setIsOpen(false);
      },
    });

  const { mutate: deleteProgramBoardMember } =
    useDeleteProgramBoardMemberAsAuthed({});

  return (
    <div className="flex justify-end">
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
        trigger={<EditTriggerButton />}
      />
      <ActionDialog
        onSubmit={() => deleteProgramBoardMember({ id })}
        trigger={<DeleteTriggerButton />}
      />
    </div>
  );
};
