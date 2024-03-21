import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import FormFieldCheckbox from "~/components/forms/form-field-checkbox";
import FormFieldInput from "~/components/forms/form-field-input";
import FormFieldInputImage from "~/components/forms/form-field-input-image";
import FormFieldInputNumber from "~/components/forms/form-field-input-number";
import FormWrapper from "~/components/forms/form-wrapper";
import { MAX_4_DIGIT_YEAR, MIN_4_DIGIT_YEAR } from "~/constants/size-constants";
import { createZenithMediaSchema } from "~/schemas/zenith-media";
import type { IUpsertForm } from "~/types/form-types";

type UpsertZenithMediaFormProps = IUpsertForm<typeof createZenithMediaSchema>;

const DEFAULT_VALUES: UpsertZenithMediaFormProps["defaultValues"] = {
  isPDF: false,
  year: new Date().getFullYear(),
  image: "",
  title: "",
  url: "",
};

export const UpsertZenithMediaForm: FC<UpsertZenithMediaFormProps> = ({
  defaultValues,
  onSubmit,
  formType,
}) => {
  const form = useForm<z.infer<typeof createZenithMediaSchema>>({
    resolver: zodResolver(createZenithMediaSchema),
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
  });

  return (
    <FormWrapper
      form={form}
      formType={formType}
      onValid={onSubmit}
      resetForm={() => form.reset()}
    >
      <FormFieldInput form={form} label="Titel" name="title" type="text" />
      <FormFieldInput form={form} label="Url" name="url" type="url" />
      <FormFieldInputNumber
        form={form}
        label="År"
        max={MAX_4_DIGIT_YEAR}
        min={MIN_4_DIGIT_YEAR}
        name="year"
      />
      <FormFieldCheckbox
        description="Går länken till en PDF?"
        form={form}
        label="Typ av media"
        name="isPDF"
      />
      <FormFieldInputImage
        description="Omslagsbilden till mediet"
        form={form}
        label="Omslag"
        maxHeight={600}
        maxWidth={400}
        name="image"
        quality={85}
      />
    </FormWrapper>
  );
};
