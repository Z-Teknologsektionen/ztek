import type { TransferOptions } from "ssh2-sftp-client";
import Client from "ssh2-sftp-client";
import { env } from "~/env.mjs";
import type {
  CreateFileOnSftpServerType,
  RenameFileOnSftpServerType,
} from "~/types/sftp-types";

const basePath = env.SFTP_BASE_PATH;
const baseUrl = env.NEXT_PUBLIC_SFTP_BASE_URL;

const config = {
  host: env.SFTP_HOST,
  port: 22,
  username: env.SFTP_USER,
  privateKey: Buffer.from(env.SFTP_KEY, "base64"),
  // debug: console.log,
};

const options: TransferOptions = {
  writeStreamOptions: {
    mode: 0o644, // mode to use for created file (rwx)
    autoClose: true, // automatically close the write stream when finished
  },
  readStreamOptions: {
    autoClose: true, // automatically close the read stream when finished
  },
};

export const uploadFileToSftpServer = async ({
  input,
  dir,
  filename,
  isPublic = true,
  overwrite = false,
}: CreateFileOnSftpServerType): Promise<string> => {
  const sftp = new Client();

  const newPath = `${basePath}/${isPublic ? "public" : "private"}/${dir}`;
  const newFilePath = `${newPath}/${filename}`;

  try {
    await sftp.connect(config);

    const fileExists = await sftp.exists(newFilePath);
    if (fileExists && !overwrite) {
      throw new Error(`File ${filename} already exists`);
    }

    const pathExists = await sftp.exists(newPath);
    if (!pathExists) {
      await sftp.mkdir(newPath, true);
    }
    await sftp.put(input, newFilePath, options);

    return getUrlFromPath(newFilePath);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to upload file: " + error.message);
    } else {
      throw new Error("Failed to upload file.");
    }
  } finally {
    await sftp.end();
  }
};

export const deleteFileFromSftpServer = async (url: string): Promise<void> => {
  const sftp = new Client();

  const path = getPathFromUrl(url);

  try {
    await sftp.connect(config);

    //Ignore error if file does not exist.
    await sftp.delete(path);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to delete file: " + error.message);
    } else {
      throw new Error("Failed to delete file.");
    }
  } finally {
    await sftp.end();
  }
};

export const renameFileOnSftpServer = async ({
  oldUrl,
  filename,
}: RenameFileOnSftpServerType): Promise<string> => {
  const sftp = new Client();

  const oldPath = getPathFromUrl(oldUrl);
  const newPath = `${oldPath.split("/").slice(0, -1).join("/")}/${filename}`;

  try {
    await sftp.connect(config);

    const pathExists = await sftp.exists(newPath);
    if (!pathExists) {
      await sftp.mkdir(newPath, true);
    }

    await sftp.rename(oldPath, newPath);

    return getUrlFromPath(newPath);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to rename file: " + error.message);
    } else {
      throw new Error("Failed to rename file.");
    }
  } finally {
    await sftp.end();
  }
};

const getPathFromUrl = (str: string): string => str.replace(baseUrl, basePath);

const getUrlFromPath = (str: string): string => str.replace(basePath, baseUrl);
