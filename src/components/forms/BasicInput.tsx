import type { FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import type { ITextInput } from "./types";

export const BasicInput = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({
  label,
  name,
  description,
  defaultValue,
  disabled,
  rules,
  shouldUnregister,
  control,
  type = "text",
  ...rest
}: ITextInput<TFieldValues, TName>): JSX.Element => {
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
            <Input {...field} {...rest} type={type} />
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
