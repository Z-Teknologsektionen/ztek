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
  image: base64WebPImageString.optional(),
  order: orderNumber,
});

export const updateMemberSchema = createMemberSchema
  .partial()
  .extend({ id: objectId });

export const createCommitteeSchema = z.object({
  name: nonEmptyString,
  slug: nonEmptyString,
  description: nonEmptyString,
  role: nonEmptyString,
  email: emailString,
  image: base64WebPImageString.optional(),
  order: orderNumber,
  electionPeriod: z.number().min(1).max(4).optional().default(1),
});

export const updateCommitteeAsActiveSchema = createCommitteeSchema
  .partial()
  .extend({ id: objectId });

export const updateCommitteeAsUserSchema = z.object({
  image: base64WebPImageString.optional(),
  description: nonEmptyString.optional(),
});

export const createProgramBoardMemberSchema = z.object({
  name: nonEmptyString,
  role: nonEmptyString,
  phone: z
    .string()
    .refine((val) => isMobilePhone(val, "sv-SE"))
    .optional(),
  email: emailString,
  url: z.string().url(),
  image: base64WebPImageString.optional(),
  order: orderNumber,
});

export const updateProgramBoardMemberSchema = createProgramBoardMemberSchema
  .partial()
  .extend({ id: objectId });

export const createDocumentSchema = z.object({
  title: nonEmptyString,
  url: z.string().url(),
  isPDF: z.boolean(),
  groupId: objectId,
});

export const updateDocumentSchema = createDocumentSchema
  .partial()
  .extend({ id: objectId });

export const createDocumentGroupSchema = z.object({
  name: nonEmptyString,
  extraTest: nonEmptyString.optional(),
});
export const updateDocumentGroupSchema = createDocumentGroupSchema
  .partial()
  .extend({ id: objectId });
