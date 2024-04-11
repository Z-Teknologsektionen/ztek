import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import FormFieldInput from "~/components/forms/form-field-input";
import FormFieldUrlMediaWithPreview from "~/components/forms/form-field-url-media-with-preview";
import FormWrapper from "~/components/forms/form-wrapper";

import { useRequireAuth } from "~/hooks/useRequireAuth";
import type { upsertHomepageCarouselBaseSchema } from "~/schemas/homepage-carousel";
import { createHomepageCarouselSchema } from "~/schemas/homepage-carousel";
import type { createOldCommitteeSchema } from "~/schemas/old-committee";
import type { IUpsertForm } from "~/types/form-types";

type UpsertHomepageCarouselFormProps = IUpsertForm<
  typeof upsertHomepageCarouselBaseSchema
>;

export type UpsertOldCommitteeFormValues = z.infer<
  typeof createOldCommitteeSchema
>;

const DEFAULT_VALUES: UpsertHomepageCarouselFormProps["defaultValues"] = {
  title: "",
  startDate: new Date(),
  endDate: undefined,
  order: 0,
  url: "",
  createdById: "",
};

const UpsertHomepageCarouselForm: FC<UpsertHomepageCarouselFormProps> = ({
  defaultValues,
  onSubmit,
  formType,
}) => {
  const { data: session } = useRequireAuth();

  const form = useForm<z.infer<typeof createHomepageCarouselSchema>>({
    resolver: zodResolver(createHomepageCarouselSchema),
    defaultValues: {
      ...DEFAULT_VALUES,
      createdById: session?.user.memberId || "unknown",
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
        description="Kommer inte visas publikt, bara på denna sidan."
        form={form}
        label="Titel"
        name="title"
        type="text"
      />
      <FormFieldUrlMediaWithPreview
        description="Du kan för närvarande bara länka till bilder, inte ladda upp."
        form={form}
        label="Url"
        name="url"
      />
      <div className="grid grid-cols-2 gap-2">
        <FormFieldInput
          description="När vill du att bilden ska börja visas?"
          form={form}
          label="Startdatum"
          name="startDate"
          type="date"
        />
        <FormFieldInput
          description="När vill du att bilden ska sluta visas? Lämna tomt om du vill att den ska visas tills du tar bort den."
          form={form}
          label="Slutdatum"
          name="endDate"
          type="date"
        />
      </div>
    </FormWrapper>
  );
};

export default UpsertHomepageCarouselForm;
