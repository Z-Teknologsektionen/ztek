import type { FC } from "react";
import toast from "react-hot-toast";
import UpsertProgramBoardMemberForm from "~/components/admin/program-board/upsert-program-board-form";
import { UpsertDialog } from "~/components/admin/upsert-dialog";
import SectionTitle from "~/components/layout/SectionTitle";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import { AdvancedDataTable } from "../advanced-data-table";
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
      <AdvancedDataTable
        columns={columns}
        data={data || []}
        error={isError}
        loading={isLoading}
      />
    </>
  );
};

export default ProgramBoardTable;
