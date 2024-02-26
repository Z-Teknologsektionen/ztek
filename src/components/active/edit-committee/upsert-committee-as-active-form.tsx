import type { FC } from "react";
import type { z } from "zod";
import FormWrapper from "~/components/forms/form-wrapper";
import { ImageInput } from "~/components/forms/image-input";
import { TextAreaInput } from "~/components/forms/textarea-input";
import {
  COMMITTEE_IMAGE_QUALITY,
  COMMITTEE_IMAGE_SIZE,
} from "~/constants/committees";
import { useFormWithZodSchema } from "~/hooks/useFormWithZodSchema";
import { updateCommitteeAsActiveSchema } from "~/schemas/committee";
import type { IUpsertForm } from "~/types/form-types";
import UpsertCommitteeSocialLinksFormAsActiveSection from "./upsert-committee-social-links-form-as-active-section";

export type UpsertCommitteeAsActiveFormProps = IUpsertForm<
  typeof updateCommitteeAsActiveSchema
>;
export type UpsertCommitteeAsActiveFormValues = z.infer<
  typeof updateCommitteeAsActiveSchema
>;

const UpsertCommitteeAsActiveForm: FC<UpsertCommitteeAsActiveFormProps> = ({
  defaultValues,
  onSubmit,
  formType,
}) => {
  const form = useFormWithZodSchema({
    schema: updateCommitteeAsActiveSchema,
    defaultValues,
  });

  return (
    <FormWrapper
      form={form}
      formType={formType}
      onValid={onSubmit}
      resetForm={() => form.reset()}
    >
      <ImageInput
        control={form.control}
        label="Bild (valfri)"
        maxHeight={COMMITTEE_IMAGE_SIZE}
        maxWidth={COMMITTEE_IMAGE_SIZE}
        name="image"
        quality={COMMITTEE_IMAGE_QUALITY}
      />
      <TextAreaInput
        control={form.control}
        label="Beskrivning"
        name="description"
      />
      <UpsertCommitteeSocialLinksFormAsActiveSection control={form.control} />
    </FormWrapper>
  );
};

export default UpsertCommitteeAsActiveForm;
