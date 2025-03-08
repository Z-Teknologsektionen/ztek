import { z } from "zod";
import {
  datetimeString,
  emptyString,
  httpsUrlString,
  objectId,
} from "./helpers/custom-zod-helpers";

const homePageCarucellBaseSchema = z.object({
  imageUrl: httpsUrlString,
  linkToUrl: httpsUrlString.or(emptyString.transform(() => null)).nullable(),
  committeeId: objectId,
  startDateTime: datetimeString.nullable(),
  endDateTime: datetimeString.nullable(),
});

export const createHomePageCarucellSchema = homePageCarucellBaseSchema;

export const updateHomePageCarucellSchema = createHomePageCarucellSchema
  .partial()
  .extend({ id: objectId });
