import { ZaloonenBookingStatus } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { FaFileContract } from "react-icons/fa";
import DeleteTriggerButton from "~/components/buttons/delete-trigger-button";
import EditTriggerButton from "~/components/buttons/edit-trigger-button";
import ActionDialog from "~/components/dialogs/action-dialog";
import IconWithTooltip from "~/components/tooltips/icon-with-tooltip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  useDeleteZaloonenBookingAsAuthed,
  useUpdateZaloonenBookingStatusAsAuthed,
} from "~/hooks/mutations/useMutateZaloonenBooking";
import { cn } from "~/utils/utils";
import type { ZaloonenBookingType } from "./zaloonen-booking-columns";
import { ZaloonenStatusBadge } from "./zaloonen-status-badge";

export const ZaloonenBookingActions: FC<ZaloonenBookingType> = ({
  id,
  ...values
}) => {
  const router = useRouter();

  const { mutate: deleteZaloonenBooking } = useDeleteZaloonenBookingAsAuthed(
    {},
  );
  return (
    <div className="flex justify-end">
      <Link
        href={`${router.basePath}/student-division/zaloonen/edit-booking?id=${id}&hash=${values.hash}`}
        target="_blank"
      >
        <EditTriggerButton />
      </Link>
      <ActionDialog
        onSubmit={() => deleteZaloonenBooking({ id })}
        trigger={<DeleteTriggerButton />}
      />
    </div>
  );
};

export const ZaloonenBookingStatusActions: FC<ZaloonenBookingType> = ({
  id,
  ...values
}) => {
  const { mutate: updateZaloonenBookingStatus } =
    useUpdateZaloonenBookingStatusAsAuthed({});

  return (
    <div className="flex w-fit flex-row gap-2">
      <Select
        defaultValue={values.bookingStatus ?? ""}
        onValueChange={(value) =>
          updateZaloonenBookingStatus({
            id,
            bookingStatus: value as ZaloonenBookingStatus,
          })
        }
      >
        <SelectTrigger className="h-6 bg-cardBackground">
          <ZaloonenStatusBadge status={values.bookingStatus}>
            <SelectValue placeholder="Status" />
          </ZaloonenStatusBadge>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {values && (
              <>
                <SelectLabel>Status</SelectLabel>
                {Object.values(ZaloonenBookingStatus).map((status) => {
                  return (
                    <SelectItem key={status} value={status}>
                      <ZaloonenStatusBadge status={status}>
                        {status}
                      </ZaloonenStatusBadge>
                    </SelectItem>
                  );
                })}
              </>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
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
