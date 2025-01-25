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

const FormFieldInputDatetimeLocal = <TFieldValues extends FieldValues>({
  label,
  description,
  name,
  disabled,
  form,
}: IFormFieldInputDatetimeLocal<TFieldValues>): JSX.Element => {
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
                field.onChange(value !== "" ? value + ":00.000Z" : "");
              }}
              type="datetime-local"
              value={(form.getValues(name) || "").slice(0, -8)}
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
