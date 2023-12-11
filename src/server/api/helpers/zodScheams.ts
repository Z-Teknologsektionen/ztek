import isMobilePhone from "validator/lib/isMobilePhone";
import { z } from "zod";
import {
  base64ImageString,
  emailString,
  nonEmptyString,
  objectId,
  orderNumber,
} from "./customZodTypes";

export const createNewMemberSchema = z.object({
  committeeId: objectId,
  name: nonEmptyString.optional(),
  nickName: nonEmptyString.optional(),
  email: emailString,
  phone: z
    .string()
    .refine((val) => isMobilePhone(val, "sv-SE"))
    .optional(),
  role: nonEmptyString,
  order: orderNumber,
});

export const updateMemberSchema = createNewMemberSchema
  .partial()
  .extend({ id: objectId });

export const createOrganSchema = z.object({
  name: nonEmptyString,
  slug: nonEmptyString,
  description: nonEmptyString,
  role: nonEmptyString,
  email: emailString,
  image: base64ImageString.optional(),
  order: orderNumber,
});

export const updateOrganSchema = createOrganSchema
  .partial()
  .extend({ id: objectId });
