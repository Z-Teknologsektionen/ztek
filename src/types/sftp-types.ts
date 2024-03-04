export type renameFileOnSftpServerType = {
  dir: string;
  filename: string;
  isPublic: boolean;
  oldUrl: string;
};

export type createFileOnSftpServerType = {
  dir: string;
  filename: string;
  input: Buffer | NodeJS.ReadableStream;
  isPublic: boolean;
  overwrite: boolean;
};

export type createFileOnSftpClientType = {
  dir: string;
  file: File;
  filename: string;
  isPublic: boolean;
  overwrite: boolean;
};
