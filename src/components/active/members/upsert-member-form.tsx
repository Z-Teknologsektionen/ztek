import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import FormFieldInput from "~/components/forms/form-field-input";
import FormFieldInputImage from "~/components/forms/form-field-input-image";
import FormFieldInputNumber from "~/components/forms/form-field-input-number";
import FormFieldSelect from "~/components/forms/form-field-select";
import FormWrapper from "~/components/forms/form-wrapper";
import {
  COMMITTEE_IMAGE_QUALITY,
  COMMITTEE_IMAGE_SIZE,
  MAX_COMMITTEE_ORDER_NUMBER,
  MIN_COMMITTEE_ORDER_NUMBER,
} from "~/constants/committees";
import { createMemberSchema } from "~/schemas/member";
import type { IUpsertForm } from "~/types/form-types";
import { api } from "~/utils/api";

type UpsertMemberFormProps = IUpsertForm<typeof createMemberSchema>;

const DEFAULT_VALUES: UpsertMemberFormProps["defaultValues"] = {
  order: 0,
  phone: "",
  image: "",
  name: "",
  nickName: "",
  email: "",
  role: "",
  committeeId: "",
};

export const UpsertMemberForm: FC<UpsertMemberFormProps> = ({
  defaultValues,
  onSubmit,
  formType,
}) => {
  const form = useForm<z.infer<typeof createMemberSchema>>({
    resolver: zodResolver(createMemberSchema),
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
  });

  const { data: committees } = api.committee.getAllAsAuthed.useQuery();

  return (
    <FormWrapper
      form={form}
      formType={formType}
      onValid={onSubmit}
      resetForm={() => form.reset()}
    >
      <FormFieldInput
        form={form}
        label="Namn (valfri)"
        name="name"
        type="text"
      />
      <FormFieldInput
        form={form}
        label="Kommitténamn (valfri)"
        name="nickName"
        type="text"
      />
      <FormFieldInput
        form={form}
        label="Epost"
        name="email"
        placeholder="lucky@ztek.se"
        type="email"
      />
      <FormFieldInput
        description="Vilken post har personen?"
        form={form}
        label="Post"
        name="role"
        placeholder="Ordförande"
        type="text"
      />
      <FormFieldSelect
        description="Hittar du inte rätt organ? Du kan lägga till fler organ som administratör."
        form={form}
        label="Tillhör organ"
        name="committeeId"
        options={
          committees?.map(({ id, name }) => ({ value: id, label: name })) || []
        }
        placeholder="Välj organ"
      />
      <FormFieldInputNumber
        description="Används för att bestämma vilken ordning organets medlemmar ska visas i"
        form={form}
        label="Ordning"
        max={MAX_COMMITTEE_ORDER_NUMBER}
        min={MIN_COMMITTEE_ORDER_NUMBER}
        name="order"
      />
      <FormFieldInput
        description="Du behöver inte fylla i detta. Kommer visas publikt på organsidan."
        form={form}
        label="Telefonnummer (valfri)"
        name="phone"
        type="tel"
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
