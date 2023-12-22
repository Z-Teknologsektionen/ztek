import { z } from "zod";
import {
  base64WebPImageOrEmptyString,
  emailString,
  nonEmptyString,
  objectId,
  orderNumber,
  phoneNumberOrEmptyString,
} from "../customZodTypes";

export const createProgramBoardMemberSchema = z.object({
  name: nonEmptyString,
  role: nonEmptyString,
  phone: phoneNumberOrEmptyString.optional(),
  email: emailString,
  url: z.string().url(),
  image: base64WebPImageOrEmptyString.optional(),
  order: orderNumber,
});

export const updateProgramBoardMemberSchema = createProgramBoardMemberSchema
  .partial()
  .extend({ id: objectId });
