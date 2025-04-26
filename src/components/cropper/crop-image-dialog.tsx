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

import { getDataURLForCropedImage } from "~/utils/get-data-url-for-croped-image";
import { SelectCropRadioGroup } from "./select-crop-radio-group";

type CropImageDialogProps = {
  circularCrop: boolean;
  finalHeight: number;
  finalWidth: number;
  freeCrop: boolean;
  onCancel?: () => void;
  onComplete: (base64: string) => void;
  open: boolean;
  quality: number;
  ruleOfThirds: boolean;
  setOpen: (open: boolean) => void;
  src: string;
};

export const CropImageDialog: FC<CropImageDialogProps> = ({
  finalHeight,
  finalWidth,
  onCancel,
  onComplete,
  quality,
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

    const dataUrl = getDataURLForCropedImage({
      image: imgRef.current,
      canvas: previewCanvasRef.current,
      crop: convertToPixelCrop(
        crop,
        imgRef.current.width,
        imgRef.current.height,
      ),
      width: finalWidth,
      height: finalHeight,
      quality,
      freeCrop,
    });

    onComplete(dataUrl);
  }, [crop, finalHeight, finalWidth, onCancel, onComplete, quality, freeCrop]);

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
