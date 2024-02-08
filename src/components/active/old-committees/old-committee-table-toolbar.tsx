"use client";

import type { Table } from "@tanstack/react-table";
import { useState } from "react";
import toast from "react-hot-toast";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import UpsertOldCommitteeForm from "./upsert-old-committee-form";

interface OldCommitteeTableToolbarProps<TData> {
  table: Table<TData>;
}

export const OldCommitteeTableToolbar = <TData,>({
  table: _table,
}: OldCommitteeTableToolbarProps<TData>): JSX.Element => {
  const ctx = api.useUtils();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: createNewOldCommittee, isLoading: creatingNewOldCommittee } =
    api.oldCommittee.createOldCommittee.useMutation({
      onMutate: () => toast.loading("Skapar ny patetgrupp..."),
      onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
      onSuccess: ({ name: name }) => {
        toast.success(`${name} har skapats!`);
        void ctx.oldCommittee.invalidate();
        setIsOpen(false);
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
        <div className="flex flex-1 items-center space-x-2"></div>
        <div className="flex justify-end">
          <UpsertDialog
            form={
              <UpsertOldCommitteeForm
                key={"new"}
                defaultValues={{}}
                formType="create"
                onSubmit={(values) => createNewOldCommittee(values)}
              />
            }
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Nytt patetår"
            trigger={
              <Button
                className="ml-2 h-8 px-2 lg:px-3"
                disabled={creatingNewOldCommittee}
                size="lg"
                type="button"
                variant="outline"
              >
                Lägg till
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};
