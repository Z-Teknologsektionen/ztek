import { CommitteeType, IconEnum } from "@prisma/client";
import { z } from "zod";
import { MAX_NUMER_OF_SOCIAL_LINKS } from "~/constants/committees";
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
} from "~/server/api/helpers/customZodTypes";

export const upsertCommitteeBaseSchema = z.object({
  image: base64WebPImageString.or(emptyString),
  description: standardString
    .min(1, "Måste vara minst 1 tecken")
    .max(1_000, "Får inte vara mer än 1 000 tecken"),
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
  .partial()
  .extend({ id: objectId });

export const createCommitteeSchema = upsertCommitteeBaseSchema
  .extend({
    name: nonEmptyString,
    committeeType: z.nativeEnum(CommitteeType),
    slug: slugString,
    role: nonEmptyString,
    email: emailString,
    order: orderNumber,
    electionPeriod: standardNumber
      .min(1, "Måste vara ett nummer mellan 1 och 4")
      .max(4, "Måste vara ett nummer mellan 1 och 4"),
  })
  .merge(upsertCommitteeSocialLinksBaseSchema);

export const updateCommitteeSchema = createCommitteeSchema
  .partial()
  .extend({ id: objectId });
