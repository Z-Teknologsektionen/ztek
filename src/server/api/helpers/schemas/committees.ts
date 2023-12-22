import { z } from "zod";
import {
  base64WebPImageOrEmptyString,
  emailString,
  nonEmptyString,
  objectId,
  orderNumber,
  slugString,
} from "../customZodTypes";

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
});

export const updateCommitteeSchema = createCommitteeSchema
  .partial()
  .extend({ id: objectId });
