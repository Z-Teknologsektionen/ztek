import { z } from "zod";
import { ZENITH_MEDIA_ACCEPTED_MEDIA_TYPES } from "~/constants/sftp";
import {
  base64WebPImageString,
  emptyString,
  httpsUrlString,
  mediaOrderNumber,
  nonEmptyString,
  objectId,
  standardString,
} from "~/schemas/helpers/common-zod-helpers";
import { sftpFile, sftpUrl } from "./helpers/sftp-zod-helpers";
import {
  dateTimeIntervalCheck,
  dateTimeIntervalError,
  validYearPastOrCurrent,
} from "./helpers/time-zod-helpers";

export const zenithMediaBaseSchema = z.object({
  title: nonEmptyString,
  year: validYearPastOrCurrent,
  order: mediaOrderNumber.nullable(),
  coverImage: base64WebPImageString.or(emptyString).or(sftpUrl), //base64 may be removed at some point in the future
  coverImageFile: sftpFile.optional().nullable(),

  endDateTime: standardString.nullable(),
  startDateTime: standardString.nullable(),
});

export const createZenithMediaClientSchema = zenithMediaBaseSchema
  .extend({
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
  })
  .refine(dateTimeIntervalCheck, dateTimeIntervalError);

export const createZenithMediaServerSchema = zenithMediaBaseSchema
  .extend({
    url: httpsUrlString,
  })
  .refine(dateTimeIntervalCheck, dateTimeIntervalError);

export const updateZenithMediaServerSchema = zenithMediaBaseSchema
  .extend({
    url: httpsUrlString,
  })
  .partial()
  .extend({ id: objectId })
  .refine(dateTimeIntervalCheck, dateTimeIntervalError);
