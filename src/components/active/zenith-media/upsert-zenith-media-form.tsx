import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { BasicInput } from "~/components/forms/basic-input";
import { FileInput } from "~/components/forms/file-input";
import { ImageInput } from "~/components/forms/image-input";
import { NumberInput } from "~/components/forms/number-input";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { DialogFooter } from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { zenithMediaBaseSchema } from "~/schemas/zenith-media";
import { createZenithMediaSchema } from "~/schemas/zenith-media";
import type { IUpsertForm } from "~/types/form-types";

type UpsertZenithMediaFormProps = IUpsertForm<typeof zenithMediaBaseSchema>;

const DEFAULT_VALUES: UpsertZenithMediaFormProps["defaultValues"] = {
  year: new Date().getFullYear(),
  coverImage: "",
  title: "",
  url: "",
};

export const UpsertZenithMediaForm: FC<UpsertZenithMediaFormProps> = ({
  defaultValues,
  onSubmit,
  formType,
}) => {
  const form = useForm<z.infer<typeof createZenithMediaSchema>>({
    resolver: zodResolver(createZenithMediaSchema),
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
  });

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className=" space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-h-96 space-y-4 overflow-y-scroll p-1">
          <BasicInput control={form.control} label="Titel" name="title" />
          <NumberInput control={form.control} label="År" name="year" />
          <ImageInput
            accept="image/*, application/pdf,"
            control={form.control}
            description="Omslagsbild"
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
                  <FileInput
                    accept="image/*, application/pdf,"
                    control={form.control}
                    description="Mediafil"
                    label="Fil"
                    name="fileInput"
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
                  <BasicInput
                    control={form.control}
                    label="Url"
                    name="url"
                    type="url"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              form.reset(defaultValues);
            }}
            type="button"
            variant={"outline"}
          >
            Återställ
          </Button>
          <Button type="submit" variant={"default"}>
            {formType === "create" ? "Skapa" : "Uppdatera"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
