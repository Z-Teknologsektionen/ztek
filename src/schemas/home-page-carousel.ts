import { z } from "zod";
import {
  datetimeString,
  emptyString,
  httpsUrlString,
  objectId,
} from "./helpers/custom-zod-helpers";

const endDateAfterStartDate = ({
  endDateTime,
  startDateTime,
}: {
  endDateTime?: string | null;
  startDateTime?: string | null;
}): boolean => {
  if (startDateTime && endDateTime) {
    return new Date(endDateTime) > new Date(startDateTime);
  }

  return true;
};

const homePageCarouselBaseSchema = z.object({
  imageCredit: z
    .string()
    .or(emptyString.transform(() => null))
    .nullable(),
  imageUrl: httpsUrlString,
  linkToUrl: httpsUrlString.or(emptyString.transform(() => null)).nullable(),
  committeeId: objectId,
  startDateTime: datetimeString.nullable(),
  endDateTime: datetimeString.nullable(),
});

export const createHomePageCarouselSchema = homePageCarouselBaseSchema.refine(
  endDateAfterStartDate,
  {
    message: "Slutdatum måste vara efter startdatum",
    path: ["endDateTime"],
  },
);

export const updateHomePageCarouselSchema = homePageCarouselBaseSchema
  .partial()
  .extend({ id: objectId })
  .refine(endDateAfterStartDate, {
    message: "Slutdatum måste vara efter startdatum",
    path: ["endDateTime"],
  });
