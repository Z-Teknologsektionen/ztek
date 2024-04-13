import { z } from "zod";
import { SFPT_DIRS } from "~/constants/sftp";
import {
  sftpFilename,
  sftpUrl,
  standardBoolean,
  standardString,
  stringToBoolean,
} from "./helpers/custom-zod-helpers";

const sftpDir = z.enum(SFPT_DIRS);

export const sftpUploadNewFileSchema = z.object({
  file: z.custom<File>(),
  dir: sftpDir,
  isPublic: stringToBoolean.or(standardBoolean),
  filename: sftpFilename,
  overwrite: stringToBoolean.or(standardBoolean),
});

export const sftpRenameFileSchema = z.object({
  oldUrl: sftpUrl,
  newName: standardString,
});

export const sftpDeleteFileSchema = z.object({
  url: sftpUrl,
});
