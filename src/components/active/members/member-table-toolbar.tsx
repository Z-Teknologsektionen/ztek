import { AccountRoles } from "@prisma/client";
import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";
import { useState } from "react";
import { UpsertMemberForm } from "~/components/active/members/upsert-member-form";
import { DataTableFacetedFilter } from "~/components/data-table/data-table-faceted-filter";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useCreateMemberAsAdmin } from "~/hooks/mutations/useMutateMember";
import { api } from "~/utils/api";

interface MemberTableToolbarProps<TData> {
  table: Table<TData>;
}

export const MemberTableToolbar = <TData,>({
  table,
}: MemberTableToolbarProps<TData>): JSX.Element => {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { data: committees } =
    api.committee.getAllCommitteeNamesAsAdmin.useQuery();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: createNewUser, isLoading: creatingNewUser } =
    useCreateMemberAsAdmin({
      onSuccess: () => setIsOpen(false),
    });

  const nameColumn = table.getColumn("Namn");
  const committeeNameColumn = table.getColumn("Kommitté");
  const userRolesColumn = table.getColumn("Behörigheter");

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            className="h-8 w-[150px] lg:w-[250px]"
            onChange={(event) =>
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              nameColumn?.setFilterValue(event.target.value)
            }
            placeholder="Filtrera på namn..."
            value={(nameColumn?.getFilterValue() as string) ?? ""}
          />
          {committeeNameColumn && (
            <DataTableFacetedFilter
              column={committeeNameColumn}
              options={
                committees?.map(({ name }) => ({ label: name, value: name })) ??
                []
              }
              title="Filtrera på kommitté"
            />
          )}
          {userRolesColumn && (
            <DataTableFacetedFilter
              column={userRolesColumn}
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
                formType="create"
                onSubmit={(values) => createNewUser(values)}
              />
            }
            isOpen={isOpen}
            setIsOpen={setIsOpen}
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
