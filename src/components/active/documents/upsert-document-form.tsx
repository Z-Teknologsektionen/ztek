import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { BasicInput } from "~/components/forms/basic-input";
import { BooleanInput } from "~/components/forms/boolean-input";
import { DropdownInput } from "~/components/forms/dropdown-input";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { createDocumentSchema } from "~/server/api/helpers/schemas/documents";
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
          <BooleanInput
            control={form.control}
            description="Är dokumentet i pdf-format?"
            label="Typ av dokument"
            name="isPDF"
          />
          <DropdownInput
            control={form.control}
            description={`Ett dokument måste tillhöra en grupp. Om du inte hittar en grupp som passar kan du skapa en ny fliken "Administera dokument".`}
            label="Dokumentgrupp"
            mappable={documentsGroups || []}
            name="groupId"
            placeholder="Välj grupp"
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
