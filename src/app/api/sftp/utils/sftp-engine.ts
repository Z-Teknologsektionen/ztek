"use server";
import SFTPClient from "ssh2-sftp-client";
import { SftpAPIError } from "~/schemas/sftp";
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
    // connect, check file non-existance
    await sftp.connect(sftpConfig);
    const fileExists = await sftp.exists(newFilePath);
    if (fileExists && !overwrite) {
      console.error(
        `Upload failed: File already exists at ${newFilePath} and overwrite=false`,
      );
      throw new SftpAPIError(
        "FILE_EXISTS",
        `Fil med filnamnet ${filename} finns redan!`,
      );
    }

    // write folder, write file
    const newFolderPathExists = await sftp.exists(newFolderPath);
    if (!newFolderPathExists) {
      await sftp.mkdir(newFolderPath, true);
    }
    await sftp.put(input, newFilePath, sftpOptions);

    // return URL
    const resultUrl = getUrlFromPath(newFilePath);
    return resultUrl;
  } catch (error) {
    console.error(`SFTP upload error:`, error);

    // custom error
    if (error instanceof SftpAPIError) {
      console.error(`Custom SFTP error: ${error.message}`);
      throw error;
    }

    // unknown error
    console.error(`Unknown SFTP upload error for file: ${filename}`);
    throw new SftpAPIError(
      "UNEXPECTED_ERROR",
      "Okänt fel! Kunde inte ladda upp filen.",
    );
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
    // connect, make target folder
    await sftp.connect(sftpConfig);
    const newFolderPathExists = await sftp.exists(newFolderPath);
    if (!newFolderPathExists) {
      await sftp.mkdir(newFolderPath, true);
    }

    // check non-existance
    const fileExists = await sftp.exists(newFilePath);
    if (fileExists) {
      console.error(
        `Rename failed: Target file already exists at ${newFilePath}`,
      );
      throw new SftpAPIError(
        "FILE_EXISTS",
        `Fil med filnamnet: ${newFilename} finns redan!`,
      );
    }

    // rename and return
    await sftp.rename(oldFilePath, newFilePath);
    const resultUrl = getUrlFromPath(newFilePath);
    return resultUrl;
  } catch (error) {
    console.error(`SFTP rename error:`, error);

    // custom error
    if (error instanceof SftpAPIError) {
      console.error(`Custom SFTP error: ${error.message}`);
      throw error;
    }

    // known error
    else if (error instanceof Error) {
      switch (error.message) {
        case `_rename: No such file From: ${oldFilePath}`:
          console.error(`Source file not found: ${oldFilePath}`);
          throw new SftpAPIError(
            "FILE_NOT_FOUND",
            "Filen du ville byta namn på kunde inte hittas!",
          );

        case `_rename: Failure From: ${oldFilePath} To: ${newFilePath}`:
          console.error(
            `Rename failure, likely duplicate file: ${newFilePath}`,
          );
          throw new SftpAPIError(
            "UNEXPECTED_ERROR",
            "Kunde inte byta namn på filen! Förmodligen finns redan en fil med samma namn.",
          );
      }
    }

    // unknown error
    console.error(`Unknown SFTP rename error for file: ${oldFilePath}`);
    throw new SftpAPIError(
      "UNEXPECTED_ERROR",
      "Okänt fel! Kunde inte byta namn på filen.",
    );
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
    // connect, delete
    await sftp.connect(sftpConfig);
    await sftp.delete(filePath);
  } catch (error) {
    console.error(`SFTP delete error:`, error);

    // custom error
    if (error instanceof SftpAPIError) {
      console.error(`Custom SFTP error: ${error.message}`);
      throw error;
    }

    // known error
    else if (error instanceof Error) {
      switch (error.message) {
        case `delete: No such file ${filePath}`:
          console.error(`File to delete not found: ${filePath}`);
          throw new SftpAPIError(
            "FILE_NOT_FOUND",
            "Filen du ville radera kunde inte hittas!",
          );
      }
    }

    // unknown error
    console.error(`Unknown SFTP delete error for file: ${filePath}`);
    throw new SftpAPIError(
      "UNEXPECTED_ERROR",
      "Okänt fel! Kunde inte radera filen.",
    );
  } finally {
    await sftp.end();
  }
};
