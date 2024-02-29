import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import FormFieldInputEmail from "~/components/forms/form-field-input-email";
import FormFieldInputImage from "~/components/forms/form-field-input-image";
import FormFieldInputNumber from "~/components/forms/form-field-input-number";
import FormFieldInputTel from "~/components/forms/form-field-input-tel";
import FormFieldInputText from "~/components/forms/form-field-input-text";
import FormFieldInputUrl from "~/components/forms/form-field-input-url";
import FormWrapper from "~/components/forms/form-wrapper";
import {
  COMMITTEE_IMAGE_QUALITY,
  COMMITTEE_IMAGE_SIZE,
  MAX_ORDER_NUMBER,
  MIN_ORDER_NUMBER,
} from "~/constants/committees";
import { createProgramBoardMemberSchema } from "~/schemas/program-board-member";
import type { IUpsertForm } from "~/types/form-types";

type UpsertProgramBoardMemberFormProps = IUpsertForm<
  typeof createProgramBoardMemberSchema
>;

const DEFAULT_VALUES: UpsertProgramBoardMemberFormProps["defaultValues"] = {
  phone: "",
  image: "",
  order: MIN_ORDER_NUMBER,
  email: "",
  name: "",
  role: "",
  url: "",
};

const UpsertProgramBoardMemberForm: FC<UpsertProgramBoardMemberFormProps> = ({
  defaultValues = DEFAULT_VALUES,
  formType,
  onSubmit,
}) => {
  const form = useForm<z.infer<typeof createProgramBoardMemberSchema>>({
    resolver: zodResolver(createProgramBoardMemberSchema),
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
  });

  return (
    <FormWrapper
      form={form}
      formType={formType}
      onValid={onSubmit}
      resetForm={() => form.reset()}
    >
      <FormFieldInputText form={form} label="Namn" name="name" />
      <FormFieldInputText
        form={form}
        label="Titel"
        name="role"
        placeholder="Programansvarig/Studievägledare/..."
      />
      <FormFieldInputTel
        form={form}
        label="Telefonnummer (valfri)"
        name="phone"
      />
      <FormFieldInputEmail
        form={form}
        label="Epost"
        name="email"
        placeholder="lucky@ztek.se"
      />
      <FormFieldInputUrl
        description="Används för att länka till personens sida på Chalmers hemsida"
        form={form}
        label="Url"
        name="url"
        placeholder="https://chalmers.se/lucky"
      />
      <FormFieldInputNumber
        description="Används för att bestämma vilken ordning personen ska visas i. Lägre värde visas till vänster."
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
    </FormWrapper>
  );
};

export default UpsertProgramBoardMemberForm;
