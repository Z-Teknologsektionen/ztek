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
import { Input } from "../ui/input";

interface INumberInput {
  description?: string;
  label: string;
  max: number;
  min: number;
  name: string;
  placeholder?: string;
}

export const NumberInput: FC<INumberInput> = ({
  label,
  name,
  description,
  placeholder,
  min,
  max,
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              defaultValue={1}
              max={max}
              min={min}
              placeholder={placeholder}
              type="number"
              {...field}
              onChange={(event) => field.onChange(Number(event.target.value))}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
