import { z } from "zod";
import {
  base64WebPImageOrEmptyString,
  emailString,
  emptyString,
  nonEmptyString,
  objectId,
  orderNumber,
  slugString,
} from "~/server/api/helpers/customZodTypes";

export const upsertCommitteeBaseSchema = z.object({
  image: base64WebPImageOrEmptyString,
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
      link: z
        .string()
        .trim()
        .startsWith("/")
        .or(
          z
            .string()
            .trim()
            .url("Måste vara en URL")
            .startsWith("https://", "Måste vara en säker https länk"),
        )
        .or(emptyString),
      linkText: z
        .string()
        .trim()
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
