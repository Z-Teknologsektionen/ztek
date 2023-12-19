import { clsx, type ClassValue } from "clsx";
import type { ChangeEvent } from "react";
import FileResizer from "react-image-file-resizer";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const getBase64WebPStringFromFileInput = async (
  e: ChangeEvent<HTMLInputElement>,
): Promise<string> => {
  const file = e.target?.files?.[0];
  if (!file) return "";

  const image: string = await new Promise((resolve) => {
    FileResizer.imageFileResizer(
      file,
      300,
      300,
      "WEBP",
      100,
      0,
      (uri) => {
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        resolve(uri.toString());
      },
      "base64",
      300,
      300,
    );
  });

  return image;
};
