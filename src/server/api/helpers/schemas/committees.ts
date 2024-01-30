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
  standardString,
} from "~/server/api/helpers/customZodTypes";

export const upsertCommitteeBaseSchema = z.object({
  image: base64WebPImageString.or(emptyString),
  description: z.string().min(1).max(100_000), // TODO: Lägg till en mer rimlig text bergränsing
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
  electionPeriod: z.number().min(1).max(4).optional().default(1),
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
