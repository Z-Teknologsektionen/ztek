import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { type FC } from "react";
import { BasicInput } from "~/components/forms/basic-input";
import FormWrapper from "~/components/forms/form-wrapper";
import { ImageInput } from "~/components/forms/image-input";
import { NumberInput } from "~/components/forms/number-input";
import {
  COMMITTEE_IMAGE_QUALITY,
  COMMITTEE_IMAGE_SIZE,
  MAX_ORDER_NUMBER,
  MIN_ORDER_NUMBER,
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
      <BasicInput control={form.control} label="Namn" name="name" />
      <BasicInput control={form.control} label="Kommitténamn" name="nickName" />
      <BasicInput
        control={form.control}
        description="Kommer visas publikt på organsidan."
        label="Telefonnummer (valfritt)"
        name="phone"
        type="tel"
      />
      <NumberInput
        control={form.control}
        defaultValue={MIN_ORDER_NUMBER}
        description="Används för att bestämma vilken ordning organets medlemmar ska visas i"
        label="Ordning"
        max={MAX_ORDER_NUMBER}
        min={MIN_ORDER_NUMBER}
        name="order"
      />
      <ImageInput
        control={form.control}
        label="Bild (valfri)"
        maxHeight={COMMITTEE_IMAGE_SIZE}
        maxWidth={COMMITTEE_IMAGE_SIZE}
        name="image"
        quality={COMMITTEE_IMAGE_QUALITY}
      />
    </FormWrapper>
  );
};
