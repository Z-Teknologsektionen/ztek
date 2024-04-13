import { z } from "zod";
import { ZENITH_MEDIA_ACCEPTED_MEDIA_TYPES } from "~/constants/sftp";
import {
  base64WebPImageString,
  emptyString,
  httpsUrlString,
  nonEmptyString,
  objectId,
  sftpFile,
  validYearPastOrCurrent,
} from "~/schemas/helpers/custom-zod-helpers";

export const zenithMediaBaseSchema = z.object({
  title: nonEmptyString,
  year: validYearPastOrCurrent,
  coverImage: base64WebPImageString,
});

export const createZenithMediaClientSchema = zenithMediaBaseSchema.extend({
  media: z
    .object({
      url: httpsUrlString.or(emptyString).optional(),
      fileInput: sftpFile
        .refine((file) =>
          ZENITH_MEDIA_ACCEPTED_MEDIA_TYPES.includes(
            file.type as (typeof ZENITH_MEDIA_ACCEPTED_MEDIA_TYPES)[0],
          ),
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
    ),
});

export const createZenithMediaServerSchema = zenithMediaBaseSchema.extend({
  url: httpsUrlString,
});

export const updateZenithMediaServerSchema = zenithMediaBaseSchema
  .extend({ url: httpsUrlString })
  .partial()
  .extend({ id: objectId });
