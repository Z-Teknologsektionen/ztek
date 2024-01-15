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
import type { INumberInput } from "./types";

export const NumberInput = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({
  label,
  name,
  description,
  control,
  defaultValue,
  disabled,
  rules,
  shouldUnregister,
  ...rest
}: INumberInput<TFieldValues, TName>): JSX.Element => {
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
            <Input
              {...field}
              {...rest}
              onChange={(event) => field.onChange(Number(event.target.value))}
              type="number"
            />
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
