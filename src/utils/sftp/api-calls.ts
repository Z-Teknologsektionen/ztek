import type { AxiosError } from "axios";
import axios from "axios";
import type { SftpApiResponse } from "~/app/api/sftp/route";
import type { createFileOnSftpClientType } from "~/types/sftp-types";

export const handleDeleteSftpFile = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .delete("/api/sftp", { params: { url } })
      .then(() => {
        return resolve("Filen har tagits bort från servern.");
      })
      .catch((error: Error) => {
        return reject(error);
      });
  });
};

export const handleRenameSftpFile = (
  oldUrl: string,
  newName: string,
  dir: string,
  isPublic: string,
): Promise<string> => {
  console.log(oldUrl, newName, dir, isPublic);
  const formData = new FormData();
  formData.set("oldUrl", oldUrl);
  formData.set("public", String(props.isPublic));
  formData.set("dir", props.dir);
  formData.set("overwrite", String(props.overwrite));
  formData.set("filename", props.filename);

  return new Promise((resolve, reject) => {
    axios
      .put("/api/sftp", { params: { oldUrl, newName, dir, isPublic } })
      .then(() => {
        return resolve("Filen har döpts om.");
      })
      .catch((error: Error) => {
        return reject(error.message);
      });
  });
};

export const handleCreateSftpFile = (
  props: createFileOnSftpClientType,
): Promise<string> => {
  const formData = new FormData();
  formData.set("file", props.file);
  formData.set("public", String(props.isPublic));
  formData.set("dir", props.dir);
  formData.set("overwrite", String(props.overwrite));
  formData.set("filename", props.filename);

  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: "/api/sftp",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        const responseData = response.data as SftpApiResponse;
        resolve(responseData.message || "Kunde inte hämta filens url.");
      })
      .catch((error: AxiosError) => {
        const errorMessage =
          (error.response?.data as { error?: string })?.error || "";
        reject(new Error(errorMessage));
      });
  });
};
