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
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { IFormFieldSelect } from "~/types/form-types";
import { cn } from "~/utils/utils";

const FormFieldSelect = <TFieldValues extends FieldValues>({
  label,
  form,
  name,
  description,
  placeholder,
  disabled,
  options,
  resetButton,
  scrollArea = options.length > 8, // 6 är antalet som får plats när h-48 används
}: IFormFieldSelect<TFieldValues>): JSX.Element => {
  return (
    <FormField
      control={form.control}
      disabled={disabled}
      name={name}
      // Här vet bara GUD varför ref inte ska skickas in till select ger galen error i consol om man skickar in och fungerar fin fint utan
      render={({ field: { ref: _ref, ...field } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="flex flex-row gap-2">
            <Select
              {...field}
              defaultValue={field.value}
              onValueChange={field.onChange}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <ScrollArea className={cn(scrollArea && "h-48")}>
                  <SelectGroup>
                    {options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </ScrollArea>
              </SelectContent>
            </Select>
            {resetButton && (
              <Button
                onClick={() =>
                  form.setValue(
                    name,
                    "" as PathValue<TFieldValues, Path<TFieldValues>>,
                  )
                }
                type="button"
                variant="ghost"
              >
                Rensa
              </Button>
            )}
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldSelect;
