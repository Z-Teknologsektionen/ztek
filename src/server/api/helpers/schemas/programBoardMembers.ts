import { z } from "zod";
import {
  base64WebPImageString,
  emailString,
  emptyString,
  nonEmptyString,
  objectId,
  orderNumber,
  phoneNumberString,
} from "~/server/api/helpers/customZodTypes";

export const createProgramBoardMemberSchema = z.object({
  name: nonEmptyString,
  role: nonEmptyString,
  phone: phoneNumberString.or(emptyString),
  email: emailString,
  url: z.string().url(),
  image: base64WebPImageString.or(emptyString),
  order: orderNumber,
});

export const updateProgramBoardMemberSchema = createProgramBoardMemberSchema
  .partial()
  .extend({ id: objectId });
