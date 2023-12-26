import { z } from "zod";
import {
  base64WebPImageString,
  nonEmptyString,
  objectId,
} from "../customZodTypes";

export const createZenithDocumentSchema = z.object({
  title: nonEmptyString,
  url: z.string().url(),
  isPDF: z.boolean(),
  year: z
    .number()
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

export const updateZenithDocumentSchema = createZenithDocumentSchema
  .partial()
  .extend({ id: objectId });
