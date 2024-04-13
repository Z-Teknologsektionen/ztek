import type { AxiosError } from "axios";
import axios from "axios";
import { z } from "zod";
import { MAX_SFTP_FILE_SIZE } from "~/constants/sftp";
import { httpsUrlString } from "~/schemas/helpers/custom-zod-helpers";
import type {
  CreateFileOnSftpClientType,
  SftpApiResponse,
} from "~/types/sftp-types";

export const handleCreateSftpFile = async ({
  dir,
  file,
  filename,
  isPublic,
  overwrite,
}: CreateFileOnSftpClientType): Promise<string> => {
  return await axios
    .post(
      "/api/sftp",
      {
        dir,
        file,
        filename,
        isPublic,
        overwrite,
      },
      {
        headers: { "Content-Type": "multipart/form-data" },
        maxBodyLength: MAX_SFTP_FILE_SIZE,
        maxContentLength: MAX_SFTP_FILE_SIZE,
      },
    )
    .then((res) => {
      const responseData = res.data as SftpApiResponse;
      return responseData.message || "Kunde inte hämta filens url.";
    });
};

export const handleRenameSftpFile = async ({
  newName,
  oldUrl,
}: {
  newName: string;
  oldUrl: string;
}): Promise<string> => {
  return await axios
    .put(
      "/api/sftp",
      {
        newName,
        oldUrl,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      },
    )
    .then((res) => z.object({ message: httpsUrlString }).parse(res.data))
    .then((res) => {
      return res.message;
    })
    .catch((error: AxiosError) => {
      throw new Error(error.message);
    });
};

export const handleDeleteSftpFile = async (url: string): Promise<boolean> => {
  return await axios
    .delete("/api/sftp", {
      data: { url },
      headers: {
        "content-type": "application/json",
      },
    })
    .then(() => {
      return true;
    });
};
