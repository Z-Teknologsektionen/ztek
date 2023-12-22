import type { FC } from "react";
import toast from "react-hot-toast";
import { UpsertDocumentGroupForm } from "~/components/admin/document-group/upsert-document-group-form";
import { UpsertDialog } from "~/components/admin/upsert-dialog";
import { Button } from "~/components/ui/button";
import { BasicDataTable } from "~/components/ui/data-table";
import { api } from "~/utils/api";
import { columns } from "./columns";

const DocumentGroupTable: FC = () => {
  const ctx = api.useUtils();

  const {
    mutate: createNewDocumentGroup,
    isLoading: creatingNewDocumentGroup,
  } = api.document.createOneGroup.useMutation({
    onMutate: () => toast.loading("Skapar ny dokumentgrupp..."),
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

  const { data, isLoading, isError } =
    api.document.getAllGroupsAsAdmin.useQuery();

  return (
    <>
      <div className="">
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
            title="Skapa ny dokumentgrupp"
            trigger={
              <Button
                disabled={creatingNewDocumentGroup}
                size="lg"
                type="button"
                variant="outline"
              >
                Ny grupp
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

export default DocumentGroupTable;
