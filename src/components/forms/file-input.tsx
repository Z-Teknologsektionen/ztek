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
            <div className="flex w-auto gap-2">
              <Input
                {...field}
                {...rest}
                accept={accept}
                className={cn("hover:cursor-pointer", className)}
                onChange={(e) => {
                  if (e.target?.files?.[0]) {
                    const filesArray = Array.from(e.target.files);
                    field.onChange(filesArray);
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
