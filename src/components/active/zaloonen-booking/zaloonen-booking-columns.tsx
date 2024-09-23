import { ZaloonenBookingTypes } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import {
  MdBadge,
  MdForkRight,
  MdHouse,
  MdLiquor,
  MdTimer,
  MdUpdate,
} from "react-icons/md";
import { z } from "zod";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import IconNextToText from "~/components/layout/icon-next-to-text";
import IconWithTooltip from "~/components/tooltips/icon-with-tooltip";

import { type RouterOutputs } from "~/utils/api";

import moment from "moment";
import { FaKitchenSet } from "react-icons/fa6";
import { cn } from "~/utils/utils";
import { BookingPopoverInfo } from "./booking-popover-info";
import { PartyManagerPopoverInfo } from "./party-manager-popover-info";
import { ZaloonenBookingActions } from "./zaloonen-booking-actions";
import { ZaloonenBookingStatusActions } from "./zaloonen-booking-status-actions";

export type ZaloonenBookingType =
  RouterOutputs["zaloonen"]["getAllBookingsAsAuthed"][0];

export const zaloonenBookingColumns: ColumnDef<ZaloonenBookingType>[] = [
  {
    id: "Status",
    accessorKey: "bookingStatus",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return (
        <ZaloonenBookingStatusActions key={row.original.id} {...row.original} />
      );
    },

    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      const filterArray = z.string().array().parse(value);
      return filterArray.includes(row.original.bookingStatus);
    },
    //TODO: Lägg till cell som har ett svenskt värde
  },
  {
    id: "Evenemang",
    accessorKey: "event",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: false,
    enableHiding: true,
    cell: ({ row }) => (
      <div
        className={cn("flex w-full flex-row justify-between gap-4")}
        id={row.original.id}
      >
        <div className="max-w-32 flex gap-1">
          <BookingPopoverInfo booking={row.original} />
          <div className="max-w-32 flex flex-col">
            <p className="truncate">{row.original.eventName}</p>
            <p className="truncate">{row.original.organizerName}</p>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          {row.original.hasServingPermit && (
            <IconWithTooltip
              icon={MdLiquor}
              size={20}
              tooltipText="Alkoholtillstånd"
            />
          )}
          {row.original.bookingType === ZaloonenBookingTypes.KITCHEN && (
            <IconWithTooltip
              icon={FaKitchenSet}
              size={20}
              tooltipText="Bara köket"
            />
          )}
          {row.original.bookingType === ZaloonenBookingTypes.ALL && (
            <IconWithTooltip
              icon={MdHouse}
              size={20}
              tooltipText="Hela Zaloonen"
            />
          )}
          {row.original.bookingType === ZaloonenBookingTypes.APPLIANCES && (
            <IconWithTooltip
              icon={MdForkRight}
              size={20}
              tooltipText="Hela Zaloonen"
            />
          )}
        </div>
      </div>
    ),
  },

  {
    id: "Bokningsdatum",
    accessorKey: "date",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      const { startDateTime, endDateTime } = row.original;
      return (
        <div className="flex justify-between gap-1">
          <div className="flex flex-col text-sm font-normal">
            <p>{moment(startDateTime).format("D MMM HH:mm")}</p>
            <p>{moment(endDateTime).format("D MMM HH:mm")}</p>
          </div>
          <p className="flex items-center justify-center font-semibold ">
            {moment(endDateTime).diff(moment(startDateTime), "hours")} H
          </p>
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      return rowA.original.startDateTime < rowB.original.startDateTime ? 1 : -1;
    },
  },
  {
    id: "Kategori",
    accessorKey: "eventType",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "Festansvarig",
    accessorKey: "partyManager",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: false,
    enableHiding: true,
    cell: ({ row }) => {
      return (
        <>
          <div className={cn("flex w-full flex-row justify-between gap-2")}>
            <p>{row.original.partyManagerName}</p>
            <PartyManagerPopoverInfo booking={row.original} />
          </div>
        </>
      );
    },
  },
  {
    id: "Inskickad",
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => (
      <IconNextToText
        className="text-sm"
        icon={MdTimer}
        text={dayjs(row.original.createdAt).format("DD-MM-YYYY")}
        textFirst={true}
        tooltipText={dayjs(row.original.createdAt).format(
          "DD-MM-YYYY  HH:mm:ss",
        )}
      />
    ),
  },
  {
    id: "Senast updaterad",
    accessorKey: "updatedAt",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => (
      <>
        <IconNextToText
          className="text-sm"
          icon={MdUpdate}
          text={dayjs(row.original.updatedAt).fromNow()}
          tooltipText="Uppdaterades senast"
        />
        <IconNextToText
          className="text-sm"
          icon={MdBadge}
          text={row.original.updatedBy?.name ?? "Ej uppdaterad"}
          tooltipText="Uppdaterades av"
        />
      </>
    ),
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => <DataTableViewOptions table={table} />,
    cell: ({ row }) => {
      const booking = row.original;
      return <ZaloonenBookingActions key={booking.id} {...booking} />;
    },
  },
];
