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
  sftpFile,
  standardString,
} from "~/schemas/helpers/custom-zod-helpers";

export const upsertMemberBaseSchema = z.object({
  name: standardString,
  nickName: standardString,
  image: base64WebPImageString.or(emptyString).or(httpsUrlString),
  order: committeeOrderNumber,
  phone: phoneNumberString.or(emptyString),
  imageFile: sftpFile.optional().nullable(),
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
