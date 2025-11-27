import type { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import BadgeCell from "~/components/columns/badge-cell";
import BooleanCell from "~/components/columns/boolean-cell";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import { visibilityStates } from "~/constants/home-page-carousel";
import type { RouterOutputs } from "~/utils/api";
import { dayjs } from "~/utils/dayjs";
import { getCarouselStatusFromDates } from "~/utils/get-carousel-status";
import { ZenithMediaTableActions } from "./zenith-media-table-actions";

export type ZenithMediaType = RouterOutputs["zenithMedia"]["getAllAsAuthed"][0];

export const zenithMediaColumns: ColumnDef<ZenithMediaType>[] = [
  {
    id: "Titel",
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: false,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "Url",
    accessorKey: "url",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: false,
    enableHiding: true,
    enableResizing: true,
    filterFn: "includesString",
  },
  {
    id: "År",
    accessorKey: "year",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: "inNumberRange",
  },
  {
    id: "Starttid",
    accessorKey: "startDateTime",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const date = row.original.startDateTime;

      if (date === null) return <BooleanCell value={false} />;

      return dayjs(date).format("YYYY-MM-DD HH:mm");
    },
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    sortingFn: "datetime",
  },
  {
    id: "Sluttid",
    accessorKey: "endDateTime",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const date = row.original.endDateTime;

      if (date === null) return <BooleanCell value={false} />;

      return dayjs(date).format("YYYY-MM-DD HH:mm");
    },
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    sortingFn: "datetime",
  },
  {
    id: "Visas",
    accessorKey: "isShown",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const status = getCarouselStatusFromDates(row.original);

      if (status === "scheduled")
        return <BadgeCell variant="outline">Schemalagd</BadgeCell>;

      if (status === "passed")
        return <BadgeCell variant="destructive">Utgången</BadgeCell>;

      return <BadgeCell variant="productive">Visas</BadgeCell>;
    },
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: (row, columnId, rawFilterValue) => {
      const filterValue = z
        .enum(visibilityStates)
        .array()
        .safeParse(rawFilterValue);
      if (!filterValue.success) return false;

      const currentValue = getCarouselStatusFromDates(row.original);

      return filterValue.data.includes(currentValue);
    },
  },
  {
    id: "actions",
    header: ({ table }) => <DataTableViewOptions table={table} />,
    cell: ({ row }) => {
      const zenithMedia = row.original;
      return <ZenithMediaTableActions key={zenithMedia.id} {...zenithMedia} />;
    },
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    filterFn: undefined,
  },
];
