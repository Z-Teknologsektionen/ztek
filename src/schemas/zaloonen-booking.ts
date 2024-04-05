import {
  ZaloonenBookingEventTypes,
  ZaloonenBookingTypes,
} from "@prisma/client";
import { z } from "zod";
import { authedZaloonenBookingUpdates } from "~/constants/zaloonen-booking";
import {
  emailString,
  emptyStringToNull,
  futureDate,
  futureDateTimeString,
  nonEmptyString,
  objectId,
  phoneNumberString,
  standardBoolean,
  standardString,
  undefinedToNull,
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
    dates: z
      .object({
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
        secondaryDate: z
          .object({
            startDate: futureDateTimeString
              .nullable()
              .or(emptyStringToNull)
              .or(undefinedToNull),
            endDate: futureDateTimeString
              .nullable()
              .or(emptyStringToNull)
              .or(undefinedToNull),
          })
          .refine(
            ({ endDate, startDate }) => {
              if (startDate === null || endDate === null)
                return startDate === endDate;

              return new Date(endDate) > new Date(startDate);
            },
            {
              path: ["endDate"],
              message: "Slutdatum måste vara efter startdatum",
            },
          ),
      })
      .refine(
        ({ primaryDate, secondaryDate }) => {
          if (!secondaryDate || !secondaryDate.startDate) return true;

          const primaryStartDate = new Date(
            primaryDate.startDate,
          ).toDateString();
          const secondaryStartDate = new Date(
            secondaryDate.startDate,
          ).toDateString();

          return primaryStartDate !== secondaryStartDate;
        },
        {
          message:
            "Andra datums start dag måste vara på en annan dag än första datums start dag. Vill du enbart ha ett datum kan du lämna andra datummet tomt",
          path: ["secondaryDate.startDate"],
        },
      )
      .refine(
        ({ primaryDate, secondaryDate }) => {
          if (!secondaryDate || !secondaryDate.endDate) return true;

          const primaryEndDate = new Date(primaryDate.endDate).toDateString();
          const secondaryEndDate = new Date(
            secondaryDate.endDate,
          ).toDateString();

          return primaryEndDate !== secondaryEndDate;
        },
        {
          message:
            "Andra datums slut dag måste vara på en annan dag än första datum slut dag. Vill du enbart ha ett datum kan du lämna andra datummet tomt",
          path: ["secondaryDate.endDate"],
        },
      ),
    saveInformation: z.literal(true, {
      errorMap: () => ({ message: "Vänligen godkän villkoren" }),
    }),
    bookEvenIfColision: standardBoolean.optional().default(false),
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

export const updateBookingAsAuthed = z.object({
  id: objectId,
  bookingStatus: z.enum(authedZaloonenBookingUpdates),
});
