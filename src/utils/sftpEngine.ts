import type { TransferOptions } from "ssh2-sftp-client";
import Client from "ssh2-sftp-client";

const basePath = process.env.SFTP_BASE_PATH || "";
const baseUrl = process.env.SFTP_BASE_URL || "";

const config = {
  host: process.env.SFTP_HOST,
  port: 22,
  username: process.env.SFTP_USER,
  privateKey: Buffer.from(process.env.SFTP_KEY || "", "base64"),
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

export const uploadFile = async (
  input: Buffer | NodeJS.ReadableStream,
  dir: string,
  filename: string,
  isPublic: boolean = true,
): Promise<string> => {
  const sftp = new Client();
  const path = `${basePath}/${isPublic ? "public" : "private"}/${dir}`;
  const resultUrl = `${baseUrl}/${
    isPublic ? "public" : "private"
  }/${dir}/${filename}`;

  try {
    await sftp.connect(config);

    const fileExists = await sftp.exists(`${path}/${filename}`);
    if (fileExists) {
      throw new Error(`File ${filename} already exists`);
    }

    const pathExists = await sftp.exists(path);
    if (!pathExists) {
      await sftp.mkdir(path, true);
    }
    await sftp.put(
      input,
      `${basePath}/${isPublic ? "public" : "private"}/${dir}/${filename}`,
      options,
    );
    //Everything is fine, return the url to the file
    return resultUrl;
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

export const deleteFile = async (url: string): Promise<void> => {
  const sftp = new Client();
  const path = getPathFromUrl(url);
  try {
    await sftp.connect(config);

    //Ignore error if file does not exist.
    await sftp.delete(path, true);
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

export const renameFile = async (
  oldUrl: string,
  dir: string,
  filename: string,
  isPublic: boolean = true,
): Promise<string> => {
  const sftp = new Client();
  const oldPath = getPathFromUrl(oldUrl);
  const newPath = `${basePath}/${isPublic ? "public" : "private"}/${dir}`;
  const resultUrl = `${baseUrl}/${
    isPublic ? "public" : "private"
  }/${dir}/${filename}`;
  try {
    await sftp.connect(config);
    const pathExists = await sftp.exists(newPath);
    if (!pathExists) {
      await sftp.mkdir(newPath, true);
    }
    await sftp.rename(oldPath, `${newPath}/${filename}`);
    return resultUrl;
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

const getPathFromUrl = (url: string): string => {
  return url.replace(baseUrl, basePath);
};
