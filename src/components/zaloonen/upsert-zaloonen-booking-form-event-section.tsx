import {
  ZaloonenBookingEventTypes,
  ZaloonenBookingTypes,
} from "@prisma/client";
import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import FormFieldInput from "~/components/forms/form-field-input";
import FormFieldSelect from "~/components/forms/form-field-select";
import {
  getZaloonenBookingEventNameFromType,
  getZaloonenBookingNameFromType,
} from "~/utils/get-zaloonen-info-from-enum";
import type { UpsertZaloonenBookingSchemaType } from "./upsert-zaloonen-booking-form";
import UpsertZaloonenBookingFormSubtitle from "./upsert-zaloonen-booking-form-subtitle";

export const UpsertZaloonenBookingFormEventSection: FC<{
  form: UseFormReturn<UpsertZaloonenBookingSchemaType>;
}> = ({ form }) => {
  return (
    <div className="grid grid-cols-10 gap-2">
      <UpsertZaloonenBookingFormSubtitle
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo odit, eius dicta nemo tenetur nihil. Dolorum beatae ad ipsa consectetur."
        title="Om arrangemanget"
      />
      <div className="col-span-full">
        <FormFieldInput
          description="Kommer att visas publikt i kalendar osv"
          form={form}
          label="Namn på arrangemang"
          name="eventName"
          type="text"
        />
      </div>
      <div className="col-span-full">
        <FormFieldInput
          form={form}
          label="Beskrivning av arrangemang"
          name="eventDescription"
          type="text"
        />
      </div>
      <div className="col-span-full md:col-span-5">
        <FormFieldInput
          description="Namn på arrangör. Ex DaltonZ, ZEXET"
          form={form}
          label="Arrangör"
          name="organizerName"
          type="text"
        />
      </div>
      <div className="col-span-full md:col-span-5">
        <FormFieldInput
          form={form}
          label="Epost till arrangör"
          name="organizerEmail"
          type="email"
        />
      </div>
      <div className="col-span-full md:col-span-6 lg:col-span-5">
        <FormFieldSelect
          form={form}
          label="Vilken typ av arrangemang"
          name="eventType"
          options={Object.values(ZaloonenBookingEventTypes).map((type) => ({
            label: getZaloonenBookingEventNameFromType(type),
            value: type,
          }))}
          placeholder="Välj typ av arrangemang"
        />
      </div>
      <div className="col-span-full md:col-span-4 lg:col-span-5">
        <FormFieldSelect
          form={form}
          label="Bokningstyp"
          name="bookingType"
          options={Object.values(ZaloonenBookingTypes).map((type) => ({
            label: getZaloonenBookingNameFromType(type),
            value: type,
          }))}
          placeholder="Välj typ av bokning"
        />
      </div>
    </div>
  );
};
