import { z } from "zod";
import {
  base64WebPImageString,
  committeeOrderNumber,
  emptyString,
  httpsUrlString,
  nonEmptyString,
  objectId,
  sftpFile,
  standardString,
  validYearPastOrCurrent,
} from "~/schemas/helpers/custom-zod-helpers";

const committeeNameWithYearRegEx = /^[a-zA-Z]+ (\d\d|\d\d\/\d\d)$/;

const oldCommitteeMemberSchema = z.object({
  name: nonEmptyString,
  nickName: standardString,
  order: committeeOrderNumber,
  role: standardString,
});

export const createOldCommitteeSchema = z.object({
  name: nonEmptyString.regex(
    committeeNameWithYearRegEx,
    'Måste vara på formen "Organ 22" eller "Organ 22/23"',
  ),
  year: validYearPastOrCurrent,
  image: base64WebPImageString.or(emptyString).or(httpsUrlString),
  imageFile: sftpFile.optional().nullable(),
  logo: base64WebPImageString.or(emptyString).or(httpsUrlString),
  logoFile: sftpFile.optional().nullable(),
  members: oldCommitteeMemberSchema
    .array()
    .min(1, "Måste vara minst en sittande i ett patetorgan"),
  belongsToCommitteeId: objectId,
});

export const updateOldCommitteeSchema = createOldCommitteeSchema
  .partial()
  .extend({
    id: objectId,
  });
