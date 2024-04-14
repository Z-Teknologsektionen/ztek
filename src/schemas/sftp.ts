import { z } from "zod";
import { SFPT_DIRS } from "~/constants/sftp";
import {
  sftpFile,
  sftpFilename,
  sftpUrl,
  standardBoolean,
  stringToBoolean,
} from "./helpers/custom-zod-helpers";

const sftpDir = z.enum(SFPT_DIRS);

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

export const sftpAPIResponseSchema = z.object({
  url: sftpUrl,
  success: standardBoolean,
});
