import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";
import { useState } from "react";
import { UpsertZenithMediaForm } from "~/components/active/zenith-media/upsert-zenith-media-form";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useCreateZenithMediaAsAuthed } from "~/hooks/mutations/useMutateZenithMedia";
import { handleCreateZenithMediaFile } from "~/utils/sftp/handle-create-zenith-media-file";
import type { ZenithFormValuesType } from "./zenith-media-table-actions";

interface MemberTableToolbarProps<TData> {
  table: Table<TData>;
}

export const ZenithMediaTableToolbar = <TData,>({
  table,
}: MemberTableToolbarProps<TData>): JSX.Element => {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmittedFile = (props: ZenithFormValuesType): void => {
    const url = handleCreateZenithMediaFile(props);
    createNewZenithMedia({
      coverImage: props.coverImage,
      title: props.title,
      year: props.year,
      url: url,
    });
  };

  const { mutate: createNewZenithMedia, isLoading: creatingNewZenithMedia } =
    useCreateZenithMediaAsAuthed({ onSuccess: () => setIsOpen(false) });

  const titleColumn = table.getColumn("Titel");

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            className="h-8 w-[150px] lg:w-[250px]"
            onChange={(event) =>
              titleColumn?.setFilterValue(event.target.value)
            }
            placeholder="Filtrera på titel..."
          />

          {isFiltered && (
            <Button
              className="h-8 px-2 lg:px-3"
              onClick={() => table.resetColumnFilters()}
              variant="outline"
            >
              Återställ
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex justify-end">
          <UpsertDialog
            form={
              <UpsertZenithMediaForm
                key={"new"}
                defaultValues={{
                  year: new Date().getFullYear(),
                  title: "",
                  input: {
                    url: "",
                  },
                  coverImage: "",
                }}
                formType="create"
                onSubmit={(values: ZenithFormValuesType) => {
                  if (values.input.fileInput) {
                    handleSubmittedFile(values);
                  } else {
                    createNewZenithMedia({
                      url: values.input.url || "",
                      ...values,
                    });
                  }
                }}
              />
            }
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Skapa ny media"
            trigger={
              <Button
                className="ml-2 h-8 px-2 lg:px-3"
                disabled={creatingNewZenithMedia}
                size="lg"
                type="button"
                variant="outline"
              >
                Ny media
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};
