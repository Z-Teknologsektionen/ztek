import type { FC } from "react";
import toast from "react-hot-toast";
import { UpsertDocumentForm } from "~/components/admin/document/upsert-document-form";
import { UpsertDialog } from "~/components/admin/upsert-dialog";
import { Button } from "~/components/ui/button";
import { BasicDataTable } from "~/components/ui/data-table";
import { api } from "~/utils/api";
import { columns } from "./columns";

const DocumentTable: FC = () => {
  const ctx = api.useUtils();

  const { mutate: createNewDocument, isLoading: creatingNewDocument } =
    api.document.createOne.useMutation({
      onMutate: () => toast.loading("Skapar nytt dokument..."),
      onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
      onSuccess: () => {
        toast.success("En nytt dokument har skapats.");
        void ctx.document.invalidate();
      },
      onError: (error) => {
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Något gick fel. Försök igen senare");
        }
      },
    });

  const { data, isLoading, isError } = api.document.getAllAsAdmin.useQuery();

  return (
    <>
      <div>
        <div className="flex justify-end">
          <UpsertDialog
            form={
              <UpsertDocumentForm
                key={"new"}
                defaultValues={{}}
                onSubmit={(values) => createNewDocument(values)}
                type="create"
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

      {data && (
        <BasicDataTable
          columns={columns}
          data={data}
          error={isError}
          loading={isLoading}
        />
      )}
    </>
  );
};

export default DocumentTable;
