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

// Schemas for parsing (client --> server) requests
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
export const sftpAPISuccessResponseSchema = z.object({
  url: sftpUrl,
  success: standardBoolean,
});

export const sftpAPIErrorResponseSchema = z.object({
  error: standardString,
});
