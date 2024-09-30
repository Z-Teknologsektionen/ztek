import { z } from "zod";
import {
  base64WebPImageString,
  committeeOrderNumber,
  emailString,
  emptyString,
  httpsUrlString,
  nonEmptyString,
  objectId,
  phoneNumberString,
} from "~/schemas/helpers/custom-zod-helpers";

export const createProgramBoardMemberSchema = z.object({
  name: nonEmptyString,
  role: nonEmptyString,
  phone: phoneNumberString.or(emptyString),
  email: emailString,
  url: httpsUrlString,
  image: base64WebPImageString.or(emptyString),
  order: committeeOrderNumber,
});

export const updateProgramBoardMemberSchema = createProgramBoardMemberSchema
  .partial()
  .extend({ id: objectId });
