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
import type { IComboboxInput } from "~/types/form-types";
import { cn } from "~/utils/utils";

const ComboboxInput = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({
  options,
  emptyListText,
  label,
  form,
  name,
  description,
  placeholder,
  control = form.control,
  defaultValue,
  disabled,
  rules,
  shouldUnregister,
  serchText,
}: IComboboxInput<TFieldValues, TName>): React.JSX.Element => {
  return (
    <FormField
      control={control}
      defaultValue={defaultValue}
      disabled={disabled}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <div className="flex flex-row gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    className={cn(
                      "w-full justify-between",
                      !field.value && "text-muted-foreground",
                    )}
                    role="combobox"
                    variant="outline"
                  >
                    {field.value
                      ? options.find((option) => option.value === field.value)
                          ?.label
                      : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent side="bottom" sideOffset={4}>
                <Command>
                  <CommandInput placeholder={serchText} />
                  <CommandEmpty>{emptyListText}</CommandEmpty>
                  <ScrollArea className="h-40">
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          key={option.value}
                          onSelect={() => {
                            form.setValue(
                              name,
                              (field.value !== option.value
                                ? option.value
                                : "") as PathValue<TFieldValues, TName>,
                            );
                          }}
                          value={option.label}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              option.value === field.value
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

export default ComboboxInput;
