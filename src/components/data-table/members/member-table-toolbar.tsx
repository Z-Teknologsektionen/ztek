"use client";

import { AccountRoles } from "@prisma/client";
import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";
import toast from "react-hot-toast";
import { UpsertMemberForm } from "~/components/admin/members/upsert-member-form";
import { UpsertDialog } from "~/components/admin/upsert-dialog";
import { api } from "~/utils/api";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { DataTableFacetedFilter } from "../data-table-faceted-filter";

interface MemberTableToolbarProps<TData> {
  table: Table<TData>;
}

export const MemberTableToolbar = <TData,>({
  table,
}: MemberTableToolbarProps<TData>): JSX.Element => {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { data } = api.committee.getAllCommitteeNamesAsAdmin.useQuery();
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
  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            className="h-8 w-[150px] lg:w-[250px]"
            onChange={(event) =>
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            placeholder="Filtrera på namn..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          />
          {table.getColumn("committee_name") && (
            <DataTableFacetedFilter
              column={table.getColumn("committee_name")}
              options={
                data?.map(({ name }) => ({ label: name, value: name })) ?? []
              }
              title="Filtrera på kommitté"
            />
          )}
          {table.getColumn("roles") && (
            <DataTableFacetedFilter
              column={table.getColumn("roles")}
              options={Object.values(AccountRoles).map((role) => ({
                label: role,
                value: role,
              }))}
              title="Filtrera på behörigheter"
            />
          )}
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
                className="ml-2 h-8 px-2 lg:px-3"
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
    </div>
  );
};