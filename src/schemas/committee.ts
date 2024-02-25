import { CommitteeType, IconEnum } from "@prisma/client";
import { z } from "zod";
import {
  MAX_DESCRIPTION_TEXT_LENGTH,
  MAX_ELECTION_PERIOD,
  MAX_NUMER_OF_SOCIAL_LINKS,
  MIN_ELECTION_PERIOD,
} from "~/constants/committees";
import {
  base64WebPImageString,
  emailString,
  emptyString,
  httpsUrlString,
  nonEmptyString,
  objectId,
  orderNumber,
  relativePathString,
  slugString,
  standardNumber,
  standardString,
} from "~/schemas/helpers/custom-zod-helpers";

export const upsertCommitteeBaseSchema = z.object({
  image: base64WebPImageString.or(emptyString),
  description: standardString
    .min(1, "Måste vara minst 1 tecken")
    .max(
      MAX_DESCRIPTION_TEXT_LENGTH,
      `Får inte vara mer än ${MAX_DESCRIPTION_TEXT_LENGTH.toString()} tecken`,
    ),
});

export const socialIconSchema = z.object({
  order: orderNumber,
  iconAndUrl: z
    .object({
      url: standardString,
      iconVariant: z.nativeEnum(IconEnum, {
        invalid_type_error: "Måste vara ett värde som finns i IconEnum",
        required_error: "Obligatoriskt fält",
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
    ),
});

export const upsertCommitteeSocialLinksBaseSchema = z.object({
  socialLinks: z.array(socialIconSchema).max(MAX_NUMER_OF_SOCIAL_LINKS),
});

export const updateCommitteeAsActiveSchema = upsertCommitteeBaseSchema
  .merge(upsertCommitteeSocialLinksBaseSchema)
  .partial()
  .extend({ id: objectId });

export const createCommitteeSchema = upsertCommitteeBaseSchema
  .extend({
    documentId: objectId.nullable(),
    name: nonEmptyString,
    committeeType: z.nativeEnum(CommitteeType, {
      //Dessa två rader borde användas med bug hos zod gör att det inte funkar
      // https://github.com/colinhacks/zod/issues/3146
      // required_error: "Vänligen välj vilket typ av organ det är",
      // invalid_type_error: "Otilllåten typ, ladda om sidan och försök igen",
      errorMap: () => ({
        message: "Vänligen välj vilket typ av organ det är",
      }),
    }),
    slug: slugString,
    role: nonEmptyString,
    email: emailString,
    order: orderNumber,
    electionPeriod: standardNumber
      .min(
        MIN_ELECTION_PERIOD,
        `Måste vara ett nummer mellan ${MIN_ELECTION_PERIOD} och ${MAX_ELECTION_PERIOD}`,
      )
      .max(
        MAX_ELECTION_PERIOD,
        `Måste vara ett nummer mellan ${MIN_ELECTION_PERIOD} och ${MAX_ELECTION_PERIOD}`,
      ),
  })
  .merge(upsertCommitteeSocialLinksBaseSchema);

export const updateCommitteeSchema = createCommitteeSchema
  .partial()
  .extend({ id: objectId });
