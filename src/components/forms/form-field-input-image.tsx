import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { FieldValues, Path, PathValue } from "react-hook-form";
import { UploadAndCropButton } from "~/components/cropper/upload-and-crop-button";
import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import type { IFormFieldInputImage } from "~/types/form-types";
import { cn } from "~/utils/utils";

/**
 * @description Form input which displays an image by either URL or by locally supplied file, and enables user to supply a file (but not to revert back to displaying by url).
 * @param name - name of form field for image file. Form field is only changed when user supplies (or removes) an image, even if an image is displayed by url.
 * @param imageFieldName - name of form field for image URL. Form field is `""` when image is removed, otherwise unchanged. This to create distinction from unchanged form with imageUrl.
 */
const FormFieldInputImage = <TFieldValues extends FieldValues>({
  label,
  description,
  name,
  disabled,
  maxHeight,
  maxWidth,
  quality,
  form,
  imageFieldName,
  circularCrop = false,
  ruleOfThirds = false,
  freeCrop = false,
}: IFormFieldInputImage<TFieldValues>): JSX.Element => {
  const initialImage = form.getValues(imageFieldName as Path<TFieldValues>);

  // Track both the displayed image and whether it was explicitly removed
  const [displayedImage, setDisplayedImage] = useState<File | string | null>(
    initialImage || null,
  );

  const scaledHeight = 200;
  const scaledWidth = (scaledHeight * maxWidth) / maxHeight;

  useEffect(() => {
    const subscription = form.watch(() => {
      const currentImageFile = form.getValues(name);
      const currentImage = form.getValues(imageFieldName as Path<TFieldValues>);

      if (!currentImageFile && currentImage === initialImage) {
        setDisplayedImage(initialImage || null);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, initialImage, imageFieldName, name]);

  const handleImageChange = (file: File | null): void => {
    // Update the file field
    form.setValue(name, file as PathValue<TFieldValues, Path<TFieldValues>>);

    // If removing image, also clear the image field
    if (file === null) {
      form.setValue(
        imageFieldName as Path<TFieldValues>,
        "" as PathValue<TFieldValues, Path<TFieldValues>>,
      );
    }
    setDisplayedImage(file);
  };

  const getImageSrc = (): string => {
    if (displayedImage instanceof File) {
      return URL.createObjectURL(displayedImage);
    }
    return displayedImage || "";
  };

  return (
    <FormField
      control={form.control}
      disabled={disabled}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          {displayedImage ? (
            <div className="relative">
              <Image
                alt="preview of image"
                className={cn(
                  "mx-auto object-contain object-center",
                  circularCrop && "rounded-full",
                )}
                height={maxHeight}
                quality={quality}
                src={getImageSrc()}
                style={{ height: scaledHeight, width: scaledWidth }}
                width={maxWidth}
              />
              <Button
                className="absolute top-0 h-6 w-6 rounded-full -translate-x-1/2 -translate-y-1/2"
                onClick={() => handleImageChange(null)}
                size="icon"
                style={{ left: `calc(50% + ${scaledWidth / 2}px)` }}
                variant="destructive"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Radera bild</span>
              </Button>
            </div>
          ) : (
            <FormControl>
              <UploadAndCropButton
                accept={{ "image/*": [] }}
                circularCrop={circularCrop}
                disabled={field.disabled}
                finalHeight={maxHeight}
                finalWidth={maxWidth}
                freeCrop={freeCrop}
                onComplete={handleImageChange}
                ruleOfThirds={ruleOfThirds}
              />
            </FormControl>
          )}
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldInputImage;
