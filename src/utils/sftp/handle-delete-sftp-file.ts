import type { AxiosError } from "axios";
import axios from "axios";
import {
  sftpAPIErrorResponseSchema,
  sftpAPISuccessResponseSchema,
} from "~/schemas/sftp";
import type { HandleDeleteSftpFileProps } from "~/types/sftp-types";

export const handleDeleteSftpFile = async (
  body: HandleDeleteSftpFileProps,
  ignoreAllErrors: boolean = false,
): Promise<boolean> => {
  return await axios
    // promise will be rejected on HTTP errors
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
