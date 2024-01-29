import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { BasicInput } from "~/components/forms/BasicInput";
import { BooleanInput } from "~/components/forms/BooleanInput";
import { ImageInput } from "~/components/forms/ImageInput";
import { NumberInput } from "~/components/forms/NumberInput";
import type { IUpsertForm } from "~/components/forms/form-types";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { createZenithMediaSchema } from "~/server/api/helpers/schemas/zenith-media";

type UpsertZenithMediaFormProps = IUpsertForm<typeof createZenithMediaSchema>;

const DEFAULT_VALUES: UpsertZenithMediaFormProps["defaultValues"] = {};

export const UpsertZenithMediaForm: FC<UpsertZenithMediaFormProps> = ({
  defaultValues = DEFAULT_VALUES,
  onSubmit,
  formType,
}) => {
  const form = useForm<z.infer<typeof createZenithMediaSchema>>({
    resolver: zodResolver(createZenithMediaSchema),
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className=" space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-h-96 space-y-4 overflow-y-scroll p-1">
          <BasicInput control={form.control} label="Titel" name="title" />
          <BasicInput
            control={form.control}
            label="Url"
            name="url"
            type="url"
          />
          <NumberInput control={form.control} label="År" name="year" />
          <BooleanInput
            control={form.control}
            description="Går länken till en PDF?"
            label="Typ av media"
            name="isPDF"
          />
          <ImageInput
            accept="image/*, application/pdf,"
            control={form.control}
            description="Omslagsbilden till median"
            label="Omslag"
            maxHeight={600}
            maxWidth={400}
            name="image"
            quality={85}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              form.reset(defaultValues);
            }}
            type="button"
            variant={"outline"}
          >
            Rensa
          </Button>
          <Button type="submit" variant={"default"}>
            {formType === "create" ? "Skapa" : "Uppdatera"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
