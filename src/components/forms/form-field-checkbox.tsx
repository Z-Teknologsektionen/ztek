import type { FieldValues } from "react-hook-form";
import { Checkbox } from "~/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import type { IFormFieldCheckbox } from "~/types/form-types";

const FormFieldCheckbox = <TFieldValues extends FieldValues>({
  label,
  description,
  name,
  disabled,
  form,
}: IFormFieldCheckbox<TFieldValues>): JSX.Element => {
  return (
    <FormField
      control={form.control}
      disabled={disabled}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                {...field}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormDescription>{description}</FormDescription>
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldCheckbox;
