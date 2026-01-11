import { z } from "zod";
import {
  standardBoolean,
  standardString,
  stringToBoolean,
} from "./helpers/common-zod-helpers";
import {
  sftpDir,
  sftpFile,
  sftpFilename,
  sftpUrl,
} from "./helpers/sftp-zod-helpers";
// This file contains Zod schemas for SFTP api

//Helpers
const sftpAPIErrorCode = z.enum([
  "FILE_NOT_FOUND",
  "FILE_NOT_ON_SERVER",
  "UNEXPECTED_ERROR",
]);
class SftpAPIError extends Error {
  code: z.infer<typeof sftpAPIErrorCode>;
  constructor(message: string, code: z.infer<typeof sftpAPIErrorCode>) {
    super(message);
    this.code = code;
  }
}

// Schemas for parsing (client --> server) requests
// should match call signatures in `src/app/api/sftp/utils/sftp-engine.ts`

export const sftpUploadNewFileSchema = z.object({
  file: sftpFile,
  dir: sftpDir,
  isPublic: stringToBoolean.or(standardBoolean),
  filename: sftpFilename,
  overwrite: stringToBoolean.or(standardBoolean),
});

export const sftpUploadNewSchemaWithoutFile = sftpUploadNewFileSchema.omit({
  file: true,
});

export const sftpRenameFileSchema = z.object({
  oldUrl: sftpUrl,
  newFilename: sftpFilename,
});

export const sftpDeleteFileSchema = z.object({
  url: sftpUrl,
});

// Schemas for parsing (server --> client) responses
// client expects success if HTTP status is 2xx and error if not
// aka `success` field is redundant

export const sftpAPISuccessResponseSchema = z.object({
  success: z.literal(true),
  url: sftpUrl,
});

export const sftpAPIErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({ code: sftpAPIErrorCode, message: standardString }),
});
