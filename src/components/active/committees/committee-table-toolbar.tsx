import type { Table } from "@tanstack/react-table";
import { useState } from "react";
import UpsertCommitteeForm from "~/components/active/committees/upsert-committee-form";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { Button } from "~/components/ui/button";
import { useCreateCommitteeAsAuthed } from "~/hooks/mutations/useMutateCommittee";

interface CommitteeTableToolbarProps<TData> {
  table: Table<TData>;
}

export const CommitteeTableToolbar = <TData,>({
  table: _table,
}: CommitteeTableToolbarProps<TData>): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: createNewCommittee, isLoading: creatingNewCommittee } =
    useCreateCommitteeAsAuthed({
      onSuccess: () => setIsOpen(false),
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
                onSubmit={(values) =>
                  createNewCommittee({ ...values, socialLinks: [] })
                }
              />
            }
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Skapa nytt organ"
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
