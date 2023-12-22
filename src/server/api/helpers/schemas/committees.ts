import { z } from "zod";
import {
  base64WebPImageString,
  emailString,
  nonEmptyString,
  objectId,
  orderNumber,
} from "../customZodTypes";

export const upsertCommitteeBaseSchema = z.object({
  image: base64WebPImageString.optional(),
  description: z.string().min(1).max(100_000), // TODO: Lägg till en mer rimlig text bergränsing
});

export const updateCommitteeAsActiveSchema = upsertCommitteeBaseSchema
  .partial()
  .extend({ id: objectId });

export const createCommitteeSchema = upsertCommitteeBaseSchema.extend({
  name: nonEmptyString,
  slug: nonEmptyString,
  role: nonEmptyString,
  email: emailString,
  order: orderNumber,
  electionPeriod: z.number().min(1).max(4).optional().default(1),
});

export const updateCommitteeSchema = createCommitteeSchema
  .partial()
  .extend({ id: objectId });
