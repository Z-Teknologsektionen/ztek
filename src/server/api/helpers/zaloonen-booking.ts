import {
  ZaloonenBookingStatus,
  type PrismaClient,
  type ZaloonenBooking,
} from "@prisma/client";
import type {
  DefaultArgs,
  PrismaClientOptions,
} from "@prisma/client/runtime/library";
import { createHash } from "crypto";

export const generateZaloonenBookingHash = ({
  id,
  createdAt,
}: {
  createdAt: Date;
  id: string;
}): string =>
  createHash("sha256")
    .update(id + process.env.HASH_SALT + createdAt.toISOString())
    .digest("hex");

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

  if (zaloonenBooking.bookingStatus !== ZaloonenBookingStatus.REQUESTED)
    throw new Error(
      "Bokningen har börjat behandlas av ZÅG. Kontakta ZÅG om du vill göra något med bokningen",
    );

  const generatedHash = generateZaloonenBookingHash({
    id: zaloonenBooking.id,
    createdAt: zaloonenBooking.createdAt,
  });

  //TODO: Ta bort när mail skickas så man kan komma åt detta.

  // console.log({ generatedHash });
  // console.log("++++++++++++++++++++++++++++++++++++++++++");
  if (hash !== generatedHash)
    throw new Error(
      "Ogiltig hash, kolla ditt senaste mail och klicka på länken där",
    );

  return zaloonenBooking;
};
