import type { FC } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { UpsertMemberForm } from "~/components/admin/members/upsert-member-form";
import { UpsertDialog } from "~/components/admin/upsert-dialog";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import { AdvancedDataTable } from "../advanced-data-table";
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
      onSuccess: ({ name: userName, committee: { name: committeeName } }) => {
        toast.success(`${userName} i ${committeeName} har skapats!`);
        void ctx.committee.invalidate();
        void ctx.member.invalidate();
        void ctx.user.invalidate();
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
    isLoading: isLoadingCommittees,
    isError: isErrorCommittees,
  } = api.committee.getAllAsAdmin.useQuery();

  const {
    data: membersAsAdmin,
    isLoading: isLoadingMembers,
    isError: isErrorMembers,
  } = api.member.getCommitteeMembersAsAdmin.useQuery({
    committeeId: committeeFilter,
  });

  const {
    data: userAsAdmin,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = api.user.getAllUserRolesAsAdmin.useQuery();

  const usersAndMembersCombined = membersAsAdmin?.map((member) => {
    const user = userAsAdmin?.find((u) => u.email === member.email);
    return {
      ...member,
      roles: user?.roles,
      userId: user?.id,
    };
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
          <UpsertDialog
            form={
              <UpsertMemberForm
                key={"new"}
                defaultValues={{}}
                onSubmit={(values) => createNewUser(values)}
                type="create"
              />
            }
            title="Skapa ny aktiv"
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

      <AdvancedDataTable
        columns={columns}
        data={usersAndMembersCombined || []}
        error={isErrorCommittees || isErrorMembers || isErrorUser}
        loading={isLoadingCommittees || isLoadingMembers || isLoadingUser}
      />
    </>
  );
};

export default MemberTable;
