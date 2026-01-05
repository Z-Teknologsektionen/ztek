import type { JSX } from "react";
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
import type { IFormFieldInputNumber } from "~/types/form-types";

const FormFieldInputNumber = <TFieldValues extends FieldValues>({
  label,
  name,
  description,
  disabled,
  form,
  max,
  min,
}: IFormFieldInputNumber<TFieldValues>): JSX.Element => {
  return (
    <FormField
      control={form.control}
      disabled={disabled}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              max={max}
              min={min}
              onChange={(event) => field.onChange(Number(event.target.value))}
              type="number"
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldInputNumber;
