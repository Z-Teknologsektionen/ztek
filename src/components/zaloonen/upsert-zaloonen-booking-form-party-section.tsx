import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import FormFieldCheckbox from "~/components/forms/form-field-checkbox";
import FormFieldInput from "~/components/forms/form-field-input";
import type { UpsertZaloonenBookingSchemaType } from "./upsert-zaloonen-booking-form";
import UpsertZaloonenBookingFormSubtitle from "./upsert-zaloonen-booking-form-subtitle";

export const UpsertZaloonenBookingFormPartySection: FC<{
  form: UseFormReturn<UpsertZaloonenBookingSchemaType>;
}> = ({ form }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <UpsertZaloonenBookingFormSubtitle
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo odit, eius dicta nemo tenetur nihil. Dolorum beatae ad ipsa consectetur."
        title="Festanmälan"
      />
      <div className="col-span-full md:col-span-1">
        <FormFieldInput
          form={form}
          label="Festansvarig (för och efternamn)"
          name="partyManagerName"
          type="text"
        />
      </div>
      <div className="col-span-full md:col-span-1">
        <FormFieldInput
          form={form}
          label="Epost till festansvarig"
          name="partyManagerEmail"
          type="email"
        />
      </div>
      <div className="col-span-full md:col-span-1">
        <FormFieldInput
          form={form}
          label="Telefonnummer till festansvarig"
          name="partyManagerPhone"
          type="tel"
        />
      </div>
      <div className="col-span-full md:col-span-1">
        <FormFieldCheckbox
          description="Behövs vid försäljning av alkohol i Zaloonen. Måste fås genom Ztyret"
          form={form}
          label="Kommer ni att ha serveringstillstånd?"
          name="hasServingPermit"
        />
      </div>
    </div>
  );
};
