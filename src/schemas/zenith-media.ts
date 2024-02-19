import { z } from "zod";
import {
  base64WebPImageString,
  emptyString,
  httpsUrlString,
  nonEmptyString,
  objectId,
  validYearPastOrCurrent,
} from "~/schemas/helpers/custom-zod-helpers";

export const zenithMediaBaseSchema = z.object({
  title: nonEmptyString,
  url: httpsUrlString.or(emptyString).optional(),
  fileInput: z.string().optional(),
  year: validYearPastOrCurrent,
  coverImage: base64WebPImageString,
});

export const createZenithMediaSchema = zenithMediaBaseSchema.refine(
  (val) => !!val.url === !val.fileInput,
  {
    message:
      "Du måste antingen ange en url eller ladda upp en fil. Båda kan inte vara närvarande samtidigt.",
    path: ["url", "fileInput"],
  },
);

export const updateZenithMediaSchema = zenithMediaBaseSchema
  .partial()
  .extend({ id: objectId });
