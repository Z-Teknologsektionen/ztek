import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";
import toast from "react-hot-toast";
import { UpsertDialog } from "~/components/admin/upsert-dialog";
import { UpsertZenithMediaForm } from "~/components/admin/zenith-media/upsert-zenith-media-form";
import { api } from "~/utils/api";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

interface MemberTableToolbarProps<TData> {
  table: Table<TData>;
}

export const ZenithMediaTableToolbar = <TData,>({
  table,
}: MemberTableToolbarProps<TData>): JSX.Element => {
  const isFiltered = table.getState().columnFilters.length > 0;
  const ctx = api.useUtils();

  const { mutate: createNewZenithMedia, isLoading: creatingNewZenithMedia } =
    api.zenithMedia.createOne.useMutation({
      onMutate: () => toast.loading("Skapar ny media..."),
      onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
      onSuccess: () => {
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

  const titleColumn = table.getColumn("title");

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
                  isPDF: true,
                  title: "",
                  url: "",
                  image: "",
                }}
                formType="create"
                onSubmit={(values) => createNewZenithMedia(values)}
              />
            }
            title="Skapa ny media"
            trigger={
              <Button
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