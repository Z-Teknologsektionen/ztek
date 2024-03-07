import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { FormFieldFileInput } from "~/components/forms/form-field-file-input";
import FormFieldInput from "~/components/forms/form-field-input";
import FormFieldInputImage from "~/components/forms/form-field-input-image";
import FormFieldInputNumber from "~/components/forms/form-field-input-number";
import FormWrapper from "~/components/forms/form-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { MAX_4_DIGIT_YEAR, MIN_4_DIGIT_YEAR } from "~/constants/size-constants";
import { createZenithMediaClientSchema } from "~/schemas/zenith-media";
import type { IUpsertForm } from "~/types/form-types";

type UpsertZenithMediaFormProps = IUpsertForm<
  typeof createZenithMediaClientSchema
>;

const DEFAULT_VALUES: UpsertZenithMediaFormProps["defaultValues"] = {
  year: new Date().getFullYear(),
  coverImage: "",
  title: "",
  input: {
    fileInput: undefined,
    url: "",
  },
};

export const UpsertZenithMediaForm: FC<UpsertZenithMediaFormProps> = ({
  defaultValues,
  onSubmit,
  formType,
}) => {
  const form = useForm<z.infer<typeof createZenithMediaClientSchema>>({
    resolver: zodResolver(createZenithMediaClientSchema),
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

      <FormFieldInputImage
        description="Omslagsbilden till mediet"
        form={form}
        label="Omslag"
        maxHeight={600}
        maxWidth={400}
        name="coverImage"
        quality={85}
      />
          <Tabs defaultValue="upload">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Ladda upp</TabsTrigger>
              <TabsTrigger value="link">Länka till media</TabsTrigger>
            </TabsList>
            <TabsContent value="upload">
              <Card>
                <CardHeader>
                  <CardTitle>Ladda upp fil</CardTitle>
                  <CardDescription>
                    Du kan antingen ladda upp en pdf eller en fil i godtyckligt
                    bildformat.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <FormFieldFileInput
                    accept="image/*, application/pdf,"
                    form={form}
                    description="Mediafil"
                    label="Fil"
                    name="input.fileInput"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="link">
              <Card>
                <CardHeader>
                  <CardTitle>Länka till media</CardTitle>
                  <CardDescription>
                    Om du har laddat up ert media till exempelvis youtube så kan
                    ni länka till det här.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <FormFieldInput
                    form={form}
                    label="Url"
                    name="input.url"
                    type="url"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
    </FormWrapper>
  );
};
