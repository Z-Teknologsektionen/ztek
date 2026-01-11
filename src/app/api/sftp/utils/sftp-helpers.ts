import { NextResponse } from "next/server";
import type { ConnectOptions, TransferOptions } from "ssh2-sftp-client";
import { ZodError } from "zod";
import { env } from "~/env.mjs";
import type { SftpAPIErrorCode, SFTPDir } from "~/types/sftp-types";
import { SFTPErrorResponseBody } from "~/types/sftp-types";

const basePath = env.SFTP_BASE_PATH;
const baseUrl = env.NEXT_PUBLIC_SFTP_BASE_URL;

export const createNewSFTPPath = ({
  dir,
  isPublic,
}: {
  dir: SFTPDir;
  isPublic: boolean;
}): string => `${basePath}/${isPublic ? "public" : "private"}/${dir}`;

export const getPathFromUrl = (str: string): string =>
  str.replace(baseUrl, basePath);

export const getUrlFromPath = (str: string): string =>
  str.replace(basePath, baseUrl);

export const sftpConfig: ConnectOptions = {
  host: env.SFTP_HOST,
  port: env.SFTP_PORT,
  username: env.SFTP_USER,
  privateKey: Buffer.from(env.SFTP_KEY, "base64"),
  // debug: console.log,
};

export const sftpOptions: TransferOptions = {
  writeStreamOptions: {
    mode: 0o644, // mode to use for created file (rwx)
    autoClose: true, // automatically close the write stream when finished
  },
  readStreamOptions: {
    autoClose: true, // automatically close the read stream when finished
  },
};

export const flattenZodError = (error: ZodError): string => {
  return error.issues
    .map(({ path, message }) => `${path.join(".")}: ${message}`)
    .join(", ");
};

export class SftpAPIError extends Error {
  code: SftpAPIErrorCode;
  constructor(code: SftpAPIErrorCode, message: string) {
    super(message);
    this.code = code;
  }

  // serialize only message and error code when sending to client. Do not leak stack trace.
  toJSON(): { message: string; code: SftpAPIErrorCode } {
    return { message: this.message, code: this.code };
  }
}

export const makeSftpAPIErrorResponse = (
  error: SftpAPIError | unknown,
): NextResponse<SFTPErrorResponseBody> => {
  // force `SftpAPIError`
  const sftpError =
    error instanceof SftpAPIError
      ? error
      : new SftpAPIError(
          "SERVER_ERR__UNEXPECTED_ERROR",
          "Unexpected server error.",
        );

  // serialize the error and create response
  return NextResponse.json(
    {
      success: false,
      error: sftpError.toJSON(),
    },
    {
      status: sftpError.code.startsWith("CLIENT_ERR_") ? 400 : 500,
    },
  );
};
