import { Download } from "lucide-react";
import type { FC } from "react";
import { useState } from "react";
import type { Accept } from "react-dropzone";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { cn } from "~/utils/utils";
import { CropImageDialog } from "./crop-image-dialog";

type UploadAndCropButtonProps = {
  accept: Accept;
  circularCrop: boolean;
  disabled?: boolean;
  finalHeight: number;
  finalWidth: number;
  freeCrop: boolean;
  maxSize?: number;
  onComplete: (file: File) => void;
  ruleOfThirds: boolean;
};

export const UploadAndCropButton: FC<UploadAndCropButtonProps> = ({
  accept,
  finalHeight,
  finalWidth,
  onComplete,
  maxSize = 1024 * 1024 * 50, // 50 MB
  circularCrop,
  ruleOfThirds,
  freeCrop,
  disabled,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const {
    getInputProps,
    getRootProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    fileRejections,
  } = useDropzone({
    disabled,
    maxFiles: 1,
    multiple: false,
    maxSize: maxSize,
    accept: accept,
    onDrop: (acceptedFiles) => {
      if (fileRejections.length > 0 || !acceptedFiles[0]) {
        toast.error(`Kunde inte ladda upp filen. Försök igen!`);
        setSelectedFile(null);
        return;
      }

      const file = acceptedFiles[0];
      setSelectedFile(file);
      setOpen(true);
    },
  });

  const isFileTooLarge =
    fileRejections.length > 0 && fileRejections[0]!.file.size > maxSize;

  return (
    <>
      <div>
        <Button
          className="flex h-auto w-full flex-col rounded-lg border border-dashed border-zDarkGray/50 px-6 py-3"
          type="button"
          variant="outline"
          {...getRootProps()}
        >
          <input
            accept="image/*"
            className="hidden"
            type="file"
            {...getInputProps()}
          />
          <div className="flex h-8 w-8 items-center justify-center rounded-full">
            <Download />
          </div>
          <p className="mt-2 text-gray-700">Ladda upp bild</p>
          <p
            className={cn(
              "text-xs",
              isFileTooLarge || isDragReject ? "text-danger" : "text-gray-500",
            )}
          >
            {isFileTooLarge
              ? "File is too large"
              : isDragReject
                ? "Filen accepteras inte, försök med en annan fil"
                : isDragActive && isDragAccept
                  ? "Släpp för att ladda upp"
                  : "Släpp fil eller klicka"}
          </p>
        </Button>
      </div>
      {selectedFile && (
        <CropImageDialog
          circularCrop={circularCrop}
          finalHeight={finalHeight}
          finalWidth={finalWidth}
          freeCrop={freeCrop}
          onCancel={() => {
            setSelectedFile(null);
          }}
          onComplete={(croppedFile) => {
            setSelectedFile(null);
            onComplete(croppedFile);
          }}
          open={open}
          ruleOfThirds={ruleOfThirds}
          setOpen={setOpen}
          src={URL.createObjectURL(selectedFile)}
        />
      )}
    </>
  );
};
