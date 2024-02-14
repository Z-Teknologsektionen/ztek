import type { Table } from "@tanstack/react-table";
import { useState } from "react";
import { UpsertDocumentGroupForm } from "~/components/active/documents/upsert-document-group-form";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { Button } from "~/components/ui/button";
import { useCreateDocumentGroup } from "~/hooks/mutations/useMutateDocumentGroup";

interface DocumentGroupTableToolbarProps<TData> {
  table: Table<TData>;
}

export const DocumentGroupTableToolbar = <TData,>({
  table: _table,
}: DocumentGroupTableToolbarProps<TData>): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    mutate: createNewDocumentGroup,
    isLoading: creatingNewDocumentGroup,
  } = useCreateDocumentGroup({ onSuccess: () => setIsOpen(false) });

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          {/* Add filters here */}
        </div>
        <div className="flex justify-end">
          <UpsertDialog
            form={
              <UpsertDocumentGroupForm
                key={"new"}
                formType="create"
                onSubmit={(values) => createNewDocumentGroup(values)}
              />
            }
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Ny dokumentgrupp"
            trigger={
              <Button
                className="ml-2 h-8 px-2 lg:px-3"
                disabled={creatingNewDocumentGroup}
                size="lg"
                type="button"
                variant="outline"
              >
                Ny dokumentgrupp
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};
