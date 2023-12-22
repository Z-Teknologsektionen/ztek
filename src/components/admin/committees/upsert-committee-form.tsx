import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { ImageInput } from "~/components/forms/ImageInput";
import { NumberInput } from "~/components/forms/NumberInput";
import { TextAreaInput } from "~/components/forms/TextAreaInput";
import { TextInput } from "~/components/forms/TextInput";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { createCommitteeSchema } from "~/server/api/helpers/zodScheams";

interface IUpsertCommitteeForm {
  defaultValues: {
    description?: string;
    electionPeriod?: number;
    email?: string;
    image?: string;
    order?: number;
    role?: string;
    slug?: string;
  };
  onSubmit: (props: z.infer<typeof createCommitteeSchema>) => void;
  type: "create" | "update";
}

const UpsertCommitteeForm: FC<IUpsertCommitteeForm> = ({
  defaultValues,
  onSubmit,
  type,
}) => {
  const form = useForm<z.infer<typeof createCommitteeSchema>>({
    resolver: zodResolver(createCommitteeSchema),
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-h-96 space-y-4 overflow-y-scroll p-1">
          <TextInput label="Namn" name="name" />
          <TextInput label="Slug" name="slug" />
          <TextAreaInput label="Beskrivning" name="description" />
          <TextInput
            description="Organets roll på sektionen, t.ex. Studienämnd"
            label="Roll"
            name="role"
          />
          <TextInput
            label="Epost"
            name="email"
            placeholder="lucky@ztek.se"
            type="email"
          />
          <NumberInput
            label="Invalsperiod"
            max={4}
            min={1}
            name="electionPeriod"
          />
          <NumberInput
            description="Används för att bestämma vilken ordning organet ska visas i"
            label="Ordning"
            max={99}
            min={1}
            name="order"
          />
          <ImageInput
            defaultImage={defaultValues.image}
            label="Bild"
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
            {type === "create" ? "Skapa" : "Uppdatera"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UpsertCommitteeForm;
