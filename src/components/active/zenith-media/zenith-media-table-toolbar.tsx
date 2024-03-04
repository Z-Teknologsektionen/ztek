import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";
import { useState } from "react";
import toast from "react-hot-toast";
import { UpsertZenithMediaForm } from "~/components/active/zenith-media/upsert-zenith-media-form";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  handleCreateSftpFile,
  handleDeleteSftpFile,
} from "~/hooks/api-calls/sftp";
import { api } from "~/utils/api";
import type { ZenithFormValuesType } from "./zenith-media-table-actions";

interface MemberTableToolbarProps<TData> {
  table: Table<TData>;
}

export const ZenithMediaTableToolbar = <TData,>({
  table,
}: MemberTableToolbarProps<TData>): JSX.Element => {
  const isFiltered = table.getState().columnFilters.length > 0;
  const ctx = api.useUtils();
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateZenithMediaFile = (props: ZenithFormValuesType): void => {
    if (!(props.input.fileInput && props.input.fileInput[0])) {
      toast.error("No file input");
      return;
    }
    const filename =
      props.title.toLowerCase().replace(" ", "-") +
      "." +
      props.input.fileInput[0].name.split(".").pop();
    const toastId = toast.loading(
      `Laddar upp ${props.input.fileInput[0].name}.\n Detta kan ta en stund om du laddar upp stora filer...`,
    );
    handleCreateSftpFile({
      dir: "media",
      file: props.input.fileInput[0],
      isPublic: true,
      overwrite: false,
      filename,
    })
      .then((url) => {
        toast.dismiss(toastId);
        toast.success("Filuppladdningen lyckades");
        if (url) {
          createNewZenithMedia({
            coverImage: props.coverImage,
            title: props.title,
            year: props.year,
            url: url,
          });
        }
      })
      .catch((err: Error) => {
        toast.dismiss(toastId);
        toast.error(
          "Något gick fel vid uppladdningen av filen. \n" + err.message,
        );
      });
  };

  const { mutate: createNewZenithMedia, isLoading: creatingNewZenithMedia } =
    api.zenithMedia.createOneAsAuthed.useMutation({
      onMutate: () => toast.loading("Skapar ny media..."),
      onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
      onSuccess: ({ title }) => {
        setIsOpen(false);
        toast.success(`${title} har skapats.`);
        void ctx.zenithMedia.invalidate();
      },
      onError: (error, data) => {
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Något gick fel. Försök igen senare");
        }
        const deleteToastId = toast.loading("Tar bort filen från servern...");
        handleDeleteSftpFile(data.url)
          .then(() => {
            toast.dismiss(deleteToastId);
            toast.success("Filen har tagits bort från servern.");
          })
          .catch((err: Error) => {
            toast.dismiss(deleteToastId);
            toast.error(
              `Kunde inte ta bort filen från servern. \n ${err.message}`,
            );
          });
      },
    });

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
                    handleCreateZenithMediaFile(values);
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
