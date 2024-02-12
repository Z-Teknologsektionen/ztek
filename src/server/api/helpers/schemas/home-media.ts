import { z } from "zod";
import {
  datetimeString,
  emptyString,
  httpsUrlString,
  nonEmptyString,
  objectId,
  orderNumber,
  standardBoolean,
} from "~/server/api/helpers/customZodTypes";

export const createHomeMediaSchema = z.object({
  title: nonEmptyString,
  description: nonEmptyString,
  photographer: nonEmptyString.or(emptyString),
  url: httpsUrlString.or(emptyString),
  imageurl: httpsUrlString,
  isTimeLimited: standardBoolean.or(emptyString),
  startDate: datetimeString,
  endDate: datetimeString.or(emptyString),
  order: orderNumber,
});

export const updateHomeMediaSchema = createHomeMediaSchema
  .partial()
  .extend({ id: objectId });
