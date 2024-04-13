import type { SFTPDir } from "~/constants/sftp";

export type RenameFileOnSftpServerType = {
  filename: string;
  oldUrl: string;
};

export type CreateFileOnSftpServerType = {
  dir: SFTPDir;
  filename: string;
  input: Buffer | NodeJS.ReadableStream;
  isPublic: boolean;
  overwrite: boolean;
};

export type CreateFileOnSftpClientType = {
  dir: SFTPDir;
  file: File;
  filename: string;
  isPublic: boolean;
  overwrite: boolean;
};

export interface SftpApiResponse {
  error?: string;
  message?: string;
  status: number;
}
