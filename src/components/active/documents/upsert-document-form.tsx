import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import FormFieldCheckbox from "~/components/forms/form-field-checkbox";
import FormFieldInputText from "~/components/forms/form-field-input-text";
import FormFieldInputUrl from "~/components/forms/form-field-input-url";
import FormFieldSelect from "~/components/forms/form-field-select";
import FormWrapper from "~/components/forms/form-wrapper";
import { createDocumentSchema } from "~/schemas/document";
import type { IUpsertForm } from "~/types/form-types";
import { api } from "~/utils/api";

type UpsertDocumentFormProps = IUpsertForm<typeof createDocumentSchema>;

const DEFAULT_VALUES: UpsertDocumentFormProps["defaultValues"] = {
  isPDF: false,
  title: "",
  url: "",
  groupId: "",
};

export const UpsertDocumentForm: FC<UpsertDocumentFormProps> = ({
  defaultValues,
  onSubmit,
  formType,
}) => {
  const form = useForm<z.infer<typeof createDocumentSchema>>({
    resolver: zodResolver(createDocumentSchema),
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
  });

  const { data: documentsGroups } =
    api.document.getAllGroupsAsAuthed.useQuery();

  return (
    <FormWrapper
      form={form}
      formType={formType}
      onValid={onSubmit}
      resetForm={() => form.reset()}
    >
      <FormFieldInputText form={form} label="Titel" name="title" />
      <FormFieldInputUrl form={form} label="Url" name="url" />
      <FormFieldCheckbox
        description="Är dokumentet i pdf-format?"
        form={form}
        label="Typ av dokument"
        name="isPDF"
      />
      <FormFieldSelect
        description={`Ett dokument måste tillhöra en grupp. Om du inte hittar en grupp som passar kan du skapa en ny fliken "Administera dokument".`}
        form={form}
        label="Dokumentgrupp"
        name="groupId"
        options={
          documentsGroups?.map(({ name, id }) => ({
            value: id,
            label: name,
          })) || []
        }
        placeholder="Välj grupp"
      />
    </FormWrapper>
  );
};
