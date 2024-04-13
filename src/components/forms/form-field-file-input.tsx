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
  const [file, setFile] = useState<File | null>(null);

  const previewUrl = file !== null ? URL.createObjectURL(file) : "";
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
                (file?.type === "application/pdf" ? (
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
                  const newFile = e.target.files?.item(0);
                  if (newFile !== null && newFile !== undefined) {
                    field.onChange(newFile);
                    setFile(newFile);
                  } else {
                    field.onChange(null);
                    setFile(null);
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
