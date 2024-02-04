import { zodResolver } from "@hookform/resolvers/zod";
import { CommitteeType } from "@prisma/client";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { BasicInput } from "~/components/forms/BasicInput";
import { DropdownInput } from "~/components/forms/DropdownInput";
import { ImageInput } from "~/components/forms/ImageInput";
import { NumberInput } from "~/components/forms/NumberInput";
import { TextAreaInput } from "~/components/forms/TextAreaInput";
import type { IUpsertForm } from "~/components/forms/form-types";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { createCommitteeSchema } from "~/server/api/helpers/schemas/committees";

type UpsertCommitteeFormProps = IUpsertForm<typeof createCommitteeSchema>;

const DEFAULT_VALUES: UpsertCommitteeFormProps["defaultValues"] = {
  electionPeriod: 1,
  order: 0,
  linkObject: {
    link: "",
    linkText: "",
  },
  image: "",
};

const UpsertCommitteeForm: FC<UpsertCommitteeFormProps> = ({
  defaultValues,
  onSubmit,
  formType,
}) => {
  const form = useForm<z.infer<typeof createCommitteeSchema>>({
    resolver: zodResolver(createCommitteeSchema),
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
  });

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-h-96 space-y-4 overflow-y-scroll p-1">
          <BasicInput control={form.control} label="Namn" name="name" />
          <BasicInput control={form.control} label="Slug" name="slug" />
          <DropdownInput
            control={form.control}
            description="Vilken typ av organ är det?"
            label="Typ av organ"
            mappable={Object.values(CommitteeType).map((cType) => ({
              id: cType,
              name: cType,
            }))}
            name="committeeType"
            placeholder="Välj typ"
          />
          <TextAreaInput
            control={form.control}
            label="Beskrivning"
            name="description"
          />
          <BasicInput
            control={form.control}
            description="Organets roll på sektionen, t.ex. Studienämnd"
            label="Roll"
            name="role"
          />
          <BasicInput
            control={form.control}
            label="Epost"
            name="email"
            placeholder="lucky@ztek.se"
            type="email"
          />
          <NumberInput
            control={form.control}
            defaultValue={1}
            label="Invalsperiod"
            max={4}
            min={1}
            name="electionPeriod"
          />
          <NumberInput
            control={form.control}
            defaultValue={0}
            description="Används för att bestämma vilken ordning organet ska visas i"
            label="Ordning"
            max={99}
            min={0}
            name="order"
          />
          <BasicInput
            control={form.control}
            description="Länk till ex organets hemsida"
            label="Länk (valfri)"
            name="linkObject.link"
          />
          <BasicInput
            control={form.control}
            description="Länktext till ovanstående länk"
            label="Länktext (valfri)"
            name="linkObject.linkText"
          />
          <ImageInput
            control={form.control}
            label="Bild (valfri)"
            name="image"
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

export default UpsertCommitteeForm;
