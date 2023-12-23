import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { type RouterOutputs } from "~/utils/api";
import { statuses } from "../../../data/zaloonenBookingStatusTypes";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableViewOptions } from "../data-table-view-options";
import { ZaloonenBookingTableActions } from "./zaloonen-booking-table-actions";

type ZaloonenBooking = RouterOutputs["zaloonenBooking"]["getAllAsAdmin"][0];

export const columns: ColumnDef<ZaloonenBooking>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const option = statuses.find(
        (status) => status.value === row.original.status,
      );
      if (option === undefined) return row.original.status;
      return (
        <div style={{ color: option.iconColor }}>
          <option.icon className="text-muted-foreground h-6 w-6" />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
    filterFn: (row, id, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       aria-label="Select all"
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       className="translate-y-[2px]"
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       aria-label="Select row"
  //       checked={row.getIsSelected()}
  //       className="translate-y-[2px]"
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "eventName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Event" />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "organizerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Arrangör" />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "organizerEmail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "primaryDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Primärt datum" />
    ),
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      const startDate = new Date(row.original.primaryStartDate);
      const endDate = new Date(row.original.primaryEndDate);
      return `${format(startDate, "eee dd MMM HH:mm", {
        locale: sv,
      })} till ${format(endDate, "eee dd MMM HH:mm", { locale: sv })}`;
    },
  },

  {
    accessorKey: "secondaryDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sekundärt datum" />
    ),
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      const startDate = new Date(row.original.secondaryStartDate);
      const endDate = new Date(row.original.secondaryEndDate);
      return `${format(startDate, "eee dd MMM HH:mm", {
        locale: sv,
      })} till ${format(endDate, "eee dd MMM HH:mm", { locale: sv })}`;
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bokning skapad" />
    ),
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      const startDate = new Date(row.original.createdAt);
      return `${format(startDate, "PPpp", {
        locale: sv,
      })}`;
    },
  },
  {
    id: "actions",
    header: ({ table }) => (
      <div className="flex justify-end">
        {/* <DataTableColumnHeader column={column} title="Mer" /> */}
        <DataTableViewOptions table={table} />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const zaloonenBooking = {
        ...row.original,
      };
      return (
        <div className="flex justify-end">
          <ZaloonenBookingTableActions
            key={zaloonenBooking.id}
            {...zaloonenBooking}
          />
        </div>
      );
    },
  },
];
