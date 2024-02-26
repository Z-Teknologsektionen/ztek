import { z } from "zod";
import {
  base64WebPImageString,
  emptyString,
  httpsUrlString,
  nonEmptyString,
  objectId,
  validYearPastOrCurrent,
} from "~/schemas/helpers/custom-zod-helpers";

//50 MB
const MAX_FILE_SIZE = 50 * 1000 * 1000;
const ACCEPTED_FILE_TYPES = ["image/*", "application/pdf"];

export const zenithMediaBaseSchema = z.object({
  title: nonEmptyString,
  url: httpsUrlString.or(emptyString).optional(),
  fileInput: z
    .custom<File[]>()
    // .refine((files) => files?.length == 1, "Obligatoriskt fält.")
    // .refine(
    //   (files) => files?.[0]?.size && files?.[0]?.size <= MAX_FILE_SIZE,
    //   `Filen får inte vara större än 50MB. Kontakta Webbgruppen om du behöver ladda upp större grejer.`,
    // )
    // .refine(
    //   (files) =>
    //     files?.[0]?.type && ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
    //   "Bara bilder och pdf-er är tillåtna.",
    // )
    .optional(),
  year: validYearPastOrCurrent,
  coverImage: base64WebPImageString,
});

export const createZenithMediaSchema = zenithMediaBaseSchema;
// .refine(
//   (val) => !!val.url === !val.fileInput,
//   {
//     message:
//       "Du måste antingen ange en url eller ladda upp en fil. Båda kan inte vara närvarande samtidigt.",
//     path: ["url", "fileInput"],
//   },
// );

export const updateZenithMediaSchema = zenithMediaBaseSchema
  .partial()
  .extend({ id: objectId });
