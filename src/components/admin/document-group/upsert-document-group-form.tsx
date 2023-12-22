import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { TextInput } from "~/components/forms/TextInput";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { createDocumentGroupSchema } from "~/server/api/helpers/schemas/documents";

interface IUpsertDocumentGroupForm {
  defaultValues: {
    extraText?: string;
    name?: string;
  };
  onSubmit: (props: z.infer<typeof createDocumentGroupSchema>) => void;
  type: "create" | "update";
}

export const UpsertDocumentGroupForm: FC<IUpsertDocumentGroupForm> = ({
  defaultValues: { extraText = undefined, name = undefined },
  onSubmit,
  type,
}) => {
  const defaultValues = {
    extraText,
    name,
  };

  const form = useForm<z.infer<typeof createDocumentGroupSchema>>({
    resolver: zodResolver(createDocumentGroupSchema),
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className=" space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-h-96 space-y-4 overflow-y-scroll p-1">
          <TextInput label="Namn" name="name" />
          <TextInput label="Extra text" name="extraText" />
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
            {type === "create" ? "Skapa" : "Uppdatera"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
