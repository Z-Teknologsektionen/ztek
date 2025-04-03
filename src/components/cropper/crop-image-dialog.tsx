import type { FC, ReactEventHandler } from "react";
import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import type { PercentCrop } from "react-image-crop";
import {
  ReactCrop,
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

import { SelectCropRadioGroup } from "./select-crop-radio-group";

type CropImageDialogProps = {
  circularCrop: boolean;
  finalHeight: number;
  finalWidth: number;
  freeCrop: boolean;
  onCancel?: () => void;
  onComplete: (file: File) => void;
  open: boolean;
  ruleOfThirds: boolean;
  setOpen: (open: boolean) => void;
  src: string;
};

export const CropImageDialog: FC<CropImageDialogProps> = ({
  finalHeight,
  finalWidth,
  onCancel,
  onComplete,
  src,
  open,
  setOpen,
  circularCrop,
  ruleOfThirds,
  freeCrop,
}) => {
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [aspectRatio, setAspectRatio] = useState<number | undefined>(
    freeCrop ? undefined : finalWidth / finalHeight,
  );
  const [crop, setCrop] = useState<PercentCrop>();

  const saveImage = useCallback(() => {
    if (
      imgRef.current === null ||
      previewCanvasRef.current === null ||
      crop === undefined
    ) {
      toast.error("Ett okänt fel har inträffat. Försök igen senare!");
      onCancel?.();
      return;
    }

    const canvas = previewCanvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) {
      toast.error("Kunde inte bearbeta bilden. Försök igen!");
      onCancel?.();
      return;
    }

    const image = imgRef.current;
    const pixelCrop = convertToPixelCrop(crop, image.width, image.height);

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Calculate the dimensions in the original image's resolution
    const cropX = pixelCrop.x * scaleX;
    const cropY = pixelCrop.y * scaleY;
    const cropWidth = pixelCrop.width * scaleX;
    const cropHeight = pixelCrop.height * scaleY;

    canvas.width = cropWidth;
    canvas.height = cropHeight;

    // Draw only the cropped portion at original resolution
    context.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight,
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          toast.error("Kunde inte skapa filen. Försök igen!");
          onCancel?.();
          return;
        }

        // Create a new canvas for resizing
        const resizeCanvas = document.createElement("canvas");
        resizeCanvas.width = finalWidth;
        resizeCanvas.height = finalHeight;
        const resizeContext = resizeCanvas.getContext("2d");

        if (!resizeContext) {
          toast.error("Kunde inte bearbeta bilden. Försök igen!");
          onCancel?.();
          return;
        }

        // Create a temporary image from the blob
        const tempImg = new Image();
        tempImg.onload = () => {
          resizeContext.drawImage(tempImg, 0, 0, finalWidth, finalHeight);

          resizeCanvas.toBlob(
            (resizedBlob) => {
              if (!resizedBlob) {
                toast.error("Kunde inte skapa filen. Försök igen!");
                onCancel?.();
                return;
              }

              const resizedFile = new File([resizedBlob], "resized-image.png", {
                type: resizedBlob.type,
              });
              onComplete(resizedFile);
            },
            "image/png",
            1.0,
          );
        };

        tempImg.src = URL.createObjectURL(blob);
      },
      "image/png",
      1.0,
    );
  }, [crop, onCancel, onComplete, finalHeight, finalWidth]);

  const imageScale = imgRef.current
    ? imgRef.current?.height / imgRef.current?.naturalHeight
    : 1;

  const onImageLoad: ReactEventHandler<HTMLImageElement> = useCallback(
    (e) => {
      const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

      if (aspectRatio === undefined)
        return setCrop({ width: 100, unit: "%", height: 100, x: 0, y: 0 });

      const newCrop = centerCrop(
        makeAspectCrop(
          {
            unit: "%",
            width: 100,
          },
          aspectRatio,
          width,
          height,
        ),
        width,
        height,
      );

      setCrop(newCrop);
    },
    [aspectRatio],
  );

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Beskär bild</DialogTitle>
          <DialogDescription>
            Redigera bilden som du önskar att den ska visas på hemsidan sen
          </DialogDescription>
        </DialogHeader>
        <ReactCrop
          aspect={aspectRatio}
          circularCrop={circularCrop}
          className={
            finalWidth / finalHeight > 1 ? "mx-auto w-72" : "mx-auto w-96"
          }
          crop={crop}
          minHeight={finalHeight * imageScale}
          minWidth={finalWidth * imageScale}
          onChange={(_, c) => setCrop(c)}
          ruleOfThirds={ruleOfThirds}
          keepSelection
        >
          <canvas ref={previewCanvasRef} className="hidden" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            alt="cropper"
            className="max-h-80"
            onLoad={onImageLoad}
            src={src}
          />
        </ReactCrop>
        {freeCrop && crop && (
          <div>
            <SelectCropRadioGroup
              crop={crop}
              imgRef={imgRef}
              setAspectRatio={setAspectRatio}
              setCrop={setCrop}
            />
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onCancel} variant="outline">
              Avbryt
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={saveImage} variant="default">
              Beskär bild
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
