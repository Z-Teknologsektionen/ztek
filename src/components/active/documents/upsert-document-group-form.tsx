import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import FormFieldInput from "~/components/forms/form-field-input";
import FormWrapper from "~/components/forms/form-wrapper";
import { createDocumentGroupSchema } from "~/schemas/document";
import type { IUpsertForm } from "~/types/form-types";

type UpsertDocumentGroupFormProps = IUpsertForm<
  typeof createDocumentGroupSchema
>;

const DEFAULT_VALUES: UpsertDocumentGroupFormProps["defaultValues"] = {
  extraText: "",
  name: "",
};

export const UpsertDocumentGroupForm: FC<UpsertDocumentGroupFormProps> = ({
  defaultValues,
  onSubmit,
  formType,
}) => {
  const form = useForm<z.infer<typeof createDocumentGroupSchema>>({
    resolver: zodResolver(createDocumentGroupSchema),
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
  });

  return (
    <FormWrapper
      form={form}
      formType={formType}
      onValid={onSubmit}
      resetForm={() => form.reset()}
    >
      <FormFieldInput form={form} label="Namn" name="name" type="text" />
      <FormFieldInput
        form={form}
        label="Extra text (valfri)"
        name="extraText"
        type="text"
      />
    </FormWrapper>
  );
};
