"use client";

import type { Table } from "@tanstack/react-table";
import toast from "react-hot-toast";
import UpsertCommitteeForm from "~/components/active/committees/upsert-committee-form";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";

interface CommitteeTableToolbarProps<TData> {
  table: Table<TData>;
}

export const CommitteeTableToolbar = <TData,>({
  table: _table,
}: CommitteeTableToolbarProps<TData>): JSX.Element => {
  const ctx = api.useUtils();

  const { mutate: createNewCommittee, isLoading: creatingNewCommittee } =
    api.committee.createCommittee.useMutation({
      onMutate: () => toast.loading("Skapar nytt organ..."),
      onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
      onSuccess: ({ name }) => {
        toast.success(`Ett nytt organ med namnet: ${name} har skapats!`);
        void ctx.committee.invalidate();
        void ctx.member.invalidate();
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
              <UpsertCommitteeForm
                key={"new"}
                formType="create"
                onSubmit={(values) => createNewCommittee(values)}
              />
            }
            title="Skapa ny medlem"
            trigger={
              <Button
                className="ml-2 h-8 px-2 lg:px-3"
                disabled={creatingNewCommittee}
                size="lg"
                type="button"
                variant="outline"
              >
                Skapa nytt organ
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};
