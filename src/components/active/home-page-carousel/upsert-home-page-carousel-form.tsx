import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import FormFieldInput from "~/components/forms/form-field-input";
import FormFieldInputDatetimeLocal from "~/components/forms/form-field-input-datetime-local";
import FormFieldInputImage from "~/components/forms/form-field-input-image";
import FormFieldSelect from "~/components/forms/form-field-select";
import FormWrapper from "~/components/forms/form-wrapper";
import { COMMITTEE_IMAGE_QUALITY } from "~/constants/committees";
import {
  CAROUSEL_IMAGE_HEIGHT,
  CAROUSEL_IMAGE_WIDTH,
} from "~/constants/home-page-carousel";
import { useRequireAuth } from "~/hooks/useRequireAuth";
import { createHomePageCarouselSchema } from "~/schemas/home-page-carousel";
import type { IUpsertForm } from "~/types/form-types";
import { api } from "~/utils/api";
import { userHasAdminAccess } from "~/utils/user-has-correct-role";

type UpsertHomePageCarouselFormProps = IUpsertForm<
  typeof createHomePageCarouselSchema
>;

const DEFAULT_VALUES: UpsertHomePageCarouselFormProps["defaultValues"] = {
  imageCredit: "",
  committeeId: "",
  endDateTime: null,
  imageUrl: "",
  linkToUrl: "",
  startDateTime: null,
  imageFile: undefined,
};

const UpsertHomePageCarouselForm: FC<UpsertHomePageCarouselFormProps> = ({
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

  const form = useForm<z.infer<typeof createHomePageCarouselSchema>>({
    resolver: zodResolver(createHomePageCarouselSchema),
    defaultValues: {
      ...DEFAULT_VALUES,
      committeeId: session?.user.committeeId || "unknown",
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
      <FormFieldInputImage
        form={form}
        imageFieldName="imageUrl"
        label="Bild"
        maxHeight={CAROUSEL_IMAGE_HEIGHT}
        maxWidth={CAROUSEL_IMAGE_WIDTH}
        name="imageFile"
        quality={COMMITTEE_IMAGE_QUALITY}
        ruleOfThirds
      />
      <FormFieldInput
        description='zFoto brukar vilja nämnas på formatet "{namn}/zfoto"'
        form={form}
        label="Fotograf (valfri)"
        name="imageCredit"
        type="text"
      />
      <FormFieldInput
        description="Om bilen klickas på kommer denna länk öppnas"
        form={form}
        label="Länk (valfri)"
        name="linkToUrl"
        type="url"
      />
      {isAdmin && (
        <FormFieldSelect
          disabled={false}
          form={form}
          label="Organ"
          name="committeeId"
          options={dropDownMappable}
          placeholder="Välj organ"
        />
      )}
      <FormFieldInputDatetimeLocal
        description="När du vill att bilden ska börja visas i karusellen. Om inget väljs kommer den visas direkt."
        form={form}
        label="Startdatum"
        name="startDateTime"
      />
      <FormFieldInputDatetimeLocal
        description="När du vill att bilden ska sluta visas i karusellen. Om inget väljs kommer den visas för alltid."
        form={form}
        label="Slutdatum"
        name="endDateTime"
      />
    </FormWrapper>
  );
};

export default UpsertHomePageCarouselForm;
