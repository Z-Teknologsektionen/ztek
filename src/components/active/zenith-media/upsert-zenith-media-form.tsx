import type { FC } from "react";
import FormFieldInput from "~/components/forms/form-field-input";
import FormFieldInputImage from "~/components/forms/form-field-input-image";
import FormFieldInputNumber from "~/components/forms/form-field-input-number";
import FormWrapper from "~/components/forms/form-wrapper";
import TabsSelectFileAndUrl from "~/components/forms/tabs-select-file-and-url";
import { ZENITH_MEDIA_ACCEPTED_MEDIA_TYPES } from "~/constants/sftp";
import { MAX_4_DIGIT_YEAR, MIN_4_DIGIT_YEAR } from "~/constants/size-constants";
import {
  MAX_MEDIA_ORDER_NUMBER,
  MIN_MEDIA_ORDER_NUMBER,
} from "~/constants/zenith-media";
import { env } from "~/env.mjs";
import { useFormWithZodSchema } from "~/hooks/useFormWithZodSchema";
import { createZenithMediaClientSchema } from "~/schemas/zenith-media";
import type { IUpsertForm } from "~/types/form-types";

type UpsertZenithMediaFormProps = IUpsertForm<
  typeof createZenithMediaClientSchema
>;

const DEFAULT_VALUES: UpsertZenithMediaFormProps["defaultValues"] = {
  year: new Date().getFullYear(),
  order: MIN_MEDIA_ORDER_NUMBER,
  coverImage: "",
  title: "",
  media: {
    file: undefined,
    url: undefined,
  },
};

export const UpsertZenithMediaForm: FC<UpsertZenithMediaFormProps> = ({
  defaultValues,
  onSubmit,
  formType,
}) => {
  const form = useFormWithZodSchema({
    schema: createZenithMediaClientSchema,
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
  });

  return (
    <FormWrapper
      form={form}
      formType={formType}
      onValid={onSubmit}
      resetForm={() => form.reset()}
    >
      <FormFieldInput form={form} label="Titel" name="title" type="text" />
      <FormFieldInputNumber
        form={form}
        label="År"
        max={MAX_4_DIGIT_YEAR}
        min={MIN_4_DIGIT_YEAR}
        name="year"
      />
      <FormFieldInputNumber
        description="Används för att sortera årets tidningar"
        form={form}
        label="Ordning"
        max={MAX_MEDIA_ORDER_NUMBER}
        min={MIN_MEDIA_ORDER_NUMBER}
        name="order"
      />
      <FormFieldInputImage
        description="Omslagsbilden till mediet"
        form={form}
        label="Omslag"
        maxHeight={600}
        maxWidth={400}
        name="coverImage"
        quality={85}
      />
      <TabsSelectFileAndUrl
        fileProps={{
          accept: ZENITH_MEDIA_ACCEPTED_MEDIA_TYPES.join(", "),
          title: "Ladda upp fil",
          cardDescription:
            "Du kan antingen ladda upp en pdf eller en bild fil.",
          name: "media.file",
          label: "Fil",
        }}
        form={form}
        urlProps={{
          label: "Url",
          name: "media.url",
          cardDescription:
            "Om du har laddat up ert media till exempelvis youtube så kan ni länka till det här.",
          fieldDescription: `Om länken börjar på "${env.NEXT_PUBLIC_SFTP_BASE_URL}" så är det en uppladdad fil! Byt tillbaka till "Ladda upp" om du vill ladda upp en ny fil`,
          title: "Länka till media",
        }}
      />
    </FormWrapper>
  );
};
