import { z } from "zod";
import {
  sftpDir,
  sftpFile,
  sftpFilename,
  sftpUrl,
  standardBoolean,
  standardString,
  stringToBoolean,
} from "./helpers/custom-zod-helpers";

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

export const sftpAPISuccessResponseSchema = z.object({
  url: sftpUrl,
  success: standardBoolean,
});

export const sftpAPIErrorResponseSchema = z.object({
  error: standardString,
});
