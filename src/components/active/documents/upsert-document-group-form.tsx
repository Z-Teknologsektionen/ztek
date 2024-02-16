import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { BasicInput } from "~/components/forms/basic-input";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { createDocumentGroupSchema } from "~/server/api/helpers/schemas/documents";
import type { IUpsertForm } from "~/types/form-types";

type UpsertDocumentGroupFormProps = IUpsertForm<
  typeof createDocumentGroupSchema
>;

const DEFAULT_VALUES: UpsertDocumentGroupFormProps["defaultValues"] = {
  extraText: "",
  name: "",
};

export const UpsertDocumentGroupForm: FC<UpsertDocumentGroupFormProps> = ({
  defaultValues,
  onSubmit,
  formType,
}) => {
  const form = useForm<z.infer<typeof createDocumentGroupSchema>>({
    resolver: zodResolver(createDocumentGroupSchema),
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
  });

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className=" space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-h-96 space-y-4 overflow-y-scroll p-1">
          <BasicInput control={form.control} label="Namn" name="name" />
          <BasicInput
            control={form.control}
            label="Extra text (valfri)"
            name="extraText"
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
