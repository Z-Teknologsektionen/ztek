import { z } from "zod";
import { objectId } from "../customZodTypes";
const today = new Date();
today.setHours(0, 0, 0, 0);
export const zaloonenBookingSchema = z.object({
  eventName: z.string().min(2, {
    message: "Du måste specificera ett namn på eventet.",
  }),
  eventDescription: z.string().min(2, {
    message: "Du måste specificera en beskrivning på eventet.",
  }),
  organizerName: z.string().min(2, {
    message: "Du måste specificera ett namn på arrangören.",
  }),
  organizerEmail: z.string().email({
    message: "Du måste specificera en giltig email.",
  }),
  organizerPhone: z.string().min(2, {
    message: "Du måste specificera ett telefonnummer.",
  }),
  inChargeName: z.string().min(2, {
    message: "Du måste specificera ett namn på festansvarig.",
  }),
  inChargeEmail: z.string().email({
    message: "Du måste specificera en giltig email.",
  }),
  inChargePhone: z.string().min(2, {
    message: "Du måste specificera ett telefonnummer.",
  }),
  primaryStartDate: z.date().min(today, {
    message: "Du kan inte boka en dag som redan har varit.",
  }),
  primaryEndDate: z.date().min(today, {
    message: "Du kan inte boka en dag som redan har varit.",
  }),
  secondaryStartDate: z.date().min(today, {
    message: "Du kan inte boka en dag som redan har varit.",
  }),
  secondaryEndDate: z.date().min(today, {
    message: "Du kan inte boka en dag som redan har varit.",
  }),
  hasServingPermit: z.boolean().default(false),
});

export const createZaloonenBookingSchema = zaloonenBookingSchema
  .refine(
    (data) =>
      data.secondaryEndDate > data.secondaryStartDate ||
      (data.secondaryEndDate.getDate() === data.secondaryStartDate.getDate() &&
        data.secondaryEndDate.getHours() > data.secondaryStartDate.getHours()),
    {
      message: "Slutdatum och tid måste vara efter startdatum och tid.",
      path: ["secondaryEndDate"],
    },
  )
  .refine(
    (data) =>
      data.primaryEndDate > data.primaryStartDate ||
      (data.primaryEndDate.getDate() === data.primaryStartDate.getDate() &&
        data.primaryEndDate.getHours() > data.primaryStartDate.getHours()),
    {
      message: "Slutdatum och tid måste vara efter startdatum och tid.",
      path: ["primaryEndDate"],
    },
  );

export const updateZaloonenBookingSchema = zaloonenBookingSchema
  .extend({
    id: objectId,
  })
  .refine(
    (data) =>
      data.secondaryEndDate > data.secondaryStartDate ||
      (data.secondaryEndDate.getDate() === data.secondaryStartDate.getDate() &&
        data.secondaryEndDate.getHours() > data.secondaryStartDate.getHours()),
    {
      message: "Slutdatum och tid måste vara efter startdatum och tid.",
      path: ["secondaryEndDate"],
    },
  )
  .refine(
    (data) =>
      data.primaryEndDate > data.primaryStartDate ||
      (data.primaryEndDate.getDate() === data.primaryStartDate.getDate() &&
        data.primaryEndDate.getHours() > data.primaryStartDate.getHours()),
    {
      message: "Slutdatum och tid måste vara efter startdatum och tid.",
      path: ["primaryEndDate"],
    },
  );
