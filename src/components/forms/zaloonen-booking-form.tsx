import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import type { NextPage } from "next";
import { useForm, useFormContext } from "react-hook-form";
import { MdCalendarMonth } from "react-icons/md";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { toast } from "~/components/ui/use-toast";
import { cn } from "~/utils/utils";
import SecondaryTitle from "../layout/SecondaryTitle";
import { Calendar } from "../ui/calendar";

const formSchema = z.object({
  eventName: z.string().min(2, {
    message: "Du måste specificera ett namn på eventet.",
  }),
  eventDescription: z.string().min(2, {
    message: "Du måste specificera en beskrivning på eventet.",
  }),
  organizerName: z.string().min(2, {
    message: "Du måste specificera ett namn på arrangören.",
  }),
  organizerEmail: z.string().email({
    message: "Du måste specificera en giltig email.",
  }),
  organizerPhone: z.string().min(2, {
    message: "Du måste specificera ett telefonnummer.",
  }),
  inChargeName: z.string().min(2, {
    message: "Du måste specificera ett namn på festansvarig.",
  }),
  inChargeEmail: z.string().email({
    message: "Du måste specificera en giltig email.",
  }),
  inChargePhone: z.string().min(2, {
    message: "Du måste specificera ett telefonnummer.",
  }),
  primaryStartDate: z.date().min(new Date(), {
    message: "Du kan inte boka en dag som redan har varit.",
  }),
  primaryEndDate: z.date().min(new Date(), {
    message: "Du kan inte boka en dag som redan har varit.",
  }),
  secondaryStartDate: z.date().min(new Date(), {
    message: "Du kan inte boka en dag som redan har varit.",
  }),
  secondaryEndDate: z.date().min(new Date(), {
    message: "Du kan inte boka en dag som redan har varit.",
  }),
  hasServingPermit: z.boolean().default(false),
});

type InputProps = {
  dbName: string;
  description?: string;
  label: string;
  placeholder?: string;
};

const ItemInput = ({ dbName, label, placeholder, description }: InputProps) => {
  const { control } = useFormContext(); // Use useFormContext to access the form control
  return (
    <FormField
      control={control}
      name={dbName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const DateInput = ({ dbName, label, description }: InputProps) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={dbName}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                  variant={"outline"}
                >
                  {field.value ? (
                    format(field.value as Date, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <MdCalendarMonth className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                disabled={(date) => date < new Date()}
                mode="single"
                onSelect={field.onChange}
                selected={field.value as Date}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const ZaloonenBookingForm: NextPage = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: "",
      eventDescription: "",
      organizerEmail: "",
      organizerName: "",
      organizerPhone: "",
      inChargeName: "",
      inChargeEmail: "",
      inChargePhone: "",
      primaryStartDate: new Date(),
      primaryEndDate: new Date(),
      secondaryStartDate: new Date(),
      secondaryEndDate: new Date(),
      hasServingPermit: false,
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4">
          <div className="col-span-1 mx-4 mb-2">
            <ItemInput
              dbName="eventName"
              label="Namn på eventet"
              placeholder="Pubrunda"
            />
          </div>
          <div className="col-span-3"></div>
          <div className="col-span-1 mx-4 mb-2">
            <ItemInput
              dbName="organizerName"
              label="Arrangör"
              placeholder="Lucky Luke"
            />
          </div>
          <div className="col-span-1 mx-4 mb-2">
            <ItemInput
              dbName="organizerEmail"
              label="Email till arrangören"
              placeholder="lucky@luke.se"
            />
          </div>
          <div className="col-span-1 mx-4 mb-2">
            <ItemInput
              dbName="organizerPhone"
              label="Telefonnummer till arrangören"
            />
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-1 mx-4 mb-2">
            <ItemInput
              dbName="inChargeName"
              description="Måste vara en person, ej ett organ eller kommitté"
              label="Festansvarig"
              placeholder="Jolly Jumper"
            />
          </div>
          <div className="col-span-1 mx-4 mb-2">
            <ItemInput
              dbName="inChargeEmail"
              description="Kommer få en kopia till denna bokningen"
              label="Email till festansvarig"
              placeholder="jolly@jumper.se"
            />
          </div>
          <div className="col-span-1 mx-4 mb-2">
            <ItemInput
              dbName="inChargePhone"
              label="Telefonnummer till festansvarig"
            />
          </div>
        </div>
        <div className="mx-2">
          <ItemInput
            dbName="eventDescription"
            description="Vad kommer ni göra? Vad är syftet med arrangemanget?"
            label="Beskrivning av arrangemang"
          />
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-1 mx-2 grid grid-cols-2">
            <SecondaryTitle className="col-span-2 mb-4" center>
              Primärt datum
            </SecondaryTitle>
            <div className="col-span-1 mx-2">
              <DateInput
                dbName="primaryStartDate"
                label="Startdatum av arrangemang"
              />
            </div>
            <div className="col-span-1 mx-2">
              <DateInput
                dbName="primaryEndDate"
                label="Slutdatum av arrangemang"
              />
            </div>
          </div>
          <div className="col-span-1 grid grid-cols-2">
            <SecondaryTitle className="col-span-2 mb-4" center>
              Sekundärt datum
            </SecondaryTitle>
            <div className="col-span-1 mx-2">
              <DateInput
                dbName="secondaryStartDate"
                label="Startdatum av arrangemang"
              />
            </div>
            <div className="col-span-1 mx-2">
              <DateInput
                dbName="secondaryEndDate"
                label="Slutdatum av arrangemang"
              />
            </div>
          </div>
        </div>
        <Button type="submit" variant="outline">
          Skicka in
        </Button>
      </form>
    </Form>
  );

  function onSubmit(values: z.infer<typeof formSchema>): void {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
    return undefined;
  }
};
