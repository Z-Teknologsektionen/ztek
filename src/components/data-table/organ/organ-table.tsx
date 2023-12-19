import type { FC } from "react";
import toast from "react-hot-toast";
import { UpsertOrganDialog } from "~/components/admin/organ/upsert-organ-dialog";
import UpsertOrganForm from "~/components/admin/organ/upsert-organ-form";
import SectionTitle from "~/components/layout/SectionTitle";
import { Button } from "~/components/ui/button";
import { BasicDataTable } from "~/components/ui/data-table";
import { api } from "~/utils/api";
import { columns } from "./columns";

const OrganTable: FC = () => {
  const ctx = api.useUtils();

  const { data, isLoading, isError } = api.committee.getAllAsAdmin.useQuery();

  const { mutate: createNewCommittee, isLoading: creatingNewCommittee } =
    api.committee.createCommittee.useMutation({
      onMutate: () => toast.loading("Skapar nytt organ..."),
      onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
      onSuccess: ({ name }) => {
        toast.success(`Ett nytt organ med namnet: ${name} har skapats!`);
        void ctx.committee.invalidate();
        void ctx.member.invalidate();
      },
      onError: (error) => {
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Något gick fel. Försök igen senare");
        }
      },
    });

  return (
    <>
      <div>
        <SectionTitle center>Sektionsorgan</SectionTitle>
        <div className="flex justify-end">
          <UpsertOrganDialog
            form={
              <UpsertOrganForm
                key={"new"}
                defaultValues={{}}
                onSubmit={(values) => createNewCommittee(values)}
              />
            }
            trigger={
              <Button
                disabled={creatingNewCommittee}
                size="lg"
                type="button"
                variant="outline"
              >
                Skapa nytt organ
              </Button>
            }
          />
        </div>
      </div>

      {isLoading && "Hämtar organ..."}
      {isError && "Okänt fel"}
      {data && <BasicDataTable columns={columns} data={data} />}
    </>
  );
};

export default OrganTable;
