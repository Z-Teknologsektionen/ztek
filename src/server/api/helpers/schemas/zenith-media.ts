import { z } from "zod";
import {
  base64WebPImageString,
  httpsUrlString,
  nonEmptyString,
  objectId,
  standardBoolean,
  validYearPastOrCurrent,
} from "~/server/api/helpers/customZodTypes";

export const createZenithMediaSchema = z.object({
  title: nonEmptyString,
  url: httpsUrlString,
  isPDF: standardBoolean,
  year: validYearPastOrCurrent,
  image: base64WebPImageString,
});

export const updateZenithMediaSchema = createZenithMediaSchema
  .partial()
  .extend({ id: objectId });
