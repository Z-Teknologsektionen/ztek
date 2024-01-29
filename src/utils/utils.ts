import { clsx, type ClassValue } from "clsx";
import type { ChangeEvent } from "react";
import FileResizer from "react-image-file-resizer";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const getBase64WebPStringFromFileInput = async (
  e: ChangeEvent<HTMLInputElement>,
  maxHeight: number = 300,
  maxWeight: number = 300,
  quality: number = 95,
): Promise<string> => {
  const file = e.target?.files?.[0];
  if (!file) return "";

  const image: string = await new Promise((resolve) => {
    FileResizer.imageFileResizer(
      file,
      maxHeight,
      maxWeight,
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
