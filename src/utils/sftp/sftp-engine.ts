import type { ConnectOptions, TransferOptions } from "ssh2-sftp-client";
import SFTPClient from "ssh2-sftp-client";
import { env } from "~/env.mjs";
import type {
  DeleteFileFromSftpServerProps,
  RenameFileOnSftpServerProps,
  SFTPDir,
  UploadFileToSftpServerProps,
} from "~/types/sftp-types";

const basePath = env.SFTP_BASE_PATH;
const baseUrl = env.NEXT_PUBLIC_SFTP_BASE_URL;

const customErrorMessagePrefix = "Custom:";

const config: ConnectOptions = {
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

//TODO: Mycket error hantering behöver fixas med snygga medelanden. Logga ut error in konsol och avläs starten på medelandet. Ex fil finns redan bör hanteras

export const uploadFileToSftpServer = async ({
  input,
  dir,
  filename,
  isPublic = true,
  overwrite = false,
}: UploadFileToSftpServerProps): Promise<string> => {
  const sftp = new SFTPClient();

  const newFolderPath = createNewSFTPPath({ dir, isPublic });
  const newFilePath = `${newFolderPath}/${filename}`;

  try {
    await sftp.connect(config);

    const fileExists = await sftp.exists(newFilePath);
    if (fileExists && !overwrite) {
      throw new Error(
        `${customErrorMessagePrefix} Fil med filnamnet: ${filename} finns redan!`,
      );
    }

    const newFolderPathExists = await sftp.exists(newFolderPath);
    if (!newFolderPathExists) {
      await sftp.mkdir(newFolderPath, true);
    }

    await sftp.put(input, newFilePath, options);

    return getUrlFromPath(newFilePath);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.startsWith(customErrorMessagePrefix)) {
        throw new Error(error.message.replace(customErrorMessagePrefix, ""));
      }
    }
    throw new Error("Okänt fel! Kunde inte ladda upp filen.");
  } finally {
    await sftp.end();
  }
};

export const renameFileOnSftpServer = async ({
  oldUrl,
  newFilename,
}: RenameFileOnSftpServerProps): Promise<string> => {
  const sftp = new SFTPClient();

  const oldFilePath = getPathFromUrl(oldUrl);
  const newFolderPath = oldFilePath.split("/").slice(0, -1).join("/");
  const newFilePath = `${newFolderPath}/${newFilename}`;

  try {
    await sftp.connect(config);

    const newFolderPathExists = await sftp.exists(newFolderPath);
    if (!newFolderPathExists) {
      await sftp.mkdir(newFolderPath, true);
    }

    await sftp.rename(oldFilePath, newFilePath);

    return getUrlFromPath(newFilePath);
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case `_rename: No such file From: ${oldFilePath}`:
          throw new Error("Filen du ville byta namn på kunde inte hittas!");

        case `_rename: Failure From: ${oldFilePath} To: ${newFilePath}`:
          throw new Error(
            "Kunde inte byta namn på filen! Förmodligen finns redan en fil med samma namn.",
          );
      }
    }
    throw new Error("Okänt fel! Kunde inte byta namn på filen.");
  } finally {
    await sftp.end();
  }
};

export const deleteFileFromSftpServer = async ({
  url,
}: DeleteFileFromSftpServerProps): Promise<void> => {
  const sftp = new SFTPClient();

  const filePath = getPathFromUrl(url);

  try {
    await sftp.connect(config);

    await sftp.delete(filePath);
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case `delete: No such file ${filePath}`:
          throw new Error("Filen du ville radera kunde inte hittas!");
      }
    }
    throw new Error("Okänt fel! Kunde inte radera filen.");
  } finally {
    await sftp.end();
  }
};

const createNewSFTPPath = ({
  dir,
  isPublic,
}: {
  dir: SFTPDir;
  isPublic: boolean;
}): string => `${basePath}/${isPublic ? "public" : "private"}/${dir}`;

const getPathFromUrl = (str: string): string => str.replace(baseUrl, basePath);

const getUrlFromPath = (str: string): string => str.replace(basePath, baseUrl);
