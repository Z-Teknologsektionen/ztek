import type { FC } from "react";

import { ZaloonenBookingStatus } from "@prisma/client";

import moment from "moment";
import ApproveTriggerButton from "~/components/buttons/approve-trigger-button";
import DenyTriggerButton from "~/components/buttons/deny-trigger-button";
import ActionDialog from "~/components/dialogs/action-dialog";
import StyledLink from "~/components/layout/styled-link";
import { useUpdateZaloonenBookingStatusAsAuthed } from "~/hooks/mutations/useMutateZaloonenBooking";
import type { ZaloonenBookingType } from "./all-bookings/zaloonen-booking-columns";
import { ZaloonenBookingActions } from "./zaloonen-booking-actions";

export const ZaloonenBookingActionsWithApproval: FC<ZaloonenBookingType> = ({
  id,
  ...values
}) => {
  const { mutate: updateZaloonenBookingStatus } =
    useUpdateZaloonenBookingStatusAsAuthed({});

  return (
    <div className="flex justify-end">
      <ActionDialog
        classNameButton="text-success"
        description={
          <>
            {values.overlaps.length === 0 &&
              "Bokningen kolliderar inte med några andra bokningar"}
            {values.overlaps.length > 0 && (
              <>
                Bokningen kolliderar med följande bokningar:
                <ul>
                  {values.overlaps.map((overlap) => (
                    <li key={id + "_" + overlap.id + "_overlap_approved"}>
                      <strong>Event:</strong> {overlap.eventName} <br />
                      <strong>Ansvarig:</strong> {overlap.organizerName} <br />
                      <strong>Status:</strong> {overlap.bookingStatus} <br />
                      <strong>Tid:</strong>{" "}
                      {moment(overlap.startDateTime).format("D MMM HH:mm")} -{" "}
                      {moment(overlap.endDateTime).format("D MMM HH:mm")}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <br />
            <br />
            Ett bekräftelsemail kommer att skickas till{" "}
            <StyledLink href={`mailto:${values.organizerEmail}`}>
              {values.organizerName}
            </StyledLink>
          </>
        }
        onSubmit={() =>
          updateZaloonenBookingStatus({
            id,
            bookingStatus: ZaloonenBookingStatus.APPROVED,
          })
        }
        primaryButtonText="Godkänn"
        title={"Godkänn bokning - " + values.eventName}
        trigger={<ApproveTriggerButton />}
        variant="outline"
      />
      <ActionDialog
        description="Vill du verkligen neka denna bokningen?"
        onSubmit={() =>
          updateZaloonenBookingStatus({
            id,
            bookingStatus: ZaloonenBookingStatus.DENIED,
          })
        }
        primaryButtonText="Neka"
        title="Neka bokning"
        trigger={<DenyTriggerButton />}
      />
      <ZaloonenBookingActions id={id} {...values} />
    </div>
  );
};
