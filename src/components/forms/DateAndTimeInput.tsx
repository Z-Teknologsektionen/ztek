import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "~/utils/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface IDateAndTimeInput {
  description?: string;
  label: string;
  name: string;
}

export const DateAndTimeInput: FC<IDateAndTimeInput> = ({
  label,
  name,
  description,
}) => {
  const { control } = useFormContext();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  className={cn(
                    " pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                  variant={"outline"}
                >
                  {field.value ? (
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    format(field.value, "PPPP", { locale: sv })
                  ) : (
                    <span>Välj ett datum</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                disabled={(date) => date < today}
                locale={sv}
                mode="single"
                onSelect={field.onChange}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                selected={field.value}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {/* <div className=""> */}
          {field.value && (
            <div>
              <Input
                className=""
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                defaultValue={format(field.value, "HH:mm")}
                max={"23:59"}
                min={"00:00"}
                onChange={(event) => {
                  const timeString = event.target.value;
                  const isValidTime = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(
                    timeString,
                  );
                  if (isValidTime) {
                    const [hour, min] = timeString.split(":").map(Number);
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                    field.value.setHours(hour, min);
                  } else {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                    field.value.setHours(0, 0);
                    // field.value = undefined;
                  }
                }}
                type={"time"}
              />
              <FormDescription>
                Om en korrekt tid ej har valts så kommer tiden sättas till 00:00
              </FormDescription>
            </div>
          )}
          {/* </div> */}
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
