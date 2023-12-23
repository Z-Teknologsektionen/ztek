import type { FieldValues, Path } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import type { IBooleanInput } from "./types";

export const BooleanInput = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({
  label,
  description,
  name,
  control,
  checkboxProps,
  formControlProps,
  formItemProps,
  formLabelProps,
  defaultValue,
  disabled,
  shouldUnregister,
  rules,
}: IBooleanInput<TFieldValues, TName>): JSX.Element => {
  return (
    <FormField
      control={control}
      defaultValue={defaultValue}
      disabled={disabled}
      name={name}
      render={({ field }) => (
        <FormItem {...formItemProps}>
          <FormLabel {...formLabelProps}>{label}</FormLabel>
          <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl {...formControlProps}>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                {...checkboxProps}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              {description && <FormDescription>{description}</FormDescription>}
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
      rules={rules}
      shouldUnregister={shouldUnregister}
    />
  );
};
