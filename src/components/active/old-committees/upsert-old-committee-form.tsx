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
} from "~/constants/committees";
import { MAX_4_DIGIT_YEAR, MIN_4_DIGIT_YEAR } from "~/constants/size-constants";
import { useRequireAuth } from "~/hooks/useRequireAuth";
import { createOldCommitteeSchema } from "~/schemas/old-committee";
import type { IUpsertForm } from "~/types/form-types";
import { api } from "~/utils/api";
import { userHasAdminAccess } from "~/utils/user-has-correct-role";
import UpsertOldCommitteeMembersFormSection from "./upsert-old-committe-membes-section-form";

type UpsertOldCommitteeFormProps = IUpsertForm<typeof createOldCommitteeSchema>;

export type UpsertOldCommitteeFormValues = z.infer<
  typeof createOldCommitteeSchema
>;

const DEFAULT_VALUES: UpsertOldCommitteeFormProps["defaultValues"] = {
  year: new Date().getFullYear(),
  logo: "",
  image: "",
  members: [],
  name: "",
  belongsToCommitteeId: "",
};

const UpsertOldCommitteeForm: FC<UpsertOldCommitteeFormProps> = ({
  defaultValues,
  onSubmit,
  formType,
}) => {
  const { data: session } = useRequireAuth();
  const isAdmin = userHasAdminAccess(session?.user.roles);

  const dropDownMappable = isAdmin
    ? api.committee.getAllAsAuthed.useQuery().data?.map((committee) => ({
        value: committee.id,
        label: committee.name,
      })) || []
    : [];

  const form = useForm<z.infer<typeof createOldCommitteeSchema>>({
    resolver: zodResolver(createOldCommitteeSchema),
    defaultValues: {
      ...DEFAULT_VALUES,
      belongsToCommitteeId: session?.user.committeeId || "unknown",
      ...defaultValues,
    },
  });

  return (
    <FormWrapper
      form={form}
      formType={formType}
      onValid={onSubmit}
      resetForm={() => form.reset()}
    >
      <FormFieldInput
        description="Ex. Zexet 22"
        form={form}
        label="Namn"
        name="name"
        type="text"
      />
      {isAdmin && (
        <FormFieldSelect
          disabled={false}
          form={form}
          label="Huvudorgan"
          name="belongsToCommitteeId"
          options={dropDownMappable}
          placeholder="Välj huvudorgan"
        />
      )}
      <FormFieldInputNumber
        description="Används för att sortera de olika åren. Så om man satt 22/23, skriv 2022"
        form={form}
        label="År"
        max={MAX_4_DIGIT_YEAR}
        min={MIN_4_DIGIT_YEAR}
        name="year"
      />
      <UpsertOldCommitteeMembersFormSection form={form} />
      <FormFieldInputImage
        form={form}
        label="Omslagsbild (valfri)"
        maxHeight={COMMITTEE_IMAGE_SIZE}
        maxWidth={COMMITTEE_IMAGE_SIZE}
        name="image"
        quality={COMMITTEE_IMAGE_QUALITY}
        containImage
      />
      <FormFieldInputImage
        form={form}
        label="Logga (valfri)"
        maxHeight={COMMITTEE_IMAGE_SIZE}
        maxWidth={COMMITTEE_IMAGE_SIZE}
        name="logo"
        quality={COMMITTEE_IMAGE_QUALITY}
      />
    </FormWrapper>
  );
};

export default UpsertOldCommitteeForm;
