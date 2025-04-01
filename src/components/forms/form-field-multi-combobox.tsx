import { Check, ChevronsUpDown } from "lucide-react";
import type { FieldValues, Path, PathValue } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ScrollArea } from "~/components/ui/scroll-area";
import type { IFormFieldMultiCombobox } from "~/types/form-types";
import { cn } from "~/utils/utils";

const FormFieldMultiCombobox = <TFieldValues extends FieldValues>({
  options,
  label,
  form,
  name,
  description,
  placeholder,
  disabled,
  serchText,
  noResultsText,
  resetButton,
}: IFormFieldMultiCombobox<TFieldValues>): React.JSX.Element => {
  return (
    <FormField
      control={form.control}
      disabled={disabled}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="flex flex-row gap-2">
            <Popover modal={true}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    className={cn(
                      "w-full justify-between",
                      !field.value.length && "text-muted-foreground",
                    )}
                    role="combobox"
                    variant="outline"
                  >
                    {field.value.length
                      ? field.value
                          .map(
                            (val: string) =>
                              options.find((option) => option.value === val)
                                ?.label,
                          )
                          .join(", ")
                      : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent side="bottom" sideOffset={4}>
                <Command>
                  <CommandInput placeholder={serchText} />
                  <ScrollArea className="h-48">
                    <CommandEmpty>{noResultsText}</CommandEmpty>
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          key={option.value}
                          onSelect={() => {
                            const newValue = field.value.includes(option.value)
                              ? field.value.filter(
                                  (val: string) => val !== option.value,
                                )
                              : [...field.value, option.value];
                            form.setValue(
                              name,
                              newValue as PathValue<
                                TFieldValues,
                                Path<TFieldValues>
                              >,
                            );
                          }}
                          value={option.label}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value.includes(option.value)
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </ScrollArea>
                </Command>
              </PopoverContent>
            </Popover>

            {resetButton && (
              <Button
                onClick={() =>
                  form.setValue(
                    name,
                    [] as PathValue<TFieldValues, Path<TFieldValues>>,
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

export default FormFieldMultiCombobox;
