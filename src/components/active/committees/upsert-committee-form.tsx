import { CommitteeType } from "@prisma/client";
import type { FC } from "react";
import type { z } from "zod";
import FormFieldCombobox from "~/components/forms/form-field-combobox";
import FormFieldInput from "~/components/forms/form-field-input";
import FormFieldInputImage from "~/components/forms/form-field-input-image";
import FormFieldInputNumber from "~/components/forms/form-field-input-number";
import FormFieldSelect from "~/components/forms/form-field-select";
import FormFieldTextArea from "~/components/forms/form-field-textarea";
import FormWrapper from "~/components/forms/form-wrapper";
import {
  COMMITTEE_IMAGE_QUALITY,
  COMMITTEE_IMAGE_SIZE,
  MAX_ELECTION_PERIOD,
  MAX_ORDER_NUMBER,
  MIN_ELECTION_PERIOD,
  MIN_ORDER_NUMBER,
} from "~/constants/committees";
import { useFormWithZodSchema } from "~/hooks/useFormWithZodSchema";
import { createCommitteeSchema } from "~/schemas/committee";
import type { IUpsertForm } from "~/types/form-types";
import { api } from "~/utils/api";
import { getCommitteeTypeStringFromEnum } from "~/utils/get-committee-type-string-from-enum";
import UpsertCommitteeSocialLinksFormSection from "./upsert-committee-social-links-form-section";

export type UpsertCommitteeFormProps = IUpsertForm<
  typeof createCommitteeSchema
>;
export type UpsertCommitteeFormValues = z.infer<typeof createCommitteeSchema>;

const DEFAULT_VALUES: UpsertCommitteeFormProps["defaultValues"] = {
  electionPeriod: MIN_ELECTION_PERIOD,
  order: MIN_ORDER_NUMBER,
  socialLinks: [],
  committeeType: "" as "COMMITTEE", // Magi för att få typescript nöjd utan att stätta ett default värde
  image: "",
  description: "",
  role: "",
  email: "",
  slug: "",
  name: "",
  documentId: null,
};

const UpsertCommitteeForm: FC<UpsertCommitteeFormProps> = ({
  defaultValues,
  onSubmit,
  formType,
}) => {
  const form = useFormWithZodSchema({
    schema: createCommitteeSchema,
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
  });

  const { data: allDocuments } = api.document.getAllAsAuthed.useQuery();

  return (
    <FormWrapper
      form={form}
      formType={formType}
      onValid={onSubmit}
      resetForm={() => form.reset()}
    >
      <FormFieldInput form={form} label="Namn" name="name" type="text" />
      <FormFieldInput form={form} label="Slug" name="slug" type="text" />
      <FormFieldSelect
        description="Vilken typ av organ är det?"
        form={form}
        label="Typ av organ"
        name="committeeType"
        options={Object.values(CommitteeType).map((cType) => ({
          value: cType,
          label: getCommitteeTypeStringFromEnum(cType),
        }))}
        placeholder="Välj typ av organ"
      />
      <FormFieldTextArea form={form} label="Beskrivning" name="description" />
      <FormFieldInput
        description="Organets roll på sektionen, t.ex. Studienämnd"
        form={form}
        label="Roll"
        name="role"
        type="text"
      />
      <FormFieldInput
        form={form}
        label="Epost"
        name="email"
        placeholder="lucky@ztek.se"
        type="email"
      />
      <FormFieldInputNumber
        form={form}
        label="Invalsperiod"
        max={MAX_ELECTION_PERIOD}
        min={MIN_ELECTION_PERIOD}
        name="electionPeriod"
      />
      <FormFieldInputNumber
        description="Används för att bestämma vilken ordning organet ska visas i"
        form={form}
        label="Ordning"
        max={MAX_ORDER_NUMBER}
        min={MIN_ORDER_NUMBER}
        name="order"
      />
      <FormFieldInputImage
        form={form}
        label="Bild (valfri)"
        maxHeight={COMMITTEE_IMAGE_SIZE}
        maxWidth={COMMITTEE_IMAGE_SIZE}
        name="image"
        quality={COMMITTEE_IMAGE_QUALITY}
      />
      <FormFieldCombobox
        description="Hittar du inte rätt dokument? Du kan lägga till fler dokument som administratör."
        form={form}
        label="Dokument (valfritt)"
        name="documentId"
        noResultsText="Hittade inga dokument"
        options={
          allDocuments?.map(({ id, title }) => ({
            value: id,
            label: title,
          })) || []
        }
        placeholder="Välj dokument"
        serchText="Sök efter document"
        resetButton
      />
      <UpsertCommitteeSocialLinksFormSection form={form} />
    </FormWrapper>
  );
};

export default UpsertCommitteeForm;
