import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import FormFieldInputDatetimeLocal from "~/components/forms/form-field-input-datetime-local";
import type { UpsertZaloonenBookingSchemaType } from "./upsert-zaloonen-booking-form";
import UpsertZaloonenBookingFormSubtitle from "./upsert-zaloonen-booking-form-subtitle";

export const UpsertZaloonenBookingFormDateSection: FC<{
  form: UseFormReturn<UpsertZaloonenBookingSchemaType>;
}> = ({ form }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <UpsertZaloonenBookingFormSubtitle
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                  odit, eius dicta nemo tenetur nihil. Dolorum beatae ad ipsa
                  consectetur."
        title="Datum"
      />
      <div className="col-span-full md:col-span-1">
        <FormFieldInputDatetimeLocal
          form={form}
          label="Starttid bokning förstahand"
          name="primaryDate.startDate"
        />
      </div>
      <div className="col-span-full md:col-span-1">
        <FormFieldInputDatetimeLocal
          form={form}
          label="Sluttid bokning förstahand"
          name="primaryDate.endDate"
        />
      </div>
    </div>
  );
};
