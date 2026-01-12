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
          <div className="flex flex-row items-center gap-4 rounded-md border p-3">
            <FormControl>
              <Checkbox
                {...field}
                checked={field.value}
                className="h-5 w-5"
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 text-sm leading-none">
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
