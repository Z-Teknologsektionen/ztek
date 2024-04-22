import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { DataTableFacetedFilter } from "~/components/data-table/data-table-faceted-filter";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { Button } from "~/components/ui/button";
import {
  useCreateOldCommitteeAsActive,
  useCreateOldCommitteeFromCommitteeAsActive,
} from "~/hooks/mutations/useMutateOldCommittee";
import { useRequireAuth } from "~/hooks/useRequireAuth";
import { api } from "~/utils/api";
import UpsertOldCommitteeForm from "./upsert-old-committee-form";

interface OldCommitteeTableToolbarProps<TData> {
  table: Table<TData>;
}

export const OldCommitteeTableToolbar = <TData,>({
  table,
}: OldCommitteeTableToolbarProps<TData>): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useRequireAuth();
  const committeeId = session?.user.committeeId;
  const isAdmin = session?.user.roles.includes("ADMIN") || false;

  const isFiltered = table.getState().columnFilters.length > 0;
  const committeeColumn = table.getColumn("Organ");
  const yearColumn = table.getColumn("År");

  const { data: oldCommittees } =
    api.oldCommittee.getManyByCommitteeIdAsActive.useQuery({
      belongsToCommitteeId: committeeId || "",
      isAdmin: isAdmin,
    });

  const { mutate: createNewOldCommittee, isLoading: creatingNewOldCommittee } =
    useCreateOldCommitteeAsActive({
      onSuccess: () => setIsOpen(false),
    });

  const {
    mutate: createOldCommitteeFromCommittee,
    isLoading: creatingNewOldCommitteeFromCommittee,
  } = useCreateOldCommitteeFromCommitteeAsActive({});

  const committeeOptions = useMemo(
    () =>
      oldCommittees
        ?.map(({ belongsToCommittee }) => ({
          label: belongsToCommittee.name,
          value: belongsToCommittee.id,
        }))
        .filter(
          ({ value: filterValue }, index, self) =>
            self.findIndex(({ value }) => filterValue === value) === index,
        ) || [],

    [oldCommittees],
  );

  const yearOptions = useMemo(
    () =>
      oldCommittees
        ?.map(({ year }) => ({
          label: year.toString(),
          value: year,
        }))
        .filter(
          ({ value: filterValue }, index, self) =>
            self.findIndex(({ value }) => filterValue === value) === index,
        ) || [],
    [oldCommittees],
  );

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          {isAdmin && committeeColumn && (
            <DataTableFacetedFilter
              column={committeeColumn}
              options={committeeOptions}
              title="Filtrera på organ"
            />
          )}
          <DataTableFacetedFilter
            column={yearColumn}
            options={yearOptions}
            title="Filtrera på år"
          />
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
              <UpsertOldCommitteeForm
                key="new"
                formType="create"
                onSubmit={(values) => createNewOldCommittee(values)}
              />
            }
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Nytt patetår"
            trigger={
              <Button
                className="ml-2 h-8 px-2 lg:px-3"
                disabled={creatingNewOldCommittee}
                size="lg"
                type="button"
                variant="outline"
              >
                Lägg till
              </Button>
            }
          />
        </div>
        {committeeId && (
          <Button
            className="ml-2 h-8 px-2 lg:px-3"
            disabled={creatingNewOldCommitteeFromCommittee}
            onClick={() =>
              createOldCommitteeFromCommittee({
                belongsToCommitteeId: committeeId,
              })
            }
            size="lg"
            type="button"
            variant="outline"
          >
            Lägg från sittande
          </Button>
        )}
      </div>
    </div>
  );
};
