import Image from "next/image";
import { useState } from "react";
import type { FieldValues, Path, PathValue } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import type { IFormFieldInputImage } from "~/types/form-types";
import { getBase64WebPStringFromFileInput } from "~/utils/get-base64-webp-string-from-file-input";
import { cn } from "~/utils/utils";

const FormFieldInputImage = <TFieldValues extends FieldValues>({
  label,
  description,
  name,
  disabled,
  maxHeight,
  maxWidth,
  quality,
  containImage = false,
  form,
  className,
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
            <Image
              alt="preview of image"
              className={cn(
                "mx-auto object-center",
                containImage ? "object-contain" : "object-cover",
                "text-transparent",
                "after:relative after:-top-6 after:z-10 after:grid after:h-full after:max-h-64 after:min-h-[8rem] after:w-full after:place-content-center after:truncate after:text-center after:text-xl after:text-black after:content-['Ladda_upp_bild']",
              )}
              height={maxHeight}
              quality={quality}
              src={image}
              style={{ height: scaledHeight, width: scaledWidth }}
              width={maxWidth}
            />
          )}
          <FormControl>
            <div className="flex w-auto gap-2">
              <Input
                {...field}
                accept="image/*"
                className={cn(
                  "text-transparent hover:cursor-pointer",
                  className,
                )}
                onChange={(event) => {
                  getBase64WebPStringFromFileInput({
                    event,
                    maxHeight,
                    maxWidth,
                    quality,
                  })
                    .then((val) => setValue(val))
                    .catch(() => setValue(""));
                }}
                type="file"
                value={""}
              />
              <Button
                onClick={() => setValue("")}
                type="button"
                variant="ghost"
              >
                Rensa bild
              </Button>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldInputImage;
