import type { AxiosError } from "axios";
import axios from "axios";
import {
  sftpAPIErrorResponseSchema,
  sftpAPISuccessResponseSchema,
} from "~/schemas/sftp";
import type { HandleRenameSftpFileProps } from "~/types/sftp-types";

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
