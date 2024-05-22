import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import StyledLink from "~/components/layout/styled-link";
import { Checkbox } from "~/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import type { UpsertZaloonenBookingSchemaType } from "./upsert-zaloonen-booking-form";

const UpsertZaloonenBookingFormGDPRField: FC<{
  form: UseFormReturn<UpsertZaloonenBookingSchemaType>;
}> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name={"saveInformation"}
      render={({ field }) => (
        <FormItem className="col-span-full">
          <FormLabel>Villkor och GDPR</FormLabel>
          <div className="flex flex-row items-center gap-4 rounded-md border p-3">
            <FormControl>
              <Checkbox
                {...field}
                checked={field.value}
                className="h-5 w-5"
                onCheckedChange={field.onChange}
                value={undefined}
              />
            </FormControl>
            <div className="space-y-1 text-sm leading-none">
              <FormDescription>
                Godkänner du att ZÅG sparar din uppgifter i 2 veckor efter er
                bokning och delar dem med chalmers? Samt godkänner du avtalet
                för bokning av Zaloonen? Du kan läsa avtalet för bokning av
                Zaloonen här:{" "}
                <StyledLink href="https://drive.google.com/file/d/1Rgq9idZdhrYu9720sfUPFhSthCKQQgU1/view?usp=sharing">
                  google drive
                </StyledLink>
              </FormDescription>
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default UpsertZaloonenBookingFormGDPRField;
