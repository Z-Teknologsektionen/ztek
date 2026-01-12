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
import type { IFormFieldInputDatetimeLocal } from "~/types/form-types";
import { dayjs } from "~/utils/dayjs";

const FormFieldInputDatetimeLocal = <TFieldValues extends FieldValues>({
  label,
  description,
  name,
  disabled,
  form,
}: IFormFieldInputDatetimeLocal<TFieldValues>): JSX.Element => {
  const [formattedValue, setFormattedValue] = useState(
    form.getValues(name)
      ? dayjs(form.getValues(name)).format("YYYY-MM-DDTHH:mm")
      : "",
  );

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
              onChange={(event) => {
                const value = event.target.value;
                setFormattedValue(value);
                field.onChange(
                  value !== "" ? new Date(value).toISOString() : "",
                );
              }}
              type="datetime-local"
              value={formattedValue}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldInputDatetimeLocal;
