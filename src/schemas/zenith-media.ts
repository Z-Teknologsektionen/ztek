import { z } from "zod";
import { ZENITH_MEDIA_ACCEPTED_MEDIA_TYPES } from "~/constants/sftp";
import {
  base64WebPImageString,
  emptyString,
  httpsUrlString,
  mediaOrderNumber,
  nonEmptyString,
  objectId,
  sftpFile,
  validYearPastOrCurrent,
} from "~/schemas/helpers/custom-zod-helpers";

export const zenithMediaBaseSchema = z.object({
  title: nonEmptyString,
  year: validYearPastOrCurrent,
  order: mediaOrderNumber.nullable(),
  coverImage: base64WebPImageString.or(emptyString).or(httpsUrlString),
  coverImageFile: sftpFile.optional().nullable(),
});

export const createZenithMediaClientSchema = zenithMediaBaseSchema.extend({
  media: z
    .object({
      url: httpsUrlString.or(emptyString).optional(),
      file: sftpFile
        .refine((file) =>
          ZENITH_MEDIA_ACCEPTED_MEDIA_TYPES.includes(
            file.type as (typeof ZENITH_MEDIA_ACCEPTED_MEDIA_TYPES)[0],
          ),
        )
        .optional(),
    })
    .superRefine(({ file, url }, ctx) => {
      if (!url && !file) {
        // Vi vill ge errors på båda flikarna samtidigt då vi inte vet vilken användaren är på!
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Du måste antingen ladda upp en fil eller länka till en url.",
          path: ["file"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Du måste antingen ladda upp en fil eller länka till en url.",
          path: ["url"],
        });
      }

      return z.NEVER;
    }),
});

export const createZenithMediaServerSchema = zenithMediaBaseSchema.extend({
  url: httpsUrlString,
});

export const updateZenithMediaServerSchema = createZenithMediaServerSchema
  .partial()
  .extend({ id: objectId });
