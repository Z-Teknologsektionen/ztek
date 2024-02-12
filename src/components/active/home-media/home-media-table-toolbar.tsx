import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";
import { useState } from "react";
import toast from "react-hot-toast";
import { UpsertHomeMediaForm } from "~/components/active/home-media/upsert-home-media-form";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/utils/api";

interface MemberTableToolbarProps<TData> {
  table: Table<TData>;
}

export const HomeMediaTableToolbar = <TData,>({
  table,
}: MemberTableToolbarProps<TData>): JSX.Element => {
  const isFiltered = table.getState().columnFilters.length > 0;
  const ctx = api.useUtils();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: createNewHomeMedia, isLoading: creatingNewHomeMedia } =
    api.homeMedia.createOne.useMutation({
      onMutate: () => toast.loading("Skapar ny media..."),
      onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
      onSuccess: () => {
        setIsOpen(false);
        toast.success("En ny media har skapats.");
        void ctx.homeMedia.invalidate();
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
              <UpsertHomeMediaForm
                key={"new"}
                defaultValues={{
                  year: new Date().getFullYear(),
                  isPDF: true,
                  title: "",
                  url: "",
                  image: "",
                }}
                formType="create"
                onSubmit={(values) => createNewHomeMedia(values)}
              />
            }
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Skapa ny media"
            trigger={
              <Button
                disabled={creatingNewHomeMedia}
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
