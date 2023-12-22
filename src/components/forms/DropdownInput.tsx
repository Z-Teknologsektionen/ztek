import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface IDropdownInput {
  description?: string;
  label: string;
  mappable?: Array<{ id: string; name: string }>;
  name: string;
  placeholder?: string;
}

export const DropdownInput: FC<IDropdownInput> = ({
  label,
  name,
  description,
  placeholder,
  mappable,
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            defaultValue={field.value}
            onValueChange={field.onChange}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {mappable?.map(({ id, name: displayName }) => (
                <SelectItem key={id} value={id}>
                  {displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
