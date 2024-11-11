import type { AxiosError } from "axios";
import axios from "axios";
import {
  sftpAPIErrorResponseSchema,
  sftpAPISuccessResponseSchema,
} from "~/schemas/sftp";
import type { HandleCreateSftpFileProps } from "~/types/sftp-types";
import { createZenithMediaFilename } from "~/utils/string-utils";

type HandleCreateZenithMediaFileProps = {
  file: File;
  order: number;
  title: string;
  year: number;
};

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

export const handleCreateZenithMediaFile = async ({
  file,
  title,
  order,
  year,
}: HandleCreateZenithMediaFileProps): Promise<string> => {
  const filename = createZenithMediaFilename({
    title,
    filename: file.name,
    order,
    year,
  });

  return await handleCreateSftpFile({
    dir: "media",
    file: file,
    isPublic: true,
    overwrite: false,
    filename,
  });
};
