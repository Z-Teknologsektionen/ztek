import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { BooleanInput } from "~/components/forms/BooleanInput";
import { DropdownInput } from "~/components/forms/DropdownInput";
import { TextInput } from "~/components/forms/TextInput";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { createDocumentSchema } from "~/server/api/helpers/zodScheams";

import { api } from "~/utils/api";

interface IUpsertDocumentForm {
  defaultValues: {
    groupId?: string;
    isPDF?: boolean;
    title?: string;
    url?: string;
  };
  onSubmit: (props: z.infer<typeof createDocumentSchema>) => void;
  type: "create" | "update";
}

export const UpsertDocumentForm: FC<IUpsertDocumentForm> = ({
  defaultValues: {
    groupId = undefined,
    isPDF = true,
    title = undefined,
    url = undefined,
  },
  onSubmit,
  type,
}) => {
  const defaultValues = {
    groupId,
    isPDF,
    title,
    url,
  };

  const form = useForm<z.infer<typeof createDocumentSchema>>({
    resolver: zodResolver(createDocumentSchema),
    defaultValues: defaultValues,
  });

  const { data: documentsGroups } = api.document.getAllGroupsAsAdmin.useQuery();

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className=" space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-h-96 space-y-4 overflow-y-scroll p-1">
          <TextInput label="Titel" name="title" />
          <TextInput label="Url" name="url" type="url" />
          <BooleanInput
            description="Är dokumentet i pdf-format?"
            label="Typ av dokument"
            name="isPDF"
          />
          <DropdownInput
            description="Ett dokument måste tillhöra en grupp. Om du inte hittar en grupp som passar kan du skapa en ny under fliken 'Dokumentgrupper'."
            label="Dokumentgrupp"
            mappable={documentsGroups}
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
