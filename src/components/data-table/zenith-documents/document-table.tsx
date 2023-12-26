import type { FC } from "react";
import toast from "react-hot-toast";
import { UpsertDialog } from "~/components/admin/upsert-dialog";
import { UpsertZenithDocumentForm } from "~/components/admin/zenith-documents/upsert-zenith-document-form";
import { Button } from "~/components/ui/button";
import { BasicDataTable } from "~/components/ui/data-table";
import { api } from "~/utils/api";
import { columns } from "./columns";

const ZenithDocumentTable: FC = () => {
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

  const { data, isLoading, isError } =
    api.zenithDocuments.getAllAsAdmin.useQuery();

  return (
    <>
      <div>
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

      <BasicDataTable
        columns={columns}
        data={data ?? []}
        error={isError}
        loading={isLoading}
      />
    </>
  );
};

export default ZenithDocumentTable;
