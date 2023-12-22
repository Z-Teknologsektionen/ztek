import { z } from "zod";
import {
  base64WebPImageString,
  emailString,
  nonEmptyString,
  objectId,
  orderNumber,
  phoneNumberString,
} from "../customZodTypes";

export const upsertMemberBaseSchema = z.object({
  name: z.string().optional(),
  nickName: z.string().optional(),
  image: base64WebPImageString.optional(),
  order: orderNumber,
  phone: phoneNumberString,
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
