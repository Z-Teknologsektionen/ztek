import { IconEnum } from "@prisma/client";
import type { ReactNode } from "react";
import type { FieldValues } from "react-hook-form";
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
import type { IFormFieldDefaults } from "~/types/form-types";
import {
  getSocialIconFromEnum,
  getSocialNameFromEnum,
} from "~/utils/get-social-from-enum";

const FormFieldSelectCommitteeSocialIcon = <TFieldValues extends FieldValues>({
  label,
  name,
  description,
  disabled,
  form,
}: IFormFieldDefaults<TFieldValues>): ReactNode => {
  return (
    <FormField
      control={form.control}
      disabled={disabled}
      name={name}
      // Här vet bara GUD varför ref inte ska skickas in till select ger galen error i consol om man skickar in och fungerar fin fint utan
      render={({ field: { ref: _ref, ...field } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select {...field} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Välj en ikon" />
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
    />
  );
};

export default FormFieldSelectCommitteeSocialIcon;
