import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import FormFieldInput from "~/components/forms/form-field-input";
import FormFieldTextArea from "~/components/forms/form-field-textarea";
import FormWrapper from "~/components/forms/form-wrapper";

import { upsertContactFormSchema } from "~/schemas/contact-form";
import type { IUpsertForm } from "~/types/form-types";

type UpsertContactFormProps = IUpsertForm<typeof upsertContactFormSchema>;

const DEFAULT_VALUES: UpsertContactFormProps["defaultValues"] = {
  email: "",
  message: "",
};

export const UpsertContactForm: FC<UpsertContactFormProps> = ({
  defaultValues,
  onSubmit,
  formType,
}) => {
  const form = useForm<z.infer<typeof upsertContactFormSchema>>({
    resolver: zodResolver(upsertContactFormSchema),
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
  });

  return (
    <FormWrapper
      form={form}
      formType={formType}
      onValid={onSubmit}
      resetForm={() => form.reset()}
    >
      <FormFieldInput
        form={form}
        label="Epost"
        name="email"
        placeholder="lucky@ztek.se"
        type="email"
      />
      <FormFieldTextArea
        className="h-60"
        form={form}
        label="Meddelande"
        name="message"
      />
    </FormWrapper>
  );
};
