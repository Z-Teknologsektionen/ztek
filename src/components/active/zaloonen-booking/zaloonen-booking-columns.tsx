import type { ColumnDef } from "@tanstack/react-table";
import { FaInfoCircle } from "react-icons/fa";
import { z } from "zod";
import BooleanCell from "~/components/columns/boolean-cell";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
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
    id: "Evenemang",
    accessorKey: "event",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: false,
    enableHiding: true,
    cell: ({ row }) => (
      <div className={cn("flex w-fit flex-row gap-4")}>
        <div>
          <p>{row.original.eventName}</p>
          <p>{row.original.organizerName}</p>
        </div>
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
    id: "Bokningstyp",
    accessorKey: "bookingType",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: false,
    enableHiding: true,
    cell: ({ row }) => getZaloonenBookingNameFromType(row.original.bookingType),
  },
  {
    id: "Bokningsstatus",
    accessorKey: "bookingStatus",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: false,
    enableHiding: true,
    filterFn: (row, id, value) => {
      const filterArray = z.string().array().parse(value);
      return filterArray.includes(row.original.bookingStatus);
    },
    //TODO: Lägg till cell som har ett svenskt värde
  },
  {
    id: "Förstahandsdatum",
    accessorKey: "primaryDateTime",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: false,
    enableHiding: true,
    cell: ({ row }) => {
      const { primaryEndDateTime, primaryStartDateTime } = row.original;
      return (
        <p className="text-xs font-normal">
          {primaryStartDateTime.toLocaleString()} -{" "}
          {primaryEndDateTime.toLocaleString()}
        </p>
      );
    },
  },
  {
    id: "Andrahandsdatum",
    accessorKey: "secondaryStartDateTime",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: false,
    enableHiding: true,
    cell: ({ row }) => {
      const { secondaryEndDateTime, secondaryStartDateTime } = row.original;
      if (secondaryEndDateTime === null || secondaryStartDateTime === null)
        return <p className="text-xs font-normal">Ej aktuellt</p>;

      return (
        <p className="text-xs font-normal">
          {secondaryStartDateTime.toLocaleString()} -{" "}
          {secondaryEndDateTime.toLocaleString()}
        </p>
      );
    },
  },
  {
    id: "Beskrivning",
    accessorKey: "eventDescription",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: false,
    enableHiding: true,
    cell: ({ row }) => (
      <p className="text-balance text-xs">{row.original.eventDescription}</p>
    ),
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
          <div className={cn("flex w-fit flex-row gap-2")}>
            <p>{partyManagerName.split(" ")[0]}</p>
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
    id: "TODO",
    accessorKey: "partyNoticeSent",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: false,
    enableHiding: true,
    cell: ({ row }) => (
      <div className="w-fit">
        <div className={cn("flex flex-row items-center justify-between gap-2")}>
          <p>Festanmälan: </p>
          <BooleanCell value={row.original.partyNoticeSent} />
        </div>
        <div className={cn("flex flex-row items-center justify-between gap-2")}>
          <p>Alkoholtillstånd: </p>
          <BooleanCell value={row.original.hasServingPermit} />
        </div>
      </div>
    ),
  },
  {
    id: "Senast updaterad",
    accessorKey: "updatedAt",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => row.original.updatedAt.toLocaleString(),
  },
  {
    id: "Skapad",
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => row.original.createdAt.toLocaleString(),
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
