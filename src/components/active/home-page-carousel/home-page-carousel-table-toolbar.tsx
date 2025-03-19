import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { DataTableFacetedFilter } from "~/components/data-table/data-table-faceted-filter";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { Button } from "~/components/ui/button";
import { visibilityStates } from "~/constants/home-page-carousel";
import { useCreateCarouselAsActive } from "~/hooks/mutations/useMutateHomePageCarousel";
import { useRequireAuth } from "~/hooks/useRequireAuth";
import { api } from "~/utils/api";
import { getCarouselStatusName } from "~/utils/get-carousel-status";
import { userHasAdminAccess } from "~/utils/user-has-correct-role";
import UpsertHomePageCarouselForm from "./upsert-home-page-carousel-form";

interface OldCommitteeTableToolbarProps<TData> {
  table: Table<TData>;
}

export const HomePageCarouselTableToolbar = <TData,>({
  table,
}: OldCommitteeTableToolbarProps<TData>): JSX.Element => {
  const [isNewOpen, setIsNewOpen] = useState(false);
  const { data: session } = useRequireAuth();
  const isAdmin = userHasAdminAccess(session?.user.roles);

  const isFiltered = table.getState().columnFilters.length > 0;
  const committeeColumn = table.getColumn("Organ");
  const isVisibleColumn = table.getColumn("Visas");

  const { data: oldCommittees } =
    api.homePageCarousel.getManyByCommitteeIdAsActive.useQuery();

  const committeeOptions = useMemo(
    () =>
      oldCommittees
        ?.map(({ committee }) => ({
          label: committee.name,
          value: committee.id,
        }))
        .filter(
          ({ value: filterValue }, index, self) =>
            self.findIndex(({ value }) => filterValue === value) === index,
        ) || [],

    [oldCommittees],
  );

  const { mutate: createItem } = useCreateCarouselAsActive({
    onSuccess: () => setIsNewOpen(false),
  });

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          {isAdmin && (
            <DataTableFacetedFilter
              column={committeeColumn}
              options={committeeOptions}
              title="Filtrera på organ"
            />
          )}
          <DataTableFacetedFilter
            column={isVisibleColumn}
            options={visibilityStates.map((state) => ({
              value: state,
              label: getCarouselStatusName(state),
            }))}
            title="Filtera på synlighet"
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
              <UpsertHomePageCarouselForm
                formType="create"
                onSubmit={(values) => createItem(values)}
              />
            }
            isOpen={isNewOpen}
            setIsOpen={setIsNewOpen}
            title="Skapa ny"
            trigger={
              <Button
                className="ml-2 h-8 px-2 lg:px-3"
                size="lg"
                type="button"
                variant="outline"
                asChild
              >
                <div>Lägg till</div>
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};
