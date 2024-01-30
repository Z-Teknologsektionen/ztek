import { z } from "zod";
import {
  base64WebPImageString,
  httpsUrlString,
  nonEmptyString,
  objectId,
  standardBoolean,
  standardNumber,
} from "~/server/api/helpers/customZodTypes";

export const createZenithMediaSchema = z.object({
  title: nonEmptyString,
  url: httpsUrlString,
  isPDF: standardBoolean,
  year: standardNumber
    .min(
      2000,
      "Årtalet behöver vara före 2000, om det behöver läggas in från ett tidigare år behöver du kontakta webbgruppen",
    )
    .max(9999, "Årtalet måste vara ett 4 siffrigt tal")
    .refine(
      (val) => val <= new Date().getFullYear(),
      "Årtalet får inte vara ett framtida årtal",
    ),
  image: base64WebPImageString,
});

export const updateZenithMediaSchema = createZenithMediaSchema
  .partial()
  .extend({ id: objectId });
