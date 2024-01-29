import type { FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import type { ITextAreaInput } from "./form-types";

export const TextAreaInput = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({
  label,
  name,
  description,
  defaultValue,
  disabled,
  rules,
  shouldUnregister,
  control,
  ...rest
}: ITextAreaInput<TFieldValues, TName>): JSX.Element => {
  return (
    <FormField
      control={control}
      defaultValue={defaultValue}
      disabled={disabled}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea {...field} {...rest} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
      rules={rules}
      shouldUnregister={shouldUnregister}
    />
  );
};
