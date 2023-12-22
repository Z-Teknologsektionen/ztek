import type { FC } from "react";
import toast from "react-hot-toast";
import UpsertProgramBoardMemberForm from "~/components/admin/program-board/upsert-program-board-form";
import { UpsertDialog } from "~/components/admin/upsert-dialog";
import SectionTitle from "~/components/layout/SectionTitle";
import { Button } from "~/components/ui/button";
import { BasicDataTable } from "~/components/ui/data-table";
import { api } from "~/utils/api";
import { columns } from "./columns";

const ProgramBoardTable: FC = () => {
  const ctx = api.useUtils();

  const { data, isLoading, isError } =
    api.programBoard.getAllAsAdmin.useQuery();

  const {
    mutate: createNewProgramBoardMember,
    isLoading: creatingNewProgramBoardMember,
  } = api.programBoard.createOne.useMutation({
    onMutate: () => toast.loading("Skapar nytt organ..."),
    onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
    onSuccess: () => {
      toast.success(`En ny programmedlem har skapats!`);
      void ctx.programBoard.invalidate();
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
        <SectionTitle center>Programledningen</SectionTitle>
        <div className="flex justify-end">
          <UpsertDialog
            form={
              <UpsertProgramBoardMemberForm
                key={"new"}
                defaultValues={{}}
                onSubmit={(values) => createNewProgramBoardMember(values)}
                type="create"
              />
            }
            title="Skapa ny programmedlem"
            trigger={
              <Button
                disabled={creatingNewProgramBoardMember}
                size="lg"
                type="button"
                variant="outline"
              >
                Skapa ny medlem
              </Button>
            }
          />
        </div>
      </div>

      {isLoading && "Hämtar programledningen..."}
      {isError && "Okänt fel"}
      {data && <BasicDataTable columns={columns} data={data} />}
    </>
  );
};

export default ProgramBoardTable;
