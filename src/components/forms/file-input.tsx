import { useFormContext, type FieldValues, type Path } from "react-hook-form";
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
import { getBase64FromFile } from "~/utils/get-base64-from-file";
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
  const form = useFormContext();
  const setValue = (value: string): void => {
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
          <FormControl>
            <div className="flex w-auto gap-2">
              <Input
                {...field}
                {...rest}
                accept={accept}
                className={cn("hover:cursor-pointer", className)}
                onChange={(event) => {
                  if (event.target?.files?.[0]) {
                    getBase64FromFile(event.target?.files?.[0])
                      .then((result) => setValue(result))
                      .catch(() => {
                        form.setValue(name as string, "");
                      });
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
