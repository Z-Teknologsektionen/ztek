import { z } from "zod";
import {
  httpsUrlString,
  nonEmptyString,
  objectId,
  orderNumber,
} from "~/schemas/helpers/custom-zod-helpers";

export const upsertHomepageCarouselBaseSchema = z.object({
  title: nonEmptyString,
  url: httpsUrlString.regex(
    /\.(jpg|jpeg|png|gif)$/i,
    "Måste vara en https url till en bild.",
  ),
  startDate: z.coerce.date().min(new Date()),
  endDate: z.coerce.date().optional(),
  order: orderNumber,
  createdById: objectId,
});

export const updateHomepageCarouselAsActiveSchema =
  upsertHomepageCarouselBaseSchema
    .partial()
    .extend({ id: objectId })
    .refine(
      (data) => {
        if (!data.endDate) return true;
        //TODO: Fix this
        //Ugly fix. Ask Dennis for help.
        if (!data.startDate) return true;
        return data.endDate > data.startDate;
      },
      {
        // Custom error message
        message: "Slutdatum måste vara senare än startdatum.",
        path: ["endDate"], // field that the error is attached to
      },
    );

export const createHomepageCarouselSchema =
  upsertHomepageCarouselBaseSchema.refine(
    (data) => {
      if (!data.endDate) return true;
      return data.endDate > data.startDate;
    },
    {
      message: "slutdatum måste vara senare än startdatum.",
      path: ["endDate"],
    },
  );
