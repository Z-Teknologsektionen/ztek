import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";
import type { AxiosError } from "axios";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { UpsertZenithMediaForm } from "~/components/active/zenith-media/upsert-zenith-media-form";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
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
    const formData = new FormData();

    if (props.input.fileInput && props.input.fileInput[0]) {
      formData.set("file", props.input.fileInput[0]);
    } else {
      return console.error("No file input");
    }
    formData.set("public", "true");
    formData.set("dir", "media");
    formData.set(
      "filename",
      props.title.toLowerCase().replace(" ", "-") +
        "." +
        props.input.fileInput[0].name.split(".").pop(),
    );
    const toastId = toast.loading("Laddar upp filen...");
    axios({
      method: "post",
      url: "/api/sftp/upload",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        toast.dismiss(toastId);
        toast.success("Filuppladdningen lyckades");
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (response.data.message) {
          createNewZenithMedia({
            coverImage: props.coverImage,
            title: props.title,
            year: props.year,
            url: response.data.message,
          });
        }

        // console.log(response);
      })
      .catch((error: AxiosError) => {
        toast.dismiss(toastId);
        const errorMessage =
          (error.response?.data as { error?: string })?.error || "";
        toast.error(
          "Något gick fel vid uppladdningen av filen. \n" + errorMessage,
        );
      });
  };

  const { mutate: createNewZenithMedia, isLoading: creatingNewZenithMedia } =
    api.zenithMedia.createOneAsAuthed.useMutation({
      onMutate: () => toast.loading("Skapar ny media..."),
      onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
      onSuccess: () => {
        setIsOpen(false);
        toast.success("En ny media har skapats.");
        void ctx.zenithMedia.invalidate();
      },
      onError: (error) => {
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Något gick fel. Försök igen senare");
        }
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
