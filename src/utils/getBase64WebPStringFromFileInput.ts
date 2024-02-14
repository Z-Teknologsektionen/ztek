import type { ChangeEvent } from "react";
import FileResizer from "react-image-file-resizer";

export const getBase64WebPStringFromFileInput = async ({
  event: e,
  maxHeight,
  maxWidth,
  quality,
}: {
  event: ChangeEvent<HTMLInputElement>;
  maxHeight: number;
  maxWidth: number;
  quality: number;
}): Promise<string> => {
  const file = e.target?.files?.[0];
  if (!file) return "";

  const image: string = await new Promise((resolve) => {
    FileResizer.imageFileResizer(
      file,
      maxHeight,
      maxWidth,
      "WEBP",
      quality,
      0,
      (uri) => {
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        resolve(uri.toString());
      },
      "base64",
    );
  });

  return image;
};
