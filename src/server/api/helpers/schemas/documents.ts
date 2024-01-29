import { z } from "zod";
import { nonEmptyString, objectId } from "~/server/api/helpers/customZodTypes";

export const createDocumentSchema = z.object({
  title: nonEmptyString,
  url: z.string().url(),
  isPDF: z.boolean(),
  groupId: objectId,
});

export const updateDocumentSchema = createDocumentSchema
  .partial()
  .extend({ id: objectId });

export const createDocumentGroupSchema = z.object({
  name: nonEmptyString,
  extraText: nonEmptyString.optional(),
});
export const updateDocumentGroupSchema = createDocumentGroupSchema
  .partial()
  .extend({ id: objectId });
