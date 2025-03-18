import { z } from "zod";
import {
  datetimeString,
  emptyString,
  httpsUrlString,
  objectId,
} from "./helpers/custom-zod-helpers";

const homePageCarouselBaseSchema = z.object({
  imageUrl: httpsUrlString,
  linkToUrl: httpsUrlString.or(emptyString.transform(() => null)).nullable(),
  committeeId: objectId,
  startDateTime: datetimeString.nullable(),
  endDateTime: datetimeString.nullable(),
});

export const createHomePageCarouselSchema = homePageCarouselBaseSchema;

export const updateHomePageCarouselSchema = createHomePageCarouselSchema
  .partial()
  .extend({ id: objectId });
