import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { z } from "zod";
import BadgeCell from "~/components/columns/badge-cell";
import BooleanCell from "~/components/columns/boolean-cell";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import { visibilityStates } from "~/constants/home-page-carousel";
import { objectId } from "~/schemas/helpers/custom-zod-helpers";
import { type RouterOutputs } from "~/utils/api";
import { dayjs } from "~/utils/dayjs";
import { getCarouselStatusFromDates } from "~/utils/get-carousel-status";
import { HomePageCarouselTableActions } from "./home-page-carousel-table-actions";

export type HomePageCarouselItemType =
  RouterOutputs["homePageCarousel"]["getManyByCommitteeIdAsActive"][0];

export const homePageCarouselColumns: ColumnDef<HomePageCarouselItemType>[] = [
  {
    id: "Bild",
    accessorKey: "imageUrl",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    cell: ({ row }) => (
      <Image
        alt={`Bild från ${row.original.committee.name}`}
        height={200}
        src={row.original.imageUrl}
        width={300}
      />
    ),
  },
  {
    id: "Organ",
    accessorKey: "committee.name",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    enableResizing: true,
    filterFn: (row, columnId, rawFilterValue) => {
      const filterValue = z.array(objectId).safeParse(rawFilterValue);
      if (!filterValue.success) return false;

      const committeeId = row.original.committee.id;

      return filterValue.data.includes(committeeId);
    },
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
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    header: ({ table }) => <DataTableViewOptions table={table} />,
    cell: ({ row }) => {
      const committee = row.original;
      return <HomePageCarouselTableActions key={committee.id} {...committee} />;
    },
  },
];
