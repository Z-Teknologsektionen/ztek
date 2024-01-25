import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { BasicInput } from "~/components/forms/BasicInput";
import { ImageInput } from "~/components/forms/ImageInput";
import { NumberInput } from "~/components/forms/NumberInput";
import type { IUpsertForm } from "~/components/forms/form-types";
// import { TextInput } from "~/components/forms/textInput";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { createProgramBoardMemberSchema } from "~/server/api/helpers/schemas/programBoardMembers";

type UpsertProgramBoardMemberFormProps = IUpsertForm<
  typeof createProgramBoardMemberSchema
>;

const DEFAULT_VALUES: UpsertProgramBoardMemberFormProps["defaultValues"] = {};

const UpsertProgramBoardMemberForm: FC<UpsertProgramBoardMemberFormProps> = ({
  defaultValues = DEFAULT_VALUES,
  formType,
  onSubmit,
}) => {
  const form = useForm<z.infer<typeof createProgramBoardMemberSchema>>({
    resolver: zodResolver(createProgramBoardMemberSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-h-96 space-y-4 overflow-y-scroll p-1">
          <BasicInput control={form.control} label="Namn" name="name" />
          <BasicInput
            control={form.control}
            label="Titel"
            name="role"
            placeholder="Programansvarig/Studievägledare/..."
          />
          <BasicInput
            control={form.control}
            description="Måste inte vara med"
            label="Telefonnummer"
            name="phone"
          />
          <BasicInput
            control={form.control}
            label="Epost"
            name="email"
            placeholder="lucky@ztek.se"
            type="email"
          />
          <BasicInput
            control={form.control}
            description="Används för att länka till personens sida på Chalmers hemsida"
            label="Url"
            name="url"
            placeholder="https://chalmers.se/lucky"
            type="url"
          />
          <NumberInput
            control={form.control}
            defaultValue={0}
            description="Används för att bestämma vilken ordning personen ska visas i. Lägre värde visas till vänster."
            label="Ordning"
            max={99}
            min={0}
            name="order"
          />
          <ImageInput control={form.control} label="Bild" name="image" />
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

export default UpsertProgramBoardMemberForm;
