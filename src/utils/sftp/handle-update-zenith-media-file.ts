import { env } from "~/env.mjs";
import { createSFTPFilename } from "~/utils/string-utils";
import { handleDeleteSftpFile, handleRenameSftpFile } from "./api-calls";
import { handleCreateZenithMediaFile } from "./handle-create-zenith-media-file";

export const handleUpdateZenithMediaFile = async ({
  oldUrl,
  newUrl,
  newFile,
  newTitle,
  oldTitle,
}: {
  newFile: File | undefined;
  newTitle: string;
  newUrl: string | undefined;
  oldTitle: string;
  oldUrl: string;
}): Promise<string | undefined> => {
  if (oldUrl.startsWith(env.NEXT_PUBLIC_SFTP_BASE_URL) && oldUrl !== newUrl) {
    await handleDeleteSftpFile(oldUrl);
  }

  if (newFile !== undefined) {
    newUrl = await handleCreateZenithMediaFile({
      file: newFile,
      title: newTitle,
    });
  } else if (newTitle !== oldTitle) {
    newUrl = await handleRenameSftpFile({
      oldUrl: oldUrl,
      newName: createSFTPFilename({
        title: newTitle,
        filename: oldUrl,
      }),
    }).then((val) => val.replace("https:/", "https://")); //Fråga inte ens...
  }

  return newUrl;
};
