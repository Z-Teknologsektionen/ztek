import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
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

const FormFieldInputImage = <TFieldValues extends FieldValues>({
  label,
  description,
  name,
  disabled,
  maxHeight,
  maxWidth,
  quality,
  form,
  circularCrop = false,
  ruleOfThirds = false,
  freeCrop = false,
}: IFormFieldInputImage<TFieldValues>): JSX.Element => {
  const [image, setImage] = useState<string>(form.getValues(name));

  const scaledHeight = 200;
  const scaledWidth = (scaledHeight * maxWidth) / maxHeight;

  const setValue = (value: string): void => {
    setImage(value);
    form.setValue(name, value as PathValue<TFieldValues, Path<TFieldValues>>);
  };

  return (
    <FormField
      control={form.control}
      disabled={disabled}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          {image !== "" && (
            <div className="relative">
              <Image
                alt="preview of image"
                className={cn(
                  "mx-auto object-contain object-center",
                  circularCrop && "rounded-full",
                )}
                height={maxHeight}
                quality={quality}
                src={image}
                style={{ height: scaledHeight, width: scaledWidth }}
                width={maxWidth}
              />
              <Button
                className="absolute top-0 h-6 w-6 rounded-full -translate-x-1/2 -translate-y-1/2"
                size="icon"
                style={{ left: `calc(50% + ${scaledWidth / 2}px)` }}
                variant="destructive"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Radera bild</span>
              </Button>
            </div>
          )}
          <FormControl>
            <UploadAndCropButton
              accept={{ "image/*": [] }}
              circularCrop={circularCrop}
              disabled={field.disabled}
              finalHeight={maxHeight}
              finalWidth={maxWidth}
              freeCrop={freeCrop}
              onComplete={setValue}
              quality={quality}
              ruleOfThirds={ruleOfThirds}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldInputImage;
