import { ZaloonenBookingStatus } from "@prisma/client";

import type { FC } from "react";
import { FaFileContract } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { ZaloonenStatusBadge } from "~/components/active/zaloonen-booking/zaloonen-status-badge";
import IconNextToText from "~/components/layout/icon-next-to-text";
import IconWithTooltip from "~/components/tooltips/icon-with-tooltip";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useUpdateZaloonenBookingStatusAsAuthed } from "~/hooks/mutations/useMutateZaloonenBooking";
import { cn } from "~/utils/utils";
import type { ZaloonenBookingType } from "./zaloonen-booking-columns";

export const ZaloonenBookingStatusActions: FC<ZaloonenBookingType> = ({
  id,
  ...values
}) => {
  const { mutate: updateZaloonenBookingStatus } =
    useUpdateZaloonenBookingStatusAsAuthed({});

  return (
    <div className="flex w-fit flex-row gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <ZaloonenStatusBadge status={values.bookingStatus}>
            <IconNextToText
              icon={MdArrowDropDown}
              iconClassName="fill-white"
              text={values.bookingStatus}
              textFirst={true}
              tooltipText="Ändra status"
            />
          </ZaloonenStatusBadge>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Ändra status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Object.values(ZaloonenBookingStatus).map((status) => (
            <DropdownMenuCheckboxItem
              key={status}
              checked={values.bookingStatus === status}
              disabled={values.bookingStatus === status}
              onCheckedChange={() =>
                updateZaloonenBookingStatus({
                  id,
                  bookingStatus: status,
                })
              }
            >
              <ZaloonenStatusBadge className="my-1 text-base" status={status}>
                {status}
              </ZaloonenStatusBadge>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {values.bookingStatus !== ZaloonenBookingStatus.DENIED &&
        values.bookingStatus !== ZaloonenBookingStatus.REQUESTED && (
          <div className="content-center">
            <IconWithTooltip
              className={cn(
                values.partyNoticeSent ? "fill-success" : "fill-danger",
              )}
              icon={FaFileContract}
              size={15}
              tooltipText={
                values.partyNoticeSent
                  ? "Festanmälan skickad"
                  : "Festanmälan ej skickad"
              }
            />
          </div>
        )}
    </div>
  );
};
