import isMobilePhone from "validator/lib/isMobilePhone";
import { z } from "zod";
import {
  base64WebPImageString,
  emailString,
  nonEmptyString,
  objectId,
  orderNumber,
} from "./customZodTypes";

export const updateMemberAsActiveSchema = z.object({
  name: nonEmptyString.optional(),
  nickName: nonEmptyString.optional(),
  image: base64WebPImageString.optional(),
  order: orderNumber,
});

export const createMemberSchema = z.object({
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

export const updateMemberSchema = createMemberSchema
  .partial()
  .extend({ id: objectId });

export const createOrganSchema = z.object({
  name: nonEmptyString,
  slug: nonEmptyString,
  description: nonEmptyString,
  role: nonEmptyString,
  email: emailString,
  image: base64WebPImageString.optional(),
  order: orderNumber,
});

export const updateOrganAsActiveSchema = createOrganSchema
  .partial()
  .extend({ id: objectId });

export const updateCommitteeAsUserSchema = z.object({
  image: base64WebPImageString.optional(),
  description: nonEmptyString.optional(),
});
