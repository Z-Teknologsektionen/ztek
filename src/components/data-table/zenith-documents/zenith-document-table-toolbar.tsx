import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";
import toast from "react-hot-toast";
import { UpsertDialog } from "~/components/admin/upsert-dialog";
import { UpsertZenithDocumentForm } from "~/components/admin/zenith-documents/upsert-zenith-document-form";
import { api } from "~/utils/api";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

interface MemberTableToolbarProps<TData> {
  table: Table<TData>;
}

export const ZenithDocumentTableToolbar = <TData,>({
  table,
}: MemberTableToolbarProps<TData>): JSX.Element => {
  const isFiltered = table.getState().columnFilters.length > 0;
  const ctx = api.useUtils();

  const { mutate: createNewZenithDocument, isLoading: creatingNewDocument } =
    api.zenithDocuments.createOne.useMutation({
      onMutate: () => toast.loading("Skapar nytt dokument..."),
      onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
      onSuccess: () => {
        toast.success("En nytt dokument har skapats.");
        void ctx.zenithDocuments.invalidate();
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
              <UpsertZenithDocumentForm
                key={"new"}
                defaultValues={{
                  year: new Date().getFullYear(),
                  isPDF: true,
                  title: "",
                  url: "",
                  image: "",
                }}
                formType="create"
                onSubmit={(values) => createNewZenithDocument(values)}
              />
            }
            title="Skapa nytt dokument"
            trigger={
              <Button
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
