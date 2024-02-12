import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { BasicInput } from "~/components/forms/BasicInput";
import { DateInput } from "~/components/forms/DateInput";
import type { IUpsertForm } from "~/components/forms/form-types";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { createHomeMediaSchema } from "~/server/api/helpers/schemas/home-media";

type UpsertHomeMediaFormProps = IUpsertForm<typeof createHomeMediaSchema>;

const DEFAULT_VALUES: UpsertHomeMediaFormProps["defaultValues"] = {
  isTimeLimited: false,

  // date in format yyyy-MM-ddThh:mm without seconds
  startDate: new Date().toISOString().slice(0, -8),
};

export const UpsertHomeMediaForm: FC<UpsertHomeMediaFormProps> = ({
  defaultValues,
  onSubmit,
  formType,
}) => {
  const form = useForm<z.infer<typeof createHomeMediaSchema>>({
    resolver: zodResolver(createHomeMediaSchema),
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
  });

  /*
  {
    ...values,
    startDate: new Date(values.startDate).toISOString(),
    endDate: new Date(values.endDate).toISOString(),
  };
  */

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className=" space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-h-96 space-y-4 overflow-y-scroll p-1">
          <BasicInput control={form.control} label="Titel" name="title" />
          <BasicInput
            control={form.control}
            label="Undertext"
            name="description"
          />
          <BasicInput control={form.control} label="Url (valfri)" name="url" />
          <BasicInput control={form.control} label="Bild Url" name="imageurl" />
          <BasicInput
            control={form.control}
            label="Fotograf (valfri)"
            name="photographer"
          />
          <DateInput
            control={form.control}
            label="Visning Startdatum"
            name="startDate"
          />
          <DateInput
            control={form.control}
            label="VisningSlutdatum (valfri)"
            name="endDate"
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
