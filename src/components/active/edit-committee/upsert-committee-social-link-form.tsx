import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { BasicInput } from "~/components/forms/BasicInput";
import type { IUpsertForm } from "~/components/forms/form-types";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { MAX_ORDER_NUMBER } from "~/constants/committees";
import { socialIconSchema } from "~/server/api/helpers/schemas/committees";
import SelectCommitteeSocialIcon from "../../forms/select-committee-social-icon";

type UpsertCommitteeSocialLinksFormProps = IUpsertForm<typeof socialIconSchema>;

const DEFAULT_VALUES: UpsertCommitteeSocialLinksFormProps["defaultValues"] = {
  order: MAX_ORDER_NUMBER,
};

export const UpsertCommitteeSocailIconsForm: FC<
  UpsertCommitteeSocialLinksFormProps
> = ({ defaultValues, onSubmit, formType }) => {
  const form = useForm<z.infer<typeof socialIconSchema>>({
    resolver: zodResolver(socialIconSchema),
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
  });

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-h-96 space-y-4 overflow-y-auto p-1">
          <SelectCommitteeSocialIcon
            control={form.control}
            label="Icon"
            name="iconAndUrl.iconVariant"
          />
          <BasicInput
            control={form.control}
            label="Länk"
            name="iconAndUrl.url"
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              form.reset();
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
