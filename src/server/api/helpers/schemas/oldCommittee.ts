import { z } from "zod";
import {
  base64WebPImageString,
  emptyString,
  nonEmptyString,
  objectId,
} from "~/server/api/helpers/customZodTypes";

const OldCommitteeMember = z.object({
  name: nonEmptyString,
  nickName: nonEmptyString.optional(),
  order: z.number(),
  role: nonEmptyString.optional(),
});

export const createOldCommitteeSchema = z.object({
  name: nonEmptyString,
  year: z.number(),
  image: base64WebPImageString.or(emptyString),
  logo: base64WebPImageString.or(emptyString),
  members: z.array(OldCommitteeMember),
  belongsToCommitteeId: objectId,
});

export const updateOldCommitteeSchema = createOldCommitteeSchema
  .partial()
  .extend({
    id: objectId,
    members: z.array(OldCommitteeMember),
    belongsToCommitteeId: objectId,
  });
