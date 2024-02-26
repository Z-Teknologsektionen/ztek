import { z } from "zod";
import {
  base64WebPImageString,
  emailString,
  emptyString,
  nonEmptyString,
  objectId,
  orderNumber,
  phoneNumberString,
  standardString,
} from "~/schemas/helpers/custom-zod-helpers";

export const upsertMemberBaseSchema = z.object({
  name: standardString,
  nickName: standardString,
  image: base64WebPImageString.or(emptyString),
  order: orderNumber,
  phone: phoneNumberString.or(emptyString),
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
