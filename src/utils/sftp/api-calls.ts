import type { AxiosError } from "axios";
import axios from "axios";
import { sftpAPIResponseSchema } from "~/schemas/sftp";
import type {
  HandleCreateSftpFileProps,
  HandleDeleteSftpFileProps,
  HandleRenameSftpFileProps,
} from "~/types/sftp-types";

export const handleCreateSftpFile = async (
  body: HandleCreateSftpFileProps,
): Promise<string> => {
  return await axios
    .post("/api/sftp", body, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => sftpAPIResponseSchema.parse(res.data))
    .then((res) => {
      return res.url;
    })
    .catch((error: AxiosError) => {
      throw new Error(error.message);
    });
};

export const handleRenameSftpFile = async (
  body: HandleRenameSftpFileProps,
): Promise<string> => {
  return await axios
    .put("/api/sftp", body, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => sftpAPIResponseSchema.parse(res.data))
    .then((res) => {
      return res.url;
    })
    .catch((error: AxiosError) => {
      throw new Error(error.message);
    });
};

export const handleDeleteSftpFile = async (
  body: HandleDeleteSftpFileProps,
): Promise<boolean> => {
  return await axios
    .delete("/api/sftp", {
      data: body,
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => sftpAPIResponseSchema.parse(res.data))
    .then((res) => {
      return res.success;
    })
    .catch((error: AxiosError) => {
      throw new Error(error.message);
    });
};
