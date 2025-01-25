import { z } from "zod";
import {
  datetimeString,
  httpsUrlString,
  objectId,
} from "./helpers/custom-zod-helpers";

const homePageCarucellBaseSchema = z.object({
  imageUrl: httpsUrlString,
  linkToUrl: httpsUrlString.nullable(),
  committeeId: objectId,
  startDateTime: datetimeString.nullable(),
  endDateTime: datetimeString.nullable(),
});

export const createHomePageCarucellSchema = homePageCarucellBaseSchema;

export const updateHomePageCarucellSchema = createHomePageCarucellSchema
  .partial()
  .extend({ id: objectId });
