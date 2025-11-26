import { CommitteeType, IconEnum } from "@prisma/client";
import { z } from "zod";
import {
  MAX_DESCRIPTION_TEXT_LENGTH,
  MAX_ELECTION_PERIOD,
  MAX_NUMER_OF_SOCIAL_LINKS,
} from "~/constants/committees";
import {
  base64WebPImageString,
  committeeOrderNumber,
  electionPeriod,
  emailString,
  emptyString,
  httpsUrlString,
  nonEmptyString,
  objectId,
  relativePathString,
  slugString,
  standardBoolean,
  standardString,
} from "~/schemas/helpers/common-zod-helpers";
import { sftpFile, sftpUrl } from "./helpers/sftp-zod-helpers";

export const socialIconSchema = z
  .object({
    linkText: standardString
      .nullable()
      .transform((str) => (str !== "" ? str : null)),
    url: standardString,
    iconVariant: z.nativeEnum(IconEnum, {
      // https://github.com/colinhacks/zod/issues/3146
      errorMap: () => ({ message: "Vänligen välj en ikon" }),
    }),
  })
  .refine(
    ({ iconVariant, url }) => {
      switch (iconVariant) {
        case "MAIL":
          return emailString.safeParse(url).success;
        case "LINK":
          return relativePathString.or(httpsUrlString).safeParse(url).success;
        default:
          // Om inte ett special fall kräv en https länk
          return httpsUrlString.safeParse(url).success;
      }
    },
    ({ iconVariant }) => {
      let message = "";
      switch (iconVariant) {
        case "MAIL":
          message = "Måste vara en epostadress";
          break;
        case "LINK":
          message = `Måste vara en https länk eller börja på med /`;
          break;
        default:
          // Om inte ett special fall kräv en https länk
          message = "Måste vara en https länk";
      }
      return {
        path: ["url"],
        message: message,
      };
    },
  );

export const upsertCommitteeBaseSchema = z.object({
  //Backwards compatibility for base64, but we should only use urls in the future
  image: base64WebPImageString.or(emptyString).or(sftpUrl),
  description: standardString
    .min(1, "Måste vara minst 1 tecken")
    .max(
      MAX_DESCRIPTION_TEXT_LENGTH,
      `Får inte vara mer än ${MAX_DESCRIPTION_TEXT_LENGTH.toString()} tecken`,
    ),
  socialLinks: z.array(socialIconSchema).max(MAX_NUMER_OF_SOCIAL_LINKS),
  showOldCommittee: standardBoolean,
  imageFile: sftpFile.optional().nullable(),
});

export const updateCommitteeAsActiveSchema = upsertCommitteeBaseSchema
  .partial()
  .extend({ id: objectId });

export const createCommitteeSchema = upsertCommitteeBaseSchema.extend({
  documentId: objectId.or(emptyString.nullable().transform(() => null)),
  name: nonEmptyString,
  committeeType: z.nativeEnum(CommitteeType, {
    //Dessa två rader borde användas med bug hos zod gör att det inte funkar
    // https://github.com/colinhacks/zod/issues/3146
    // required_error: "Vänligen välj vilket typ av organ det är",
    // invalid_type_error: "Otillåten typ, ladda om sidan och försök igen",
    errorMap: () => ({
      message: "Vänligen välj vilket typ av organ det är",
    }),
  }),
  slug: slugString,
  role: nonEmptyString,
  email: emailString,
  order: committeeOrderNumber,
  electionPeriods: electionPeriod
    .array()
    .min(0)
    .max(MAX_ELECTION_PERIOD)
    .transform((arr) => arr.sort((a, b) => a - b)),
});

export const updateCommitteeSchema = createCommitteeSchema
  .partial()
  .extend({ id: objectId });
