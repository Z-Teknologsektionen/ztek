import type { FC } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { UpsertMemberDialog } from "~/components/admin/medlemmar/upsert-member-dialog";
import { UpsertMemberForm } from "~/components/admin/medlemmar/upsert-member-form";
import { Button } from "~/components/ui/button";
import { BasicDataTable } from "~/components/ui/data-table";
import { api } from "~/utils/api";
import { columns } from "./columns";

const MemberTable: FC = () => {
  const [committeeFilter, setCommitteeFilter] = useState<string | undefined>(
    undefined,
  );

  const ctx = api.useUtils();

  const { mutate: createNewUser, isLoading: creatingNewUser } =
    api.member.createMemberAsAdmin.useMutation({
      onMutate: () => toast.loading("Skapar ny medlem..."),
      onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
      onSuccess: ({ committee: { name: committeeName } }) => {
        toast.success(`En ny medlem i organet: ${committeeName} har skapats!`);
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

  const {
    data: committees,
    isLoading,
    isError,
  } = api.committee.getAllAsAdmin.useQuery();

  const { data: membersAsAdmin } =
    api.member.getCommitteeMembersAsAdmin.useQuery({
      committeeId: committeeFilter,
    });

  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-col gap-1 ">
          <label htmlFor="filterByOrganSelect">Filtera på organ</label>
          <select
            className="rounded border border-zBlack px-3 py-1"
            defaultValue={""}
            id="filterByOrganSelect"
            onChange={(e) =>
              setCommitteeFilter(
                e.target.value !== "" ? e.target.value : undefined,
              )
            }
          >
            <option value="">Alla</option>
            {committees?.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col justify-center">
          <UpsertMemberDialog
            form={
              <UpsertMemberForm
                key={"new"}
                defaultValues={{}}
                onSubmit={({ name, nickName, phone, ...rest }) =>
                  createNewUser({
                    name: name !== "" ? name : undefined,
                    nickName: nickName !== "" ? nickName : undefined,
                    phone: phone !== "" ? phone : undefined,
                    ...rest,
                  })
                }
              />
            }
            trigger={
              <Button
                disabled={creatingNewUser}
                size="lg"
                type="button"
                variant="outline"
              >
                Ny medlem
              </Button>
            }
          />
        </div>
      </div>

      {membersAsAdmin && (
        <BasicDataTable
          columns={columns}
          data={membersAsAdmin}
          error={isError}
          loading={isLoading}
        />
      )}
    </>
  );
};

export default MemberTable;
