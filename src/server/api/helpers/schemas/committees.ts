import { z } from "zod";
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

export const updateCommitteeAsActiveSchema = upsertCommitteeBaseSchema
  .partial()
  .extend({ id: objectId });

export const createCommitteeSchema = upsertCommitteeBaseSchema.extend({
  name: nonEmptyString,
  slug: slugString,
  role: nonEmptyString,
  email: emailString,
  order: orderNumber,
  electionPeriod: standardNumber
    .min(1, "Måste vara ett nummer mellan 1 och 4")
    .max(4, "Måste vara ett nummer mellan 1 och 4"),
  linkObject: z
    .object({
      link: relativePathString.or(httpsUrlString).or(emptyString),
      linkText: standardString
        .min(3, "Länktexten måste vara minst 3 tecken lång")
        .or(emptyString),
    })
    .refine(({ link, linkText }) => (linkText !== "") === (link !== ""), {
      message: "Du måste definera både länken och länktexten eler ingen av dem",
      path: ["linkText"],
    }),
});

export const updateCommitteeSchema = createCommitteeSchema
  .partial()
  .extend({ id: objectId });
