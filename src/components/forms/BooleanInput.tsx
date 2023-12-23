import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface IBooleanInput {
  description?: string;
  label: string;
  name: string;
}

export const BooleanInput: FC<IBooleanInput> = ({
  label,
  name,
  description,
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              {description && <FormDescription>{description}</FormDescription>}
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
