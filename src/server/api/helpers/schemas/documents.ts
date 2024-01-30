import { z } from "zod";
import {
  nonEmptyString,
  objectId,
  standardBoolean,
  standardString,
} from "~/server/api/helpers/customZodTypes";

export const createDocumentSchema = z.object({
  title: nonEmptyString,
  url: standardString.url(),
  isPDF: standardBoolean,
  groupId: objectId,
});

export const updateDocumentSchema = createDocumentSchema
  .partial()
  .extend({ id: objectId });

export const createDocumentGroupSchema = z.object({
  name: nonEmptyString,
  extraText: standardString,
});
export const updateDocumentGroupSchema = createDocumentGroupSchema
  .partial()
  .extend({ id: objectId });
