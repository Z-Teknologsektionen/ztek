import {
  ZaloonenBookingEventTypes,
  ZaloonenBookingStatus,
  ZaloonenBookingTypes,
} from "@prisma/client";
import { z } from "zod";
import {
  emailString,
  futureDate,
  futureDateTimeString,
  nonEmptyString,
  objectId,
  phoneNumberString,
  standardBoolean,
  standardString,
} from "./helpers/custom-zod-helpers";

const partyNoticeSchema = z.object({
  partyManagerName: nonEmptyString.refine(
    (fullname) => fullname.split(" ").length >= 2,
    "Ange både för och efternamn",
  ),
  partyManagerEmail: emailString,
  partyManagerPhone: phoneNumberString,
  hasServingPermit: standardBoolean,
});

export const sendPartNoticeSchema = z
  .object({
    organizerName: nonEmptyString,
    eventName: nonEmptyString,
    startDate: futureDate,
    endDate: futureDate,
  })
  .merge(partyNoticeSchema);

export const createZaloonenBookingSchema = z
  .object({
    organizerName: nonEmptyString,
    organizerEmail: emailString,
    eventName: nonEmptyString,
    eventType: z.nativeEnum(ZaloonenBookingEventTypes, {
      errorMap: () => ({ message: "Vänligen välj typ av arrangemang" }),
    }),
    eventDescription: nonEmptyString,
    bookingType: z.nativeEnum(ZaloonenBookingTypes, {
      errorMap: () => ({ message: "Vänligen välj bokningstyp" }),
    }),
    primaryDate: z
      .object({
        startDate: futureDateTimeString,
        endDate: futureDateTimeString,
      })
      .refine(
        ({ endDate, startDate }) => new Date(endDate) > new Date(startDate),
        {
          path: ["endDate"],
          message: "Slutdatum måste vara efter startdatum",
        },
      ),
    saveInformation: z.literal(true, {
      errorMap: () => ({ message: "Vänligen acceptera villkoren" }),
    }),
    bookEvenIfColision: standardBoolean.optional().default(false),
    hash: standardString.optional(),
  })
  .merge(partyNoticeSchema);

export const zaloonenBookingHashSchema = z.object({
  id: objectId.optional(),
  hash: standardString.optional(),
});

export const updateZaloonenBookingSchema = createZaloonenBookingSchema.extend({
  id: objectId,
});

export const upsertZaloonenBookingSchema = createZaloonenBookingSchema.merge(
  zaloonenBookingHashSchema,
);

export const updateBookingStatusAsAuthed = z.object({
  id: objectId,
  bookingStatus: z.nativeEnum(ZaloonenBookingStatus),
});

export const updateBookingInspectorAsAuthed = z.object({
  id: objectId,
  bookingInspectorId: objectId.optional(),
});
