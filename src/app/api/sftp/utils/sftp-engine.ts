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
      console.error(
        `Upload failed: File already exists at ${newFilePath} and overwrite=false`,
      );
      throw new Error(
        `${CUSTOM_ERROR_MESSAGE_PREFIX} Fil med filnamnet: ${filename} finns redan!`,
      );
    }

    const newFolderPathExists = await sftp.exists(newFolderPath);
    if (!newFolderPathExists) {
      await sftp.mkdir(newFolderPath, true);
    }
    await sftp.put(input, newFilePath, sftpOptions);

    const resultUrl = getUrlFromPath(newFilePath);
    return resultUrl;
  } catch (error) {
    console.error(`SFTP upload error:`, error);
    if (error instanceof Error) {
      if (error.message.startsWith(CUSTOM_ERROR_MESSAGE_PREFIX)) {
        const customMessage = error.message.replace(
          CUSTOM_ERROR_MESSAGE_PREFIX,
          "",
        );
        console.error(`Custom SFTP error: ${customMessage}`);
        throw new Error(customMessage);
      }
    }
    console.error(`Unknown SFTP upload error for file: ${filename}`);
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
      console.error(
        `Rename failed: Target file already exists at ${newFilePath}`,
      );
      throw new Error(
        `${CUSTOM_ERROR_MESSAGE_PREFIX}Fil med filnamnet: ${newFilename} finns redan!`,
      );
    }

    await sftp.rename(oldFilePath, newFilePath);

    const resultUrl = getUrlFromPath(newFilePath);
    return resultUrl;
  } catch (error) {
    console.error(`SFTP rename error:`, error);
    if (error instanceof Error) {
      if (error.message.startsWith(CUSTOM_ERROR_MESSAGE_PREFIX)) {
        const customMessage = error.message.replace(
          CUSTOM_ERROR_MESSAGE_PREFIX,
          "",
        );
        console.error(`Custom SFTP error: ${customMessage}`);
        throw new Error(customMessage);
      }

      switch (error.message) {
        case `_rename: No such file From: ${oldFilePath}`:
          console.error(`Source file not found: ${oldFilePath}`);
          throw new Error("Filen du ville byta namn på kunde inte hittas!");

        case `_rename: Failure From: ${oldFilePath} To: ${newFilePath}`:
          console.error(
            `Rename failure, likely duplicate file: ${newFilePath}`,
          );
          throw new Error(
            "Kunde inte byta namn på filen! Förmodligen finns redan en fil med samma namn.",
          );
        case `Fil med filnamnet: ${newFilename} finns redan!`:
          console.error(`Target filename already exists: ${newFilename}`);
          throw new Error(`Fil med filnamnet: ${newFilename} finns redan!`);
      }
    }
    console.error(`Unknown SFTP rename error for file: ${oldFilePath}`);
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
    console.error(`SFTP delete error:`, error);
    if (error instanceof Error) {
      if (error.message.startsWith(CUSTOM_ERROR_MESSAGE_PREFIX)) {
        const customMessage = error.message.replace(
          CUSTOM_ERROR_MESSAGE_PREFIX,
          "",
        );
        console.error(`Custom SFTP error: ${customMessage}`);
        throw new Error(customMessage);
      }

      switch (error.message) {
        case `delete: No such file ${filePath}`:
          console.error(`File to delete not found: ${filePath}`);
          throw new Error("Filen du ville radera kunde inte hittas!");
      }
    }
    console.error(`Unknown SFTP delete error for file: ${filePath}`);
    throw new Error("Okänt fel! Kunde inte radera filen.");
  } finally {
    await sftp.end();
  }
};
