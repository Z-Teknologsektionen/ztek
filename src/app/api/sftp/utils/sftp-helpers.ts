import type { ConnectOptions, TransferOptions } from "ssh2-sftp-client";
import { env } from "~/env.mjs";
import type { SFTPDir } from "~/types/sftp-types";

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
