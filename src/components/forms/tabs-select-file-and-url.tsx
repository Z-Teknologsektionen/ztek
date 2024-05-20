import type { ReactNode } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormFieldFileInput } from "~/components/forms/form-field-file-input";
import FormFieldInput from "~/components/forms/form-field-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

const TabsSelectFileAndUrl = <TFieldValues extends FieldValues>({
  form,
  fileProps,
  urlProps,
  disabled,
}: {
  disabled?: boolean;
  fileProps: {
    accept: string;
    cardDescription?: string;
    fieldDescription?: string;
    label: string;
    name: Path<TFieldValues>;
    title: string;
  };
  form: UseFormReturn<TFieldValues>;
  urlProps: {
    cardDescription?: string;
    fieldDescription?: string;
    label: string;
    name: Path<TFieldValues>;
    title: string;
  };
}): ReactNode => {
  return (
    <Tabs
      defaultValue={
        form.getValues(urlProps.name) !== undefined ? "link" : "upload"
      }
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="upload">{fileProps.title}</TabsTrigger>
        <TabsTrigger value="link">{urlProps.title}</TabsTrigger>
      </TabsList>
      <TabsContent value="upload">
        <Card>
          <CardHeader>
            <CardTitle>{fileProps.title}</CardTitle>
            <CardDescription>{fileProps.cardDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormFieldFileInput
              accept={fileProps.accept}
              description={fileProps.fieldDescription}
              disabled={disabled}
              form={form}
              label={fileProps.label}
              name={fileProps.name}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="link">
        <Card>
          <CardHeader>
            <CardTitle>{urlProps.title}</CardTitle>
            <CardDescription>{urlProps.cardDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormFieldInput
              description={urlProps.fieldDescription}
              disabled={disabled}
              form={form}
              label={urlProps.label}
              name={urlProps.name}
              type="url"
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TabsSelectFileAndUrl;
