import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import BooleanCell from "~/components/columns/boolean-cell";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import StyledLink from "~/components/layout/styled-link";
import { type RouterOutputs } from "~/utils/api";
import { HomepageCarouselTableActions } from "./homepage-carousel-table-actions";

export type HomepageCarouselType =
  RouterOutputs["homepageCarousel"]["getAllAsAuthed"][0];

export const homepageCarouselColumns: ColumnDef<HomepageCarouselType>[] = [
  {
    id: "Titel",
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "Url",
    accessorKey: "url",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => (
      <StyledLink href={row.original.url}>{row.original.url} </StyledLink>
    ),
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "Ordning",
    accessorKey: "members",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "auto",
  },
  {
    id: "Visas",
    accessorKey: "active",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const isActive =
        row.original.startDate < new Date() &&
        (row.original.endDate ? row.original.endDate > new Date() : true);

      return <BooleanCell value={isActive} />;
    },
    enableSorting: false,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "Startdatum",
    accessorKey: "startDate",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => <p>{dayjs(row.original.startDate).fromNow()}</p>,
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "Slutdatum",
    accessorKey: "endDate",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => <p>{dayjs(row.original.endDate).fromNow()}</p>,
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "Skapad Av",
    accessorKey: "author",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => (
      <p>
        {row.original.createdBy.name
          ? row.original.createdBy.name
          : row.original.createdBy.nickName}
      </p>
    ),

    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    header: ({ table }) => <DataTableViewOptions table={table} />,
    cell: ({ row }) => {
      const entry = row.original;
      return <HomepageCarouselTableActions key={entry.id} {...entry} />;
    },
  },
];
