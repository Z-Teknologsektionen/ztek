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
import type { IFormFieldMultiCheckbox } from "~/types/form-types";
import { cn } from "~/utils/utils";

export const FormFieldMultiCheckbox = <TFieldValues extends FieldValues>({
  description,
  form,
  label,
  name,
  disabled,
  items,
  horizontal,
}: IFormFieldMultiCheckbox<TFieldValues>): JSX.Element => {
  return (
    <FormField
      control={form.control}
      disabled={disabled}
      name={name}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <div
            className={cn(
              "flex flex-col gap-1.5",
              horizontal && "flex-row items-center justify-center gap-4",
            )}
          >
            {items.map((item) => (
              <FormField
                key={item.value}
                control={form.control}
                disabled={disabled}
                name={name}
                render={({ field }) => {
                  const typedFieldValue = field.value as
                    | (string | number)[]
                    | undefined;
                  return (
                    <FormItem
                      key={item.value}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={typedFieldValue?.includes(item.value)}
                          onCheckedChange={(checked) => {
                            if (typedFieldValue === undefined)
                              return [item.value];

                            return checked
                              ? field.onChange([...typedFieldValue, item.value])
                              : field.onChange(
                                  typedFieldValue?.filter(
                                    (value) => value !== item.value,
                                  ),
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
