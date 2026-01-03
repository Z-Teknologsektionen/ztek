import { z } from "zod";
import {
  emptyString,
  httpsUrlString,
  objectId,
} from "./helpers/common-zod-helpers";
import { sftpFile, sftpUrl } from "./helpers/sftp-zod-helpers";
import {
  dateTimeIntervalCheck,
  dateTimeIntervalError,
  datetimeString,
} from "./helpers/time-zod-helpers";

const homePageCarouselBaseSchema = z.object({
  imageCredit: z
    .string()
    .or(emptyString.transform(() => null))
    .nullable(),
  imageUrl: sftpUrl.or(emptyString),
  linkToUrl: httpsUrlString.or(emptyString.transform(() => null)).nullable(),
  committeeId: objectId,
  startDateTime: datetimeString.nullable(),
  endDateTime: datetimeString.nullable(),
  imageFile: sftpFile.optional().nullable(),
});

export const createHomePageCarouselSchema = homePageCarouselBaseSchema
  .refine(({ imageUrl, imageFile }) => imageUrl !== "" || imageFile, {
    // imageUrl OR imageFile is required
    message: "En bild måste anges",
    path: ["imageFile"],
  })
  .refine(dateTimeIntervalCheck, dateTimeIntervalError);

export const updateHomePageCarouselSchema = homePageCarouselBaseSchema
  .partial()
  .extend({ id: objectId })
  .refine(({ imageUrl, imageFile }) => imageUrl !== "" || imageFile, {
    // imageUrl OR imageFile is required
    message: "Bild saknas",
    path: ["imageFile"],
  })
  .refine(dateTimeIntervalCheck, dateTimeIntervalError);
