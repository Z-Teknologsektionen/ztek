import type { AxiosError } from "axios";
import axios from "axios";
import {
  sftpAPIErrorResponseSchema,
  sftpAPISuccessResponseSchema,
} from "~/schemas/sftp";
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
    .then((res) => sftpAPISuccessResponseSchema.parse(res.data))
    .then((res) => {
      return res.url;
    })
    .catch((axiosError: AxiosError) => {
      const { error } = sftpAPIErrorResponseSchema.parse(
        axiosError.response?.data,
      );
      throw new Error(error);
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
    .then((res) => sftpAPISuccessResponseSchema.parse(res.data))
    .then((res) => {
      return res.url;
    })
    .catch((axiosError: AxiosError) => {
      const { error } = sftpAPIErrorResponseSchema.parse(
        axiosError.response?.data,
      );
      throw new Error(error);
    });
};

export const handleDeleteSftpFile = async (
  body: HandleDeleteSftpFileProps,
  ignoreAllErrors: boolean = false,
): Promise<boolean> => {
  return await axios
    .delete("/api/sftp", {
      data: body,
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => sftpAPISuccessResponseSchema.parse(res.data))
    .then((res) => {
      return res.success;
    })
    .catch((axiosError: AxiosError) => {
      if (ignoreAllErrors) return false;

      const { error } = sftpAPIErrorResponseSchema.parse(
        axiosError.response?.data,
      );

      throw new Error(error);
    });
};
