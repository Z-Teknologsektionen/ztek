import type { PixelCrop } from "react-image-crop";

type GetDataURLForCropedImageProps = {
  canvas: HTMLCanvasElement;
  crop: PixelCrop;
  freeCrop: boolean;
  height: number;
  image: HTMLImageElement;
  quality: number;
  type?: string;
  width: number;
};

export const getDataURLForCropedImage = ({
  canvas,
  crop,
  height,
  image,
  quality,
  type = "image/webp",
  width,
  freeCrop,
}: GetDataURLForCropedImageProps): string => {
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  ctx.imageSmoothingQuality = "high";

  if (freeCrop) {
    const aspectRatio = crop.width / crop.height;
    const isMaxWidth = Math.max(crop.width, crop.height) === crop.width;

    canvas.width = isMaxWidth ? width : height * aspectRatio;
    canvas.height = isMaxWidth ? height / aspectRatio : height;
  } else {
    canvas.width = width;
    canvas.height = height;
  }

  ctx.save();

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    canvas.width,
    canvas.height,
  );

  ctx.restore();

  const dataUrl = canvas.toDataURL(type, quality);

  return dataUrl;
};
