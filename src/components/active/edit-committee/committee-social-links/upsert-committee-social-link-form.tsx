import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import FormFieldInputText from "~/components/forms/form-field-input-text";
import SelectCommitteeSocialIcon from "~/components/forms/select-committee-social-icon";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { MAX_ORDER_NUMBER } from "~/constants/committees";
import { socialIconSchema } from "~/schemas/committee";
import type { IUpsertForm } from "~/types/form-types";

type UpsertCommitteeSocialLinksFormProps = IUpsertForm<typeof socialIconSchema>;

const DEFAULT_VALUES: UpsertCommitteeSocialLinksFormProps["defaultValues"] = {
  order: MAX_ORDER_NUMBER,
  iconAndUrl: {
    iconVariant: "QUESTIONMARK",
    url: "",
  },
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
            form={form}
            label="Icon"
            name="iconAndUrl.iconVariant"
          />
          <FormFieldInputText form={form} label="Länk" name="iconAndUrl.url" />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              form.reset();
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
