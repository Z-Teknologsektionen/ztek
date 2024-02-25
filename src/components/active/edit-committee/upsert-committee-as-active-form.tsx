import type { FC } from "react";
import type { z } from "zod";
import FormWrapper from "~/components/forms/form-wrapper";
import { ImageInput } from "~/components/forms/image-input";
import { TextAreaInput } from "~/components/forms/textarea-input";
import { FormDescription } from "~/components/ui/form";
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

const DEFAULT_VALUES: UpsertCommitteeAsActiveFormProps["defaultValues"] = {
  socialLinks: [],
  id: "",
  image: "",
  description: "",
};

const UpsertCommitteeAsActiveForm: FC<UpsertCommitteeAsActiveFormProps> = ({
  defaultValues,
  onSubmit,
  formType,
}) => {
  const form = useFormWithZodSchema({
    schema: updateCommitteeAsActiveSchema,
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
  });

  return (
    <FormWrapper
      form={form}
      formType={formType}
      onValid={onSubmit}
      resetForm={() => form.reset()}
    >
      <FormDescription>
        Du som aktiv kan inte uppdatera alla fält, så som du vill ändra något
        mer än detta måste du kontakta en Webbgruppen.
      </FormDescription>
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
