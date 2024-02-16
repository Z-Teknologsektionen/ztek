import { z } from "zod";
import {
  base64WebPImageString,
  httpsUrlString,
  nonEmptyString,
  objectId,
  standardBoolean,
  validYearPastOrCurrent,
} from "~/server/api/helpers/custom-zod-helpers";

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
