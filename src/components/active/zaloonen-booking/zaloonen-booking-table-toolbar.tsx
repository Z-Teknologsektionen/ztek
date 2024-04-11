import { ZaloonenBookingStatus } from "@prisma/client";
import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "~/components/data-table/data-table-faceted-filter";
import { Button } from "~/components/ui/button";

interface ZaloonenBookingTableToolbarProps<TData> {
  table: Table<TData>;
}

export const ZaloonenBookingTableToolbar = <TData,>({
  table,
}: ZaloonenBookingTableToolbarProps<TData>): JSX.Element => {
  const isFiltered = table.getState().columnFilters.length > 0;
  // const ctx = api.useUtils();

  const bokningsStatusColumn = table.getColumn("Bokningsstatus");

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <DataTableFacetedFilter
            column={bokningsStatusColumn}
            options={Object.values(ZaloonenBookingStatus).map((status) => ({
              label: status, //TODO: Funktion som ger bättre namn
              value: status,
            }))}
            title="Filtrera på status"
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
        <div className="flex justify-end"></div>
      </div>
    </div>
  );
};
