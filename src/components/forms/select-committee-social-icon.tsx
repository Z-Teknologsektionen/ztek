import { IconEnum } from "@prisma/client";
import type { ReactNode } from "react";
import type { FieldValues, Path } from "react-hook-form";
import type { IBasicFormField } from "~/components/forms/form-types";
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
import {
  getSocialIconFromEnum,
  getSocialNameFromEnum,
} from "~/utils/getSocialFromEnum";

const SelectCommitteeSocialIcon = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({
  control,
  label,
  name,
  defaultValue,
  description,
  disabled,
  rules,
  shouldUnregister,
}: IBasicFormField<TFieldValues, TName>): ReactNode => {
  return (
    <FormField
      control={control}
      disabled={disabled}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              {...field}
              defaultValue={defaultValue}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Välj en icon" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-48">
                  <SelectGroup>
                    {Object.values(IconEnum).map((icon) => {
                      const Icon = getSocialIconFromEnum(icon);
                      const iconName = getSocialNameFromEnum(icon);
                      return (
                        <SelectItem key={icon} value={icon}>
                          <div className="flex flex-row items-center gap-2">
                            <Icon />
                            <p>{iconName}</p>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </ScrollArea>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
      rules={rules}
      shouldUnregister={shouldUnregister}
    />
  );
};

export default SelectCommitteeSocialIcon;
