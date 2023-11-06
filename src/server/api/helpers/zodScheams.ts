import isMobilePhone from "validator/lib/isMobilePhone";
import { z } from "zod";
import { objectId } from "./customZodTypes";

export const createNewMemberSchema = z.object({
  committeeId: objectId,
  name: z.string().min(1).optional(),
  nickName: z.string().min(1).optional(),
  email: z.string().email().min(1),
  phone: z
    .string()
    .refine((val) => (val !== "" ? isMobilePhone(val, "sv-SE") : true))
    .optional(),
  role: z.string().min(1),
  order: z.number().min(0).max(99).optional().default(0),
});

export const updateMemberSchema = z.object({
  id: objectId,
  committeeId: objectId,
  name: z.string().optional(),
  nickName: z.string().optional(),
  email: z.string().email().min(1),
  phone: z
    .string()
    .refine((val) => isMobilePhone(val, "sv-SE"))
    .optional(),
  role: z.string().min(1),
  order: z.number().min(0).max(99).optional(),
});
