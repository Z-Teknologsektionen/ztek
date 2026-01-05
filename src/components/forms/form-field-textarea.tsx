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
import { Textarea } from "~/components/ui/textarea";
import type { IFormFieldTextArea } from "~/types/form-types";

const FormFieldTextArea = <TFieldValues extends FieldValues>({
  label,
  name,
  description,
  disabled,
  form,
  className,
}: IFormFieldTextArea<TFieldValues>): JSX.Element => {
  return (
    <FormField
      control={form.control}
      disabled={disabled}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea {...field} className={className} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldTextArea;
