import { ZaloonenBookingTypes } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { MdForkRight, MdHouse, MdLiquor, MdTimer } from "react-icons/md";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import IconNextToText from "~/components/layout/icon-next-to-text";
import IconWithTooltip from "~/components/tooltips/icon-with-tooltip";

import { type RouterOutputs } from "~/utils/api";

import moment from "moment";
import { FaKitchenSet } from "react-icons/fa6";
import { BookingPopoverInfo } from "~/components/active/zaloonen-booking/booking-popover-info";
import { ZaloonenBookingActionsWithApproval } from "~/components/active/zaloonen-booking/zaloonen-booking-actions-with-approval";
import { cn } from "~/utils/utils";
import { BookingClashes } from "./booking-clashes";

export type ZaloonenBookingType =
  RouterOutputs["zaloonen"]["getAllBookingsAsAuthed"][0];

export const ZaloonenRequestedBookingColumns: ColumnDef<ZaloonenBookingType>[] =
  [
    { id: "bookingStatus", accessorKey: "bookingStatus", enableHiding: true },
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
        return rowA.original.startDateTime < rowB.original.startDateTime
          ? 1
          : -1;
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
      id: "Bokningskrockar",
      accessorKey: "clashes",
      header: ({ column }) => <DataTableColumnHeader column={column} />,
      enableSorting: true,
      enableHiding: true,
      cell: ({ row }) => {
        return <BookingClashes booking={row.original} />;
      },
    },
    {
      id: "actions",
      enableSorting: false,
      enableHiding: false,
      header: ({ table }) => <DataTableViewOptions table={table} />,
      cell: ({ row }) => {
        const booking = row.original;
        return (
          <ZaloonenBookingActionsWithApproval key={booking.id} {...booking} />
        );
      },
    },
  ];
