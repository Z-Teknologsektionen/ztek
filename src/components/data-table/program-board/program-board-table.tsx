import type { FC } from "react";
import toast from "react-hot-toast";
import { UpsertProgramBoardMemberDialog } from "~/components/admin/program-board/upsert-program-board-dialog";
import UpsertProgramBoardMemberForm from "~/components/admin/program-board/upsert-program-board-form";
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
          <UpsertProgramBoardMemberDialog
            form={
              <UpsertProgramBoardMemberForm
                key={"new"}
                defaultValues={{}}
                onSubmit={({ image, phone, ...rest }) =>
                  createNewProgramBoardMember({
                    image: image !== "" ? image : undefined,
                    phone: phone !== "" ? phone : undefined,
                    ...rest,
                  })
                }
                type="create"
              />
            }
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
            type="create"
          />
        </div>
      </div>

      {isLoading && "Hämtar organ..."}
      {isError && "Okänt fel"}
      {data && <BasicDataTable columns={columns} data={data} />}
    </>
  );
};

export default ProgramBoardTable;
