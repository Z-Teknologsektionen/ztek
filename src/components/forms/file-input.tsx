import Image from "next/image";
import { useState } from "react";
import { type FieldValues, type Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import type { IFileInput } from "~/types/form-types";
import { cn } from "~/utils/utils";

export const FileInput = <
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
  accept = "image/png, image/jpeg, application/pdf",
  ...rest
}: IFileInput<TFieldValues, TName>): JSX.Element => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  return (
    <FormField
      control={control}
      defaultValue={defaultValue}
      disabled={disabled}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex w-auto flex-col gap-2">
              {previewUrl &&
                (accept.includes("application/pdf") ? (
                  <object
                    data={previewUrl}
                    height="200px"
                    type="application/pdf"
                    width="100%"
                  >
                    Preview not available
                  </object>
                ) : (
                  <Image alt="Preview" src={previewUrl} />
                ))}

              <Input
                {...field}
                {...rest}
                accept={accept}
                className={cn(
                  "text-transparent hover:cursor-pointer",
                  className,
                )}
                onChange={(e) => {
                  if (e.target?.files?.[0]) {
                    const filesArray = Array.from(e.target.files);
                    field.onChange(filesArray);
                    const url = URL.createObjectURL(e.target.files[0]);
                    setPreviewUrl(url);
                  }
                }}
                type="file"
                value={""}
              />
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
