import type { FC } from "react";
import UpsertCommitteeSocialLinksSection from "~/components/committees/upsert-committe/upsert-committee-social-links-section";
import FormFieldCheckbox from "~/components/forms/form-field-checkbox";
import FormFieldInputImage from "~/components/forms/form-field-input-image";
import FormFieldTextArea from "~/components/forms/form-field-textarea";
import FormWrapper from "~/components/forms/form-wrapper";
import {
  COMMITTEE_IMAGE_QUALITY,
  COMMITTEE_IMAGE_SIZE,
} from "~/constants/committees";
import { useFormWithZodSchema } from "~/hooks/useFormWithZodSchema";
import { upsertCommitteeBaseSchema } from "~/schemas/committee";
import type { IUpsertForm } from "~/types/form-types";

export type UpsertCommitteeAsActiveFormProps = IUpsertForm<
  typeof upsertCommitteeBaseSchema
>;

const UpsertCommitteeAsActiveForm: FC<UpsertCommitteeAsActiveFormProps> = ({
  defaultValues,
  onSubmit,
  formType,
}) => {
  const form = useFormWithZodSchema({
    schema: upsertCommitteeBaseSchema,
    defaultValues,
  });

  return (
    <FormWrapper
      form={form}
      formType={formType}
      onValid={onSubmit}
      resetForm={() => form.reset()}
    >
      <FormFieldInputImage
        form={form}
        label="Bild (valfri)"
        maxHeight={COMMITTEE_IMAGE_SIZE}
        maxWidth={COMMITTEE_IMAGE_SIZE}
        name="image"
        quality={COMMITTEE_IMAGE_QUALITY}
      />
      <FormFieldTextArea form={form} label="Beskrivning" name="description" />
      <UpsertCommitteeSocialLinksSection />
      <FormFieldCheckbox
        description="Här kan du toggla av och på patethimlen"
        form={form}
        label="Visa patet himmel"
        name="showOldCommittee"
      />
    </FormWrapper>
  );
};

export default UpsertCommitteeAsActiveForm;
