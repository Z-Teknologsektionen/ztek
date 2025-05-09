import { z } from "zod";
import {
  base64WebPImageString,
  committeeOrderNumber,
  emptyString,
  nonEmptyString,
  objectId,
  standardString,
  validYearPastOrCurrent,
} from "~/schemas/helpers/custom-zod-helpers";

const committeeNameWithYearRegEx = /^\p{L}+ (\d\d|\d\d(\/|-)\d\d)$/u;

const oldCommitteeMemberSchema = z.object({
  name: nonEmptyString,
  nickName: standardString,
  order: committeeOrderNumber,
  role: standardString,
});

export const createOldCommitteeSchema = z.object({
  name: nonEmptyString.regex(
    committeeNameWithYearRegEx,
    'Måste vara på formen "Organ 22", "Organ 22/23" eller "Organ 22-24"',
  ),
  year: validYearPastOrCurrent,
  image: base64WebPImageString.or(emptyString),
  logo: base64WebPImageString.or(emptyString),
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
