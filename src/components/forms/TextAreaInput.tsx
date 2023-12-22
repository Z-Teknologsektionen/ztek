import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

interface ITextAreaInput {
  description?: string;
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
}

export const TextAreaInput: FC<ITextAreaInput> = ({
  label,
  name,
  description,
  placeholder,
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
            <Textarea placeholder={placeholder} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
};
