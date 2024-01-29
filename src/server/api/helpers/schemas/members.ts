import { z } from "zod";
import {
  base64WebPImageOrEmptyString,
  emailString,
  nonEmptyString,
  objectId,
  orderNumber,
  phoneNumberOrEmptyString,
} from "~/server/api/helpers/customZodTypes";

export const upsertMemberBaseSchema = z.object({
  name: z.string().optional(),
  nickName: z.string().optional(),
  image: base64WebPImageOrEmptyString,
  order: orderNumber,
  phone: phoneNumberOrEmptyString.optional(),
});

export const updateMemberAsActiveSchema = upsertMemberBaseSchema
  .partial()
  .extend({ id: objectId });

export const createMemberSchema = upsertMemberBaseSchema.extend({
  committeeId: objectId,
  email: emailString,
  role: nonEmptyString,
});

export const updateMemberSchema = createMemberSchema
  .partial()
  .extend({ id: objectId });
