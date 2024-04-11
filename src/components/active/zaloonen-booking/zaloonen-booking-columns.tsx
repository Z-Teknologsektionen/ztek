import { ZaloonenBookingStatus } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { FaFileContract, FaInfoCircle } from "react-icons/fa";
import { MdBadge, MdLiquor, MdTimer, MdUpdate } from "react-icons/md";
import { z } from "zod";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import IconNextToText from "~/components/layout/icon-next-to-text";
import IconWithTooltip from "~/components/tooltips/icon-with-tooltip";
import { Badge } from "~/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { TABLE_ICON_SIZE } from "~/constants/size-constants";
import { type RouterOutputs } from "~/utils/api";
import {
  getZaloonenBookingEventNameFromType,
  getZaloonenBookingNameFromType,
} from "~/utils/get-zaloonen-info-from-enum";
import { cn } from "~/utils/utils";
import { ZaloonenBookingActions } from "./zaloonen-booking-actions";

export type ZaloonenBookingType =
  RouterOutputs["zaloonen"]["getAllBookingsAsAuthed"][0];

export const zaloonenBookingColumns: ColumnDef<ZaloonenBookingType>[] = [
  {
    id: "Status",
    accessorKey: "bookingStatus",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => (
      <div className="flex flex-row gap-2">
        <Badge
          className={cn(
            "bg-zDarkGray hover:bg-zDarkGray",
            row.original.bookingStatus === ZaloonenBookingStatus.DENIED
              ? "bg-danger hover:bg-danger"
              : "",
            row.original.bookingStatus === ZaloonenBookingStatus.APPROVED
              ? "bg-success hover:bg-success"
              : "",
            row.original.bookingStatus === ZaloonenBookingStatus.REQUESTED
              ? "bg-warning hover:bg-warning"
              : "",
          )}
        >
          {row.original.bookingStatus}
        </Badge>
        {row.original.bookingStatus !== ZaloonenBookingStatus.DENIED &&
          row.original.bookingStatus !== ZaloonenBookingStatus.REQUESTED && (
            <div>
              <IconWithTooltip
                className={cn(
                  row.original.partyNoticeSent ? "fill-success" : "fill-danger",
                )}
                icon={FaFileContract}
                size={20}
                tooltipText={
                  row.original.partyNoticeSent
                    ? "Festanmälan skickad"
                    : "Festanmälan ej skickad"
                }
              />
            </div>
          )}
      </div>
    ),
    enableSorting: false,
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
      <div className={cn("flex w-full flex-row justify-between gap-4")}>
        <div>
          <p>{row.original.eventName}</p>
          <p>{row.original.organizerName}</p>
        </div>
        {row.original.hasServingPermit && (
          <IconWithTooltip
            icon={MdLiquor}
            size={20}
            tooltipText="Alkoholtillstånd"
          />
        )}
        <Popover>
          <PopoverTrigger>
            <FaInfoCircle
              className={cn("fill-zBlack")}
              size={TABLE_ICON_SIZE}
            />
            <p className="sr-only">Visa beskrivning</p>
          </PopoverTrigger>
          <PopoverContent side="top">
            <p className="font-medium">Event:</p>
            <p>{row.original.eventName}</p>
            <p>{getZaloonenBookingEventNameFromType(row.original.eventType)}</p>
            <p>{getZaloonenBookingNameFromType(row.original.bookingType)}</p>
            <p className="font-medium">Arragör:</p>
            <p>{row.original.organizerName}</p>
            <p>
              <a
                className="text-blue-400 underline underline-offset-1"
                href={`mailto:${row.original.organizerEmail}`}
              >
                {row.original.organizerEmail}
              </a>
            </p>
          </PopoverContent>
        </Popover>
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
        <>
          <p className="text-sm font-normal">
            {dayjs(startDateTime).format("YYYY-MM-DD HH:mm")}
          </p>
          <p className="text-sm font-normal">
            {dayjs(endDateTime).format("YYYY-MM-DD HH:mm")}
          </p>
        </>
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
      const { partyManagerEmail, partyManagerName, partyManagerPhone } =
        row.original;
      return (
        <>
          <div className={cn("flex w-full flex-row justify-between gap-2")}>
            <p>{partyManagerName}</p>
            <Popover>
              <PopoverTrigger>
                <FaInfoCircle
                  className={cn("fill-zBlack")}
                  size={TABLE_ICON_SIZE}
                />
                <p className="sr-only">Visa mer information</p>
              </PopoverTrigger>
              <PopoverContent className="w-fit max-w-xs" side="top">
                <p className="font-medium">{partyManagerName}</p>
                <p>
                  <a
                    className="text-blue-400 underline underline-offset-1"
                    href={`mailto:${partyManagerEmail}`}
                  >
                    {partyManagerEmail}
                  </a>
                </p>
                <p>
                  <a
                    className="text-blue-400 underline underline-offset-1"
                    href={`tel:${partyManagerPhone}`}
                  >
                    {partyManagerPhone}
                  </a>
                </p>
              </PopoverContent>
            </Popover>
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
        text={dayjs(row.original.createdAt).format("YYYY-MM-DD")}
        textFirst={true}
        tooltipText={dayjs(row.original.createdAt).format(
          "YYYY-MM-DD  HH:mm:ss",
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
