"use client";

import type { Table } from "@tanstack/react-table";
import { useState } from "react";
import toast from "react-hot-toast";
import { UpsertDocumentGroupForm } from "~/components/admin/document-group/upsert-document-group-form";
import { UpsertDialog } from "~/components/admin/upsert-dialog";
import { api } from "~/utils/api";
import { Button } from "../../ui/button";

interface DocumentGroupTableToolbarProps<TData> {
  table: Table<TData>;
}

export const DocumentGroupTableToolbar = <TData,>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
  table,
}: DocumentGroupTableToolbarProps<TData>): JSX.Element => {
  const ctx = api.useUtils();
  const [isOpen, setIsOpen] = useState(false);

  const {
    mutate: createNewDocumentGroup,
    isLoading: creatingNewDocumentGroup,
  } = api.document.createOneGroup.useMutation({
    onMutate: () => toast.loading("Skapar ny dokumentgrupp..."),
    onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
    onSuccess: () => {
      toast.success("En nytt dokument har skapats.");
      setIsOpen(false);
      void ctx.document.invalidate();
    },
    onError: (error) => {
      setIsOpen(true);
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
              <UpsertDocumentGroupForm
                key={"new"}
                defaultValues={{}}
                onSubmit={(values) => createNewDocumentGroup(values)}
                type="create"
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
