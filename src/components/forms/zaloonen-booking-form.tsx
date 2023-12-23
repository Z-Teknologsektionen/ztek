import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form, FormDescription } from "~/components/ui/form";
import { createZaloonenBookingSchema } from "~/server/api/helpers/schemas/zaloonenBooking";
import SecondaryTitle from "../layout/SecondaryTitle";
import { BooleanInput } from "./BooleanInput";
import { DateAndTimeInput } from "./DateAndTimeInput";
import { TextAreaInput } from "./TextAreaInput";
import { TextInput } from "./TextInput";

interface IUpsertZaloonenBookingForm {
  defaultValues: {
    eventDescription?: string;
    eventName?: string;
    hasServingPermit?: boolean;
    inChargeEmail?: string;
    inChargeName?: string;
    inChargePhone?: string;
    organizerEmail?: string;
    organizerName?: string;
    organizerPhone?: string;
    primaryEndDate?: Date;
    primaryStartDate?: Date;
    secondaryEndDate?: Date;
    secondaryStartDate?: Date;
  };
  onSubmit: (props: z.infer<typeof createZaloonenBookingSchema>) => void;
  type: "create" | "update";
}

const UpsertZaloonenBookingForm: FC<IUpsertZaloonenBookingForm> = ({
  defaultValues,
  onSubmit,
  type,
}) => {
  const form = useForm<z.infer<typeof createZaloonenBookingSchema>>({
    resolver: zodResolver(createZaloonenBookingSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-h-96 space-y-4 overflow-y-scroll p-1">
          <FormDescription>
            Detta är ett formulär för att lägga ett önskemål om bokning av
            Zaloonen. Bokningarna behandlas löpande av ZÅG. Avsyning sker alltid
            kl 07:30 på vardagar och 11:30 på helger om ni inte har någon annan
            överenskommelse med ZÅG. Era uppgifter kommer sparas för
            kontaktmöjlighet under arrangemang, hantering av ansvarsperson samt
            hantering av deposition.
          </FormDescription>
          <TextInput
            label="Namn på eventet"
            name="eventName"
            placeholder="Pubrunda"
          />
          <TextAreaInput
            description="Vad kommer ni göra? Vad är syftet med arrangemanget?"
            label="Beskrivning av arrangemang"
            name="eventDescription"
          />
          <BooleanInput
            description="Kommer eventet ha serveringstillstånd? Detta måste isåfall ansökas om från Göteborgs Stad via Ztyret."
            label="Serveringstillstånd"
            name="hasServingPermit"
          />
          <SecondaryTitle>Arrangör</SecondaryTitle>
          <TextInput
            description="Kan vara ett organ eller en person."
            label="Arrangör"
            name="organizerName"
            placeholder="Lucky Luke"
          />
          <TextInput
            label="Email till arrangören"
            name="organizerEmail"
            placeholder="lucky@luke.se"
          />
          <TextInput
            label="Telefonnummer till arrangören"
            name="organizerPhone"
          />
          <SecondaryTitle>Festansvarig</SecondaryTitle>
          <FormDescription>
            Alla arrangemang/sammankomster där alkoholförtäring i
            studerandesektionens serveringsyta ingår ska festanmälas till
            Chalmers. Vid sådana arrangemang/sammankomster gäller bland annat
            att en nykter ansvarig person ska finnas på plats hela tiden.
            Chalmersvakten kommer i mån av tid att kontrollera anmälda fester.
            <br />
            <br />
            Arrangemang/sammankomster i studerandesektionens serveringsyta där
            alkoholförtäring inte ingår kommer anmälas ändå, detta kan vara bra
            för att väktarna ska känna till att det pågår en aktivitet i
            lokalen. Mer information om detta kan du hitta{" "}
            <Link
              className="text-blue-600 hover:text-blue-800 hover:underline"
              href={
                "https://www.chalmers.se/utbildning/studera-hos-oss/studentliv/arrangemang-i-sektionslokaler/"
              }
              target="_blank"
            >
              här
            </Link>
            .
            <br />
            <br />
            Zåg kommer festanmäla alla arrangemang i Zaloonen efter godkänd
            bokning.
          </FormDescription>
          <TextInput
            description="Måste vara en person, ej ett organ eller kommitté"
            label="Festansvarig"
            name="inChargeName"
            placeholder="Jolly Jumper"
          />
          <TextInput
            description="Kommer få en kopia till denna bokningen"
            label="Email till festansvarig"
            name="inChargeEmail"
            placeholder="jolly@jumper.se"
          />
          <TextInput
            label="Telefonnummer till festansvarig"
            name="inChargePhone"
          />
          <SecondaryTitle>Primärt datum</SecondaryTitle>
          <DateAndTimeInput label="Startdatum" name="primaryStartDate" />
          <DateAndTimeInput label="Slutdatum" name="primaryEndDate" />
          <SecondaryTitle>Sekundärt datum</SecondaryTitle>
          <DateAndTimeInput label="Startdatum" name="secondaryStartDate" />
          <DateAndTimeInput label="Slutdatum " name="secondaryEndDate" />
          <Button type="submit" variant="outline">
            {type === "create" ? "Skicka in" : "Uppdatera"}
          </Button>
        </div>
      </form>
    </Form>
  );

  // function onSubmit(values: z.infer<typeof formSchema>): void {
  //   toast({
  //     title: "You submitted the following values:",
  //     description: (
  //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //         <code className="text-white">{JSON.stringify(values, null, 2)}</code>
  //       </pre>
  //     ),
  //   });
  //   return undefined;
  // }
};
export default UpsertZaloonenBookingForm;
