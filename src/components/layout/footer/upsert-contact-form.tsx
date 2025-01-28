import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import FormFieldInput from "~/components/forms/form-field-input";
import FormFieldTextArea from "~/components/forms/form-field-textarea";
import FormWrapper from "~/components/forms/form-wrapper";

import { sendEmailSchema } from "~/schemas/email";
import type { IUpsertForm } from "~/types/form-types";

type UpsertContactFormProps = IUpsertForm<typeof sendEmailSchema>;

const DEFAULT_VALUES: UpsertContactFormProps["defaultValues"] = {
  recipients: ["webbgruppen@ztek.se"],
  message: "",
  subject: "Kontakt - ztek.se",
  cc: "",
  sender: "noreply@ztek.se",
};

export const UpsertContactForm: FC<UpsertContactFormProps> = ({
  defaultValues,
  onSubmit,
  formType,
}) => {
  const form = useForm<z.infer<typeof sendEmailSchema>>({
    resolver: zodResolver(sendEmailSchema),
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
        label="Din mail"
        name="cc"
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
