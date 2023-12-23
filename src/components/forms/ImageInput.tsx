import { useState } from "react";
import type { FieldValues, Path } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { cn, getBase64WebPStringFromFileInput } from "~/utils/utils";
import CommitteeImage from "../committees/CommitteeImage";
import { Button } from "../ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import type { IImageInput } from "./types";

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
  defaultImage = "",
  ...rest
}: IImageInput<TFieldValues, TName>): JSX.Element => {
  const [newImage, setNewImage] = useState<string>(defaultImage);
  const form = useFormContext();

  return (
    <FormField
      control={control}
      defaultValue={defaultValue}
      disabled={disabled}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <CommitteeImage alt="" filename={newImage} />
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
                  getBase64WebPStringFromFileInput(event)
                    .then((val) => {
                      setNewImage(val);
                      form.setValue("image", val);
                    })
                    .catch(() => {
                      setNewImage("");
                      form.setValue("image", "");
                    });
                }}
                type="file"
                value={""}
              />
              <Button
                className="w-[25%]"
                onClick={() => {
                  setNewImage("");
                  form.setValue("image", "");
                }}
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
