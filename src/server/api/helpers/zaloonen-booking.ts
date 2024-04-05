import type { PrismaClient, ZaloonenBooking } from "@prisma/client";
import type {
  DefaultArgs,
  PrismaClientOptions,
} from "@prisma/client/runtime/library";
import { createHash } from "crypto";

export const generateZaloonenBookingHash = ({
  createdAt,
  id,
}: {
  createdAt: Date;
  id: string;
}): string =>
  createHash("sha256")
    .update(id + createdAt.toISOString())
    .digest("hex");

export const getDateConflictIds = async ({
  prisma,
  newBookingPrimaryEnd,
  newBookingPrimaryStart,
  newBookingSecondaryStart,
  newBookingSecondaryEnd,
}: {
  newBookingPrimaryEnd: Date;
  newBookingPrimaryStart: Date;
  newBookingSecondaryEnd: Date | null;
  newBookingSecondaryStart: Date | null;
  prisma: PrismaClient<PrismaClientOptions, never, DefaultArgs>;
}): Promise<{
  primaryDateConflictIds: string[];
  secondaryDateConflictIds: string[];
}> => {
  const allBookings = await prisma.zaloonenBooking.findMany({});

  const primaryDateConflictIds = allBookings
    .filter(
      ({
        primaryEndDateTime,
        secondaryEndDateTime,
        secondaryStartDateTime,
        primaryStartDateTime,
      }) =>
        checkIfDatesOverlap(
          primaryStartDateTime,
          primaryEndDateTime,
          newBookingPrimaryStart,
          newBookingPrimaryEnd,
        ) &&
        checkIfDatesOverlap(
          secondaryStartDateTime,
          secondaryEndDateTime,
          newBookingPrimaryStart,
          newBookingPrimaryEnd,
        ),
    )
    .map(({ id }) => id);

  const secondaryDateConflictIds = allBookings
    .filter(
      ({
        primaryEndDateTime,
        secondaryEndDateTime,
        secondaryStartDateTime,
        primaryStartDateTime,
      }) =>
        checkIfDatesOverlap(
          primaryStartDateTime,
          primaryEndDateTime,
          newBookingSecondaryStart,
          newBookingSecondaryEnd,
        ) &&
        checkIfDatesOverlap(
          secondaryStartDateTime,
          secondaryEndDateTime,
          newBookingSecondaryStart,
          newBookingSecondaryEnd,
        ),
    )
    .map(({ id }) => id);

  return { secondaryDateConflictIds, primaryDateConflictIds };
};

export const checkIfDatesOverlap = (
  startA: Date | null,
  endA: Date | null,
  startB: Date | null,
  endB: Date | null,
): boolean =>
  startA !== null &&
  endA !== null &&
  startB !== null &&
  endB !== null &&
  startA <= endB &&
  endA >= startB;

export const validateZaloonenBookingHash = async ({
  prisma,
  id,
  hash,
}: {
  hash: string | undefined;
  id: string | undefined;
  prisma: PrismaClient<PrismaClientOptions, never, DefaultArgs>;
}): Promise<ZaloonenBooking> => {
  const zaloonenBooking = await prisma.zaloonenBooking
    .findUniqueOrThrow({
      where: { id },
    })
    .catch(() => {
      throw new Error(
        "Kunde inte hitta din bokning, försök igen senare eller kontakta ZÅG",
      );
    });

  if (zaloonenBooking.bookingStatus !== "INITIAL")
    throw new Error(
      "Bokningen har börjat behandlas av ZÅG. Kontakta ZÅG om du vill göra något med bokningen",
    );

  const generatedHash = generateZaloonenBookingHash({
    id: zaloonenBooking.id,
    createdAt: zaloonenBooking.createdAt,
  });

  //TODO: Ta bort när mail skickas så man kan komma åt detta.
  console.log({ generatedHash });
  if (hash !== generatedHash)
    throw new Error(
      "Ogiltig hash, kolla ditt senaste mail och klicka på länken där",
    );

  return zaloonenBooking;
};
