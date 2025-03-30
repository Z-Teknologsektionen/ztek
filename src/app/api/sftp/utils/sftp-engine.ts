"use server";
import SFTPClient from "ssh2-sftp-client";
import type {
  DeleteFileFromSftpServerProps,
  RenameFileOnSftpServerProps,
  UploadFileToSftpServerProps,
} from "~/types/sftp-types";
import {
  createNewSFTPPath,
  getPathFromUrl,
  getUrlFromPath,
  sftpConfig,
  sftpOptions,
} from "./sftp-helpers";

const CUSTOM_ERROR_MESSAGE_PREFIX = "Custom:" as const;

export const uploadFileToSftpServer = async ({
  input,
  dir,
  filename,
  isPublic,
  overwrite,
}: UploadFileToSftpServerProps): Promise<string> => {
  const sftp = new SFTPClient();

  const newFolderPath = createNewSFTPPath({ dir, isPublic });
  const newFilePath = `${newFolderPath}/${filename}`;

  try {
    await sftp.connect(sftpConfig);
    const fileExists = await sftp.exists(newFilePath);
    if (fileExists && !overwrite) {
      throw new Error(
        `${CUSTOM_ERROR_MESSAGE_PREFIX} Fil med filnamnet: ${filename} finns redan!`,
      );
    }

    const newFolderPathExists = await sftp.exists(newFolderPath);
    if (!newFolderPathExists) {
      await sftp.mkdir(newFolderPath, true);
    }
    await sftp.put(input, newFilePath, sftpOptions);

    return getUrlFromPath(newFilePath);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.startsWith(CUSTOM_ERROR_MESSAGE_PREFIX)) {
        throw new Error(error.message.replace(CUSTOM_ERROR_MESSAGE_PREFIX, ""));
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
    await sftp.connect(sftpConfig);

    const newFolderPathExists = await sftp.exists(newFolderPath);
    if (!newFolderPathExists) {
      await sftp.mkdir(newFolderPath, true);
    }

    const fileExists = await sftp.exists(newFilePath);
    if (fileExists) {
      throw new Error(
        `${CUSTOM_ERROR_MESSAGE_PREFIX}Fil med filnamnet: ${newFilename} finns redan!`,
      );
    }

    await sftp.rename(oldFilePath, newFilePath);

    return getUrlFromPath(newFilePath);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.startsWith(CUSTOM_ERROR_MESSAGE_PREFIX))
        throw new Error(error.message.replace(CUSTOM_ERROR_MESSAGE_PREFIX, ""));

      switch (error.message) {
        case `_rename: No such file From: ${oldFilePath}`:
          throw new Error("Filen du ville byta namn på kunde inte hittas!");

        case `_rename: Failure From: ${oldFilePath} To: ${newFilePath}`:
          throw new Error(
            "Kunde inte byta namn på filen! Förmodligen finns redan en fil med samma namn.",
          );
        case `Fil med filnamnet: ${newFilename} finns redan!`:
          throw new Error(`Fil med filnamnet: ${newFilename} finns redan!`);
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
    await sftp.connect(sftpConfig);

    await sftp.delete(filePath);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.startsWith(CUSTOM_ERROR_MESSAGE_PREFIX))
        throw new Error(error.message.replace(CUSTOM_ERROR_MESSAGE_PREFIX, ""));

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
