import { z } from "zod";
import {
  base64WebPImageString,
  emptyString,
  httpsUrlString,
  nonEmptyString,
  objectId,
  validYearPastOrCurrent,
} from "~/schemas/helpers/custom-zod-helpers";

//200 MB
const MAX_MB_SIZE = 200;
const MAX_FILE_SIZE = MAX_MB_SIZE * 1000 * 1000;
export const ACCEPTED_MEDIA_TYPES = ["image/*", "application/pdf"];

export const zenithMediaBaseSchema = z.object({
  title: nonEmptyString,
  year: validYearPastOrCurrent,
  coverImage: base64WebPImageString,
});

export const createZenithMediaClientSchema = zenithMediaBaseSchema.extend({
  input: z
    .object({
      url: httpsUrlString.or(emptyString).optional(),
      fileInput: z
        .custom<File[]>()
        .refine((files) => files?.length == 1, "Obligatoriskt fält.")
        .refine(
          (files) => files?.[0]?.size && files?.[0]?.size <= MAX_FILE_SIZE,
          `Filen får inte vara större än ${MAX_MB_SIZE}MB. Kontakta Webbgruppen om du behöver ladda upp större grejer.`,
        )
        .refine(
          (files) =>
            files?.[0]?.type && ACCEPTED_MEDIA_TYPES.includes(files?.[0]?.type),
          "Bara bilder och pdf-er är tillåtna.",
        )
        .optional(),
    })
    .refine(
      (input) => {
        //Check if both url and fileInput are present or both are missing
        return !!input.url !== !!input.fileInput;
      },
      {
        message:
          "Du måste antingen ladda upp en fil eller länka till en url. Du kan inte skriva in båda. Url:en kommer sättas automagiskt om du laddar upp en fil.",
        path: ["fileInput"],
      },
    )
    .refine(
      (input) => {
        //Check if both url and fileInput are present or both are missing
        return !!input.url !== !!input.fileInput;
      },
      {
        message:
          "Du måste antingen ladda upp en fil eller länka till en url. Du kan inte skriva in båda. Url:en kommer sättas automagiskt om du laddar upp en fil.",
        path: ["url"],
      },
    ),
});

export const createZenithMediaServerSchema = zenithMediaBaseSchema.extend({
  url: httpsUrlString,
});

export const updateZenithMediaSchema = zenithMediaBaseSchema
  .extend({ url: httpsUrlString })
  .partial()
  .extend({ id: objectId });
