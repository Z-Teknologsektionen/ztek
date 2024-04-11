import Image from "next/image";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import type { IFormFieldUrlMediaWithPreview } from "~/types/form-types";
import { cn } from "~/utils/utils";

const FormFieldUrlMediaWithPreview = <TFieldValues extends FieldValues>({
  label,
  description,
  name,
  disabled,
  form,
  className,
}: IFormFieldUrlMediaWithPreview<TFieldValues>): JSX.Element => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
              {previewUrl && (
                <Image
                  alt="Preview"
                  className=""
                  height={200}
                  src={previewUrl}
                  width={300}
                  unoptimized
                />
              )}

              <Input
                {...field}
                className={cn("", className)}
                onChange={(e) => {
                  if (e.target?.value) {
                    setPreviewUrl(e.target?.value);
                  }
                }}
                type="url"
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

export default FormFieldUrlMediaWithPreview;
