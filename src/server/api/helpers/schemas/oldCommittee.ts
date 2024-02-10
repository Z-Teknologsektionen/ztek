import { z } from "zod";
import {
  base64WebPImageString,
  emptyString,
  nonEmptyString,
  objectId,
  orderNumber,
  standardString,
  validYear,
} from "~/server/api/helpers/customZodTypes";

const OldCommitteeMemberSchema = z.object({
  name: nonEmptyString,
  nickName: standardString,
  order: orderNumber,
  role: standardString,
});

export const createOldCommitteeSchema = z.object({
  name: nonEmptyString,
  year: validYear,
  image: base64WebPImageString.or(emptyString),
  logo: base64WebPImageString.or(emptyString),
  members: z.array(OldCommitteeMemberSchema),
  belongsToCommitteeId: objectId,
});

export const updateOldCommitteeSchema = createOldCommitteeSchema
  .partial()
  .extend({
    id: objectId,
    members: z.array(OldCommitteeMemberSchema),
    belongsToCommitteeId: objectId,
  });
