"use client";

import type { Table } from "@tanstack/react-table";
import toast from "react-hot-toast";
import UpsertProgramBoardMemberForm from "~/components/active/program-board/upsert-program-board-form";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { api } from "~/utils/api";
import { Button } from "../../ui/button";

interface ProgramBoardTableToolbarProps<TData> {
  table: Table<TData>;
}

export const ProgramBoardTableToolbar = <TData,>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
  table,
}: ProgramBoardTableToolbarProps<TData>): JSX.Element => {
  const ctx = api.useUtils();

  const {
    mutate: createNewProgramBoardMember,
    isLoading: creatingNewProgramBoardMember,
  } = api.programBoard.createOne.useMutation({
    onMutate: () => toast.loading("Skapar nytt organ..."),
    onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
    onSuccess: () => {
      toast.success(`En ny programmedlem har skapats!`);
      void ctx.programBoard.invalidate();
    },
    onError: (error) => {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Något gick fel. Försök igen senare");
      }
    },
  });
  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          {/* Add filters here */}
        </div>
        <div className="flex justify-end">
          <UpsertDialog
            form={
              <UpsertProgramBoardMemberForm
                key={"new"}
                defaultValues={{}}
                formType="create"
                onSubmit={(values) => createNewProgramBoardMember(values)}
              />
            }
            title="Skapa ny programmedlem"
            trigger={
              <Button
                className="ml-2 h-8 px-2 lg:px-3"
                disabled={creatingNewProgramBoardMember}
                size="lg"
                type="button"
                variant="outline"
              >
                Skapa ny medlem
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};
