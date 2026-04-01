import { z } from "zod";
import {
  httpsUrlString,
  nonEmptyString,
  objectId,
  standardBoolean,
  standardString,
} from "~/schemas/helpers/common-zod-helpers";

export const createDocumentSchema = z.object({
  title: nonEmptyString,
  url: httpsUrlString,
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
