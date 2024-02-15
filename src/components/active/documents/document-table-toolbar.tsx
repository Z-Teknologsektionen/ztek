import type { Table } from "@tanstack/react-table";
import { useState } from "react";
import { UpsertDocumentForm } from "~/components/active/documents/upsert-document-form";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useCreateDocumentAsAuthed } from "~/hooks/mutations/useMutateDocument";

interface DocumentTableToolbarProps<TData> {
  table: Table<TData>;
}

export const DocumentTableToolbar = <TData,>({
  table,
}: DocumentTableToolbarProps<TData>): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: createNewDocument, isLoading: creatingNewDocument } =
    useCreateDocumentAsAuthed({
      onSuccess: () => setIsOpen(false),
    });

  const titleColumn = table.getColumn("Titel");

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            className="h-8 w-[150px] lg:w-[250px]"
            onChange={(event) =>
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              titleColumn?.setFilterValue(event.target.value)
            }
            placeholder="Sök efter dokument..."
            value={(titleColumn?.getFilterValue() as string) ?? ""}
          />
        </div>
        <div className="flex justify-end">
          <UpsertDialog
            form={
              <UpsertDocumentForm
                key={"new"}
                formType="create"
                onSubmit={(values) => createNewDocument(values)}
              />
            }
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Nytt dokument"
            trigger={
              <Button
                className="ml-2 h-8 px-2 lg:px-3"
                disabled={creatingNewDocument}
                size="lg"
                type="button"
                variant="outline"
              >
                Nytt dokument
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};
