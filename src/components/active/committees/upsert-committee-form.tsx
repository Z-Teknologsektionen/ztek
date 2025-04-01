import { CommitteeType } from "@prisma/client";
import type { FC } from "react";
import type { z } from "zod";
import UpsertCommitteeSocialLinksSection from "~/components/committees/upsert-committee/upsert-committee-social-links-section";
import FormFieldCheckbox from "~/components/forms/form-field-checkbox";
import FormFieldCombobox from "~/components/forms/form-field-combobox";
import FormFieldInput from "~/components/forms/form-field-input";
import FormFieldInputImage from "~/components/forms/form-field-input-image";
import FormFieldInputNumber from "~/components/forms/form-field-input-number";
import { FormFieldMultiCheckbox } from "~/components/forms/form-field-multi-checkbox";
import FormFieldSelect from "~/components/forms/form-field-select";
import FormFieldTextArea from "~/components/forms/form-field-textarea";
import FormWrapper from "~/components/forms/form-wrapper";
import {
  COMMITTEE_IMAGE_QUALITY,
  COMMITTEE_IMAGE_SIZE,
  MAX_COMMITTEE_ORDER_NUMBER,
  MAX_ELECTION_PERIOD,
  MIN_COMMITTEE_ORDER_NUMBER,
  MIN_ELECTION_PERIOD,
} from "~/constants/committees";
import { useFormWithZodSchema } from "~/hooks/useFormWithZodSchema";
import { createCommitteeSchema } from "~/schemas/committee";
import type { IUpsertForm } from "~/types/form-types";
import { api } from "~/utils/api";
import { getCommitteeTypeStringFromEnum } from "~/utils/get-committee-type-string-from-enum";

export type UpsertCommitteeFormProps = IUpsertForm<
  typeof createCommitteeSchema
>;
export type UpsertCommitteeFormValues = z.infer<typeof createCommitteeSchema>;

const DEFAULT_VALUES: UpsertCommitteeFormProps["defaultValues"] = {
  electionPeriods: [],
  order: MIN_COMMITTEE_ORDER_NUMBER,
  socialLinks: [],
  committeeType: "" as "COMMITTEE", // Magi för att få typescript nöjd utan att stätta ett default värde
  image: "",
  description: "",
  role: "",
  email: "",
  slug: "",
  name: "",
  documentId: "",
  showOldCommittee: true,
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
      <FormFieldMultiCheckbox
        description="Vilka läsperioder har organet inval? Om ingen period väljs kommer den fortfarande visas under organ men inte på en specifik invalsperiod"
        form={form}
        items={Array.from(
          { length: MAX_ELECTION_PERIOD - MIN_ELECTION_PERIOD + 1 },
          (_, i) => MIN_ELECTION_PERIOD + i,
        ).map((number) => ({
          label: `Läsperiod ${number.toString()}`,
          value: number,
        }))}
        label="Invalsperioder"
        name="electionPeriods"
        horizontal
      />
      <FormFieldInputNumber
        description="Används för att bestämma vilken ordning organet ska visas i"
        form={form}
        label="Ordning"
        max={MAX_COMMITTEE_ORDER_NUMBER}
        min={MIN_COMMITTEE_ORDER_NUMBER}
        name="order"
      />
      <FormFieldInputImage
        form={form}
        label="Bild (valfri)"
        maxHeight={COMMITTEE_IMAGE_SIZE}
        maxWidth={COMMITTEE_IMAGE_SIZE}
        name="image"
        quality={COMMITTEE_IMAGE_QUALITY}
        ruleOfThirds
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
        searchText="Sök efter document"
        resetButton
      />
      <UpsertCommitteeSocialLinksSection />
      <FormFieldCheckbox
        description="Här kan du växla av och på patethimlen"
        form={form}
        label="Visa patethimmel"
        name="showOldCommittee"
      />
    </FormWrapper>
  );
};

export default UpsertCommitteeForm;
