import { CommitteeType } from "@prisma/client";
import type { FC } from "react";
import type { z } from "zod";
import { BasicInput } from "~/components/forms/basic-input";
import ComboboxInput from "~/components/forms/combobox-input";
import { DropdownInput } from "~/components/forms/dropdown-input";
import FormWrapper from "~/components/forms/form-wrapper";
import { ImageInput } from "~/components/forms/image-input";
import { NumberInput } from "~/components/forms/number-input";
import { TextAreaInput } from "~/components/forms/textarea-input";
import {
  COMMITTEE_IMAGE_QUALITY,
  COMMITTEE_IMAGE_SIZE,
  MAX_ELECTION_PERIOD,
  MAX_ORDER_NUMBER,
  MIN_ELECTION_PERIOD,
  MIN_ORDER_NUMBER,
} from "~/constants/committees";
import { useFormWithZodSchema } from "~/hooks/useFormWithZodSchema";
import { createCommitteeSchema } from "~/schemas/committee";
import type { IUpsertForm } from "~/types/form-types";
import { api } from "~/utils/api";
import { getCommitteeTypeStringFromEnum } from "~/utils/get-committee-type-string-from-enum";
import UpsertCommitteeSocialLinksFormSection from "./upsert-committee-social-links-form-section";

export type UpsertCommitteeFormProps = IUpsertForm<
  typeof createCommitteeSchema
>;
export type UpsertCommitteeFormValues = z.infer<typeof createCommitteeSchema>;

const DEFAULT_VALUES: UpsertCommitteeFormProps["defaultValues"] = {
  electionPeriod: MIN_ELECTION_PERIOD,
  order: MIN_ORDER_NUMBER,
  socialLinks: [],
  committeeType: "" as "COMMITTEE", // Magi för att få typescript nöjd utan att stätta ett default värde
  image: "",
  description: "",
  role: "",
  email: "",
  slug: "",
  name: "",
  documentId: "",
};

const UpsertCommitteeForm: FC<UpsertCommitteeFormProps> = ({
  defaultValues,
  onSubmit,
  formType,
}) => {
  const form = useFormWithZodSchema({
    schema: createCommitteeSchema,
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
  });

  const { data: allDocuments } = api.document.getAllAsAuthed.useQuery();

  return (
    <FormWrapper
      form={form}
      formType={formType}
      onValid={onSubmit}
      resetForm={() => form.reset()}
    >
      <BasicInput control={form.control} label="Namn" name="name" />
      <BasicInput control={form.control} label="Slug" name="slug" />
      <DropdownInput
        description="Vilken typ av organ är det?"
        form={form}
        label="Typ av organ"
        mappable={Object.values(CommitteeType).map((cType) => ({
          id: cType,
          name: getCommitteeTypeStringFromEnum(cType),
        }))}
        name="committeeType"
        placeholder="Välj typ av organ"
      />
      <TextAreaInput
        control={form.control}
        label="Beskrivning"
        name="description"
      />
      <BasicInput
        control={form.control}
        description="Organets roll på sektionen, t.ex. Studienämnd"
        label="Roll"
        name="role"
      />
      <BasicInput
        control={form.control}
        label="Epost"
        name="email"
        placeholder="lucky@ztek.se"
        type="email"
      />
      <NumberInput
        control={form.control}
        label="Invalsperiod"
        max={MAX_ELECTION_PERIOD}
        min={MIN_ELECTION_PERIOD}
        name="electionPeriod"
      />
      <NumberInput
        control={form.control}
        defaultValue={MIN_ORDER_NUMBER}
        description="Används för att bestämma vilken ordning organet ska visas i"
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
      <ComboboxInput
        description="Hittar du inte rätt dokument? Du kan lägga till fler dokument som administratör."
        emptyListText="Hittade inga dokument"
        form={form}
        label="Dokument (valfritt)"
        name="documentId"
        options={
          allDocuments?.map(({ id, title }) => ({
            value: id,
            label: title,
          })) || []
        }
        placeholder="Välj dokument"
        serchText="Sök efter document"
      />
      <UpsertCommitteeSocialLinksFormSection control={form.control} />
    </FormWrapper>
  );
};

export default UpsertCommitteeForm;
