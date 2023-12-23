"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";

import { statuses } from "../../../data/zaloonenBookingStatusTypes";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { DataTableFacetedFilter } from "../data-table-faceted-filter";

interface ZaloonenBookingTableToolbarProps<TData> {
  table: Table<TData>;
}

export const ZaloonenBookingTableToolbar = <TData,>({
  table,
}: ZaloonenBookingTableToolbarProps<TData>): JSX.Element => {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          className="h-8 w-[150px] lg:w-[250px]"
          onChange={(event) =>
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            table.getColumn("eventName")?.setFilterValue(event.target.value)
          }
          placeholder="Filtrera på event..."
          value={
            (table.getColumn("eventName")?.getFilterValue() as string) ?? ""
          }
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            options={statuses}
            title="Filtrera på status"
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
    </div>
  );
};
