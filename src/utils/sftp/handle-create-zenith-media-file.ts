import { createSFTPFilename } from "~/utils/string-utils";
import { handleCreateSftpFile } from "./api-calls";

type HandleCreateZenithMediaFileProps = {
  file: File;
  title: string;
};

export const handleCreateZenithMediaFile = async ({
  file,
  title,
}: HandleCreateZenithMediaFileProps): Promise<string> => {
  const filename = createSFTPFilename({ title, filename: file.name });

  return await handleCreateSftpFile({
    dir: "media",
    file: file,
    isPublic: true,
    overwrite: false,
    filename,
  });
};
