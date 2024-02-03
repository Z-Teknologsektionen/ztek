import { z } from "zod";
import {
  base64WebPImageOrEmptyString,
  nonEmptyString,
  objectId,
} from "~/server/api/helpers/customZodTypes";

export const createOldCommitteeSchema = z.object({
  name: nonEmptyString,
  year: z.number(),
  image: base64WebPImageOrEmptyString,
  logo: base64WebPImageOrEmptyString,
  members: z.array(
    z.object({
      name: nonEmptyString,
      nickName: nonEmptyString,
      order: z.number(),
      role: nonEmptyString.optional(),
    }),
  ),
  belongsToCommitteeId: objectId,
});

export const updateOldCommitteeSchema = createOldCommitteeSchema
  .partial()
  .extend({ id: objectId });
