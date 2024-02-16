import { z } from "zod";
import {
  base64WebPImageString,
  emailString,
  emptyString,
  httpsUrlString,
  nonEmptyString,
  objectId,
  orderNumber,
  phoneNumberString,
} from "~/schemas/helpers/custom-zod-helpers";

export const createProgramBoardMemberSchema = z.object({
  name: nonEmptyString,
  role: nonEmptyString,
  phone: phoneNumberString.or(emptyString),
  email: emailString,
  url: httpsUrlString,
  image: base64WebPImageString.or(emptyString),
  order: orderNumber,
});

export const updateProgramBoardMemberSchema = createProgramBoardMemberSchema
  .partial()
  .extend({ id: objectId });
