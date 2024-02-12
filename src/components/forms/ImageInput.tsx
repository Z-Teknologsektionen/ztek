import Image from "next/image";
import { useState } from "react";
import type { FieldValues, Path } from "react-hook-form";
import { useFormContext } from "react-hook-form";
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
import { cn, getBase64WebPStringFromFileInput } from "~/utils/utils";
import type { IImageInput } from "./form-types";

export const ImageInput = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({
  label,
  description,
  name,
  control,
  defaultValue,
  disabled,
  shouldUnregister,
  rules,
  className,
  accept = "image/png, image/jpeg",
  maxHeight = 300,
  maxWidth = 300,
  quality = 85,
  ...rest
}: IImageInput<TFieldValues, TName>): JSX.Element => {
  const [newImage, setNewImage] = useState<string>(
    control._defaultValues[name] as string,
  );
  const form = useFormContext();

  const scaledHeight = 300;
  const scaledWidth = (300 * maxWidth) / maxHeight;

  const setValue = (value: string): void => {
    setNewImage(value);
    form.setValue(name as string, value);
  };

  return (
    <FormField
      control={control}
      defaultValue={defaultValue}
      disabled={disabled}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Image
            alt="Image preview"
            className={cn(
              "mx-auto object-cover object-center",
              "text-transparent",
              "after:relative after:-top-6 after:z-10 after:grid after:h-full after:max-h-64 after:min-h-[8rem] after:w-full after:place-content-center after:truncate after:text-center after:text-xl after:text-black after:content-['Ladda_upp_bild']",
            )}
            height={maxHeight}
            quality={quality}
            src={newImage}
            style={{ height: scaledHeight, width: scaledWidth }}
            width={maxWidth}
          />
          <FormControl>
            <div className="flex w-auto gap-2">
              <Input
                {...field}
                {...rest}
                accept={accept}
                className={cn(
                  "text-transparent hover:cursor-pointer",
                  className,
                )}
                onChange={(event) => {
                  getBase64WebPStringFromFileInput(
                    event,
                    maxHeight,
                    maxWidth,
                    quality,
                  )
                    .then((val) => setValue(val))
                    .catch(() => setValue(""));
                }}
                type="file"
                value={""}
              />
              <Button
                className="w-[25%]"
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
      rules={rules}
      shouldUnregister={shouldUnregister}
    />
  );
};
