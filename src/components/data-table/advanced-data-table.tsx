import type {
  ColumnDef,
  ColumnFiltersState,
  CoreRow,
  ExpandedState,
  SortingState,
  Table as TableType,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ComponentType, ReactNode } from "react";
import { useState } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";

interface AdvancedDataTableProps<TData, TValue> {
  collapsibleComponent?: ComponentType<{ row: CoreRow<TData> }>;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  error?: boolean;
  initialColumnFiltersState?: ColumnFiltersState;
  initialSortingState?: SortingState;
  initialVisibilityState?: VisibilityState;
  loading?: boolean;
  pageSize?: number;
  toolbar?: ComponentType<{ table: TableType<TData> }>;
  usePagination?: boolean;
}

export const AdvancedDataTable = <TData, TValue>({
  columns,
  data,
  loading,
  error,
  toolbar: Toolbar,
  collapsibleComponent: CollapsibleComponent,
  usePagination = true,
  initialSortingState = [],
  initialColumnFiltersState = [],
  initialVisibilityState = {},
  pageSize = 20,
}: AdvancedDataTableProps<TData, TValue>): ReactNode => {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialVisibilityState,
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    initialColumnFiltersState,
  );
  const [sorting, setSorting] = useState<SortingState>(initialSortingState);
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const table = useReactTable({
    getRowCanExpand: () => true,
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      expanded,
    },
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: true,
    columnResizeMode: "onEnd",
    enableRowSelection: true,
    onExpandedChange: setExpanded,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      {Toolbar && <Toolbar table={table} />}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id + "hd"}
                      colSpan={header.colSpan}
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      {/* TODO hur fan gör man detta */}
                      {/* <div
                        className={cn(
                          `${table.options.columnResizeDirection}`,
                          header.column.getIsResizing() ? "isResizing" : "",
                          "resizer top-2 h-full w-2 cursor-col-resize touch-none select-none",
                        )}
                        {...{
                          onDoubleClick: () => header.column.resetSize(),
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                        }}
                      /> */}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading &&
              Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: columns.length }).map((__, j) => (
                    <TableCell key={j} className="h-8">
                      <Skeleton className="h-8 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {error && !loading && (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  Okänt fel har inträffat!
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              !error &&
              (table.getRowModel().rows?.length !== 0 ? (
                table.getRowModel().rows.map((row) => (
                  <>
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} width={cell.column.getSize()}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    {row.getIsExpanded() && (
                      <TableRow>
                        <TableCell colSpan={row.getAllCells().length}>
                          <CollapsibleComponent row={row} />
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    className="h-24 text-center"
                    colSpan={columns.length}
                  >
                    Inga resultat.
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      {usePagination && <DataTablePagination table={table} />}
    </div>
  );
};
