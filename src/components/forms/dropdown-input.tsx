import type { FieldValues, Path, PathValue } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { IDropdownInput } from "~/types/form-types";

export const DropdownInput = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({
  label,
  form,
  name,
  description,
  placeholder,
  mappable,
  control = form.control,
  defaultValue,
  disabled,
  rules,
  shouldUnregister,
  ...rest
}: IDropdownInput<TFieldValues, TName>): JSX.Element => {
  return (
    <FormField
      control={control}
      defaultValue={defaultValue}
      disabled={disabled}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="flex flex-row gap-2">
            <Select
              {...field}
              defaultValue={field.value}
              onValueChange={field.onChange}
              {...rest}
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
            <Button
              onClick={() =>
                form.setValue(name, "" as PathValue<TFieldValues, TName>)
              }
              type="button"
              variant="ghost"
            >
              Rensa
            </Button>
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
      rules={rules}
      shouldUnregister={shouldUnregister}
    />
  );
};
