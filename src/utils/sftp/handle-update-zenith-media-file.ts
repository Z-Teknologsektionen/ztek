import { env } from "~/env.mjs";
import { createZenithMediaFilename } from "~/utils/string-utils";
import { handleDeleteSftpFile, handleRenameSftpFile } from "./api-calls";
import { handleCreateZenithMediaFile } from "./handle-create-zenith-media-file";

type HandleUpdateZenithMediaFileProps = {
  newFile: File | undefined;
  newTitle: string;
  oldTitle: string;
  oldUrl: string;
};

export const handleUpdateZenithMediaFile = async ({
  oldUrl,
  newFile,
  newTitle,
  oldTitle,
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

  throw new Error("Okänt fel!");
};
