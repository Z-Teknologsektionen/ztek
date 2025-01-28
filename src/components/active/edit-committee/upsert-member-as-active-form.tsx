import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { type FC } from "react";
import FormFieldInput from "~/components/forms/form-field-input";
import FormFieldInputImage from "~/components/forms/form-field-input-image";
import FormFieldInputNumber from "~/components/forms/form-field-input-number";
import FormWrapper from "~/components/forms/form-wrapper";
import {
  COMMITTEE_IMAGE_QUALITY,
  COMMITTEE_IMAGE_SIZE,
  MAX_COMMITTEE_ORDER_NUMBER,
  MIN_COMMITTEE_ORDER_NUMBER,
} from "~/constants/committees";
import { useFormWithZodSchema } from "~/hooks/useFormWithZodSchema";
import { upsertMemberBaseSchema } from "~/schemas/member";
import type { IUpsertForm } from "~/types/form-types";
import localeObject from "~/utils/dayjs";

dayjs.extend(relativeTime);
dayjs.locale(localeObject);

type UpdateMemberAsActiveProps = IUpsertForm<typeof upsertMemberBaseSchema>;

export const UpsertMemberAsActiveForm: FC<UpdateMemberAsActiveProps> = ({
  defaultValues,
  onSubmit,
  formType,
}) => {
  const form = useFormWithZodSchema({
    schema: upsertMemberBaseSchema,
    defaultValues,
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
        label="Kommitténamn"
        name="nickName"
        type="text"
      />
      <FormFieldInput
        description="Kommer visas publikt på organsidan."
        form={form}
        label="Telefonnummer (valfritt)"
        name="phone"
        type="tel"
      />
      <FormFieldInputNumber
        description="Används för att bestämma vilken ordning organets medlemmar ska visas i"
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
    </FormWrapper>
  );
};
