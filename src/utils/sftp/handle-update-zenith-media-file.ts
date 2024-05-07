import { env } from "~/env.mjs";
import { createZenithMediaFilename } from "~/utils/string-utils";
import { handleCreateZenithMediaFile } from "./handle-create-sftp-file";
import { handleDeleteSftpFile } from "./handle-delete-sftp-file";
import { handleRenameSftpFile } from "./handle-rename-sftp-file";

type HandleUpdateZenithMediaFileProps = {
  newFile: File | undefined;
  newTitle: string;
  newUrl: string | undefined;
  oldTitle: string;
  oldUrl: string;
};

export const handleUpdateZenithMediaFile = async ({
  oldUrl,
  newFile,
  newTitle,
  oldTitle,
  newUrl,
}: HandleUpdateZenithMediaFileProps): Promise<string> => {
  const hasNewFile = newFile !== undefined;
  const hasNewTitle = newTitle !== oldTitle;

  if (oldUrl.startsWith(env.NEXT_PUBLIC_SFTP_BASE_URL) && hasNewFile) {
    await handleDeleteSftpFile({ url: oldUrl }, true);
  }

  if (hasNewFile) {
    return await handleCreateZenithMediaFile({
      file: newFile,
      title: newTitle,
    });
  }

  if (hasNewTitle) {
    return await handleRenameSftpFile({
      oldUrl: oldUrl,
      newFilename: createZenithMediaFilename({
        title: newTitle,
        filename: oldUrl,
      }),
    });
  }

  return newUrl as string;
};
