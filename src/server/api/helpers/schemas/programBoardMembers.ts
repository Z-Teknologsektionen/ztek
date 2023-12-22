import { z } from "zod";
import {
  base64WebPImageString,
  emailString,
  nonEmptyString,
  objectId,
  orderNumber,
  phoneNumberString,
} from "../customZodTypes";

export const createProgramBoardMemberSchema = z.object({
  name: nonEmptyString,
  role: nonEmptyString,
  phone: phoneNumberString,
  email: emailString,
  url: z.string().url(),
  image: base64WebPImageString.optional(),
  order: orderNumber,
});

export const updateProgramBoardMemberSchema = createProgramBoardMemberSchema
  .partial()
  .extend({ id: objectId });
