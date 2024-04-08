import Image from "next/image";
import type React from "react";
import { useState } from "react";
import { type FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import type { IFormFieldFileInput } from "~/types/form-types";
import { cn } from "~/utils/utils";

export const FormFieldFileInput = <TFieldValues extends FieldValues>({
  label,
  description,
  name,
  form,
  className,
  disabled,
  accept = "image/*, application/pdf",
}: IFormFieldFileInput<TFieldValues>): React.JSX.Element => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  return (
    <FormField
      control={form.control}
      disabled={disabled}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex w-auto flex-col items-center gap-2">
              {previewUrl &&
                (fileType === "application/pdf" ? (
                  <object
                    data={previewUrl}
                    height="200px"
                    type="application/pdf"
                    width="100%"
                  >
                    Preview not available
                  </object>
                ) : (
                  <Image
                    alt="Preview"
                    className=""
                    height={200}
                    src={previewUrl}
                    width={300}
                  />
                ))}

              <Input
                {...field}
                accept={accept}
                className={cn(
                  "text-transparent hover:cursor-pointer",
                  className,
                )}
                onChange={(e) => {
                  if (e.target?.files?.[0]) {
                    const filesArray = Array.from(e.target.files);
                    field.onChange(filesArray);
                    setFileType(e.target.files[0].type);
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
    />
  );
};
