import type { NextResponse } from "next/server";
import type { z } from "zod";
import type {
  SFPT_DIRS,
  SFTP_ACCEPTED_MEDIA_TYPES,
  SFTP_API_ERROR_CODES,
} from "~/constants/sftp";
import type {
  sftpAPIErrorResponseSchema,
  sftpAPISuccessResponseSchema,
  sftpDeleteFileSchema,
  sftpRenameFileSchema,
  sftpUploadNewFileSchema,
  sftpUploadNewSchemaWithoutFile,
} from "~/schemas/sftp";

export type SFTPDir = (typeof SFPT_DIRS)[number];

export type SFTPMediaType = (typeof SFTP_ACCEPTED_MEDIA_TYPES)[number];

export type SFTPInputType = string | Buffer | NodeJS.ReadableStream;

export type HandleCreateSftpFileProps = z.input<typeof sftpUploadNewFileSchema>;

export type HandleRenameSftpFileProps = z.input<typeof sftpRenameFileSchema>;

export type HandleDeleteSftpFileProps = z.input<typeof sftpDeleteFileSchema>;

export type UploadFileToSftpServerProps = z.output<
  typeof sftpUploadNewSchemaWithoutFile
> & {
  input: SFTPInputType;
};

export type RenameFileOnSftpServerProps = z.output<typeof sftpRenameFileSchema>;

export type DeleteFileFromSftpServerProps = z.output<
  typeof sftpDeleteFileSchema
>;

export type SFTPResponseBody = z.input<typeof sftpAPISuccessResponseSchema>;

export type SFTPErrorResponseBody = z.input<typeof sftpAPIErrorResponseSchema>;

export type NextSFTPAPIResponseWithUrl = Promise<
  NextResponse<SFTPResponseBody | SFTPErrorResponseBody>
>;

export type SftpAPIErrorCode = (typeof SFTP_API_ERROR_CODES)[number];
