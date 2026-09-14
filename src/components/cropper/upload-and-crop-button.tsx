import { Download } from "lucide-react";
import type { FC } from "react";
import { useState } from "react";
import type { Accept } from "react-dropzone";
import { ErrorCode, useDropzone } from "react-dropzone";
import { Button } from "~/components/ui/button";
import { MAX_SFTP_FILE_SIZE } from "~/constants/sftp";
import { cn } from "~/utils/utils";
import { CropImageDialog } from "./crop-image-dialog";

type UploadAndCropButtonProps = {
  accept: Accept;
  circularCrop: boolean;
  disabled?: boolean;
  finalHeight: number;
  finalWidth: number;
  freeCrop: boolean;
  maxSizeBytes?: number;
  onComplete: (file: File) => void;
  ruleOfThirds: boolean;
};

export const UploadAndCropButton: FC<UploadAndCropButtonProps> = ({
  accept,
  finalHeight,
  finalWidth,
  onComplete,
  maxSizeBytes = MAX_SFTP_FILE_SIZE /* Allow files as large as our API will anyway */,
  circularCrop,
  ruleOfThirds,
  freeCrop,
  disabled,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [open, setOpen] = useState<boolean>(false); //cropper dialog's open state

  const {
    getInputProps,
    getRootProps,
    isDragActive /* as `isDragAccept` and `isDragReject` may be true after the end of drag-drop operation, also check `isDragActive`*/,
    isDragAccept /* hovered payload will likely be accepted, but file size is not known until file is dropped*/,
    isDragReject /* hovered payload will likely be rejected. HTML <img/> element inside MIME-field "text/html" is an exception. i.e. we don't know for sure abt file rejections until file is dropped*/,
    fileRejections /* dropped files who were fur sure rejected */,
  } = useDropzone({
    disabled,
    maxFiles: 1,
    multiple: false,
    maxSize: maxSizeBytes,
    accept: accept,
    onDrop: (acceptedFiles) => {
      if (!acceptedFiles[0]) {
        setSelectedFile(null);
        return;
      }

      const file = acceptedFiles[0]; // since `maxFiles`=1, the array will never be longer
      setSelectedFile(file);
      setOpen(true);
    },
  });

  const errorCode: string | null =
    fileRejections.length > 0
      ? fileRejections[0]?.errors[0]?.code || "unknown error"
      : null;

  const message: string = (() => {
    // prioritize hover message
    if (isDragActive && isDragAccept) return "Släpp fil";
    if (isDragActive && isDragReject) return "(｡>﹏<)";

    //else pick message from current error state
    switch (errorCode) {
      case null:
        return "Släpp fil eller klicka";
      case ErrorCode.FileInvalidType:
        return "Ogiltig filtyp";
      case ErrorCode.FileTooLarge:
        return `Filen är för stor. Filer mindre än ${Math.floor(maxSizeBytes / 1024)} kiB accepteras.`;
      case ErrorCode.TooManyFiles:
        return "Flera filer accepteras inte";
      default:
        return "Oväntat fel, försök med en annan fil";
    }
  })();

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
              !isDragActive && errorCode ? "text-danger" : "text-gray-500",
            )}
          >
            {message}
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
