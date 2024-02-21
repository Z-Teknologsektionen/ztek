import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { BasicInput } from "~/components/forms/basic-input";
import { ImageInput } from "~/components/forms/image-input";
import { NumberInput } from "~/components/forms/number-input";
import type { IUpsertForm } from "~/types/form-types";
// import { TextInput } from "~/components/forms/textInput";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import {
  COMMITTEE_IMAGE_QUALITY,
  COMMITTEE_IMAGE_SIZE,
  MAX_ORDER_NUMBER,
  MIN_ORDER_NUMBER,
} from "~/constants/committees";
import { createProgramBoardMemberSchema } from "~/schemas/program-board-member";

type UpsertProgramBoardMemberFormProps = IUpsertForm<
  typeof createProgramBoardMemberSchema
>;

const DEFAULT_VALUES: UpsertProgramBoardMemberFormProps["defaultValues"] = {
  phone: "",
  image: "",
  order: MIN_ORDER_NUMBER,
  email: "",
  name: "",
  role: "",
  url: "",
};

const UpsertProgramBoardMemberForm: FC<UpsertProgramBoardMemberFormProps> = ({
  defaultValues = DEFAULT_VALUES,
  formType,
  onSubmit,
}) => {
  const form = useForm<z.infer<typeof createProgramBoardMemberSchema>>({
    resolver: zodResolver(createProgramBoardMemberSchema),
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
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
            label="Telefonnummer (valfri)"
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
            defaultValue={MIN_ORDER_NUMBER}
            description="Används för att bestämma vilken ordning personen ska visas i. Lägre värde visas till vänster."
            label="Ordning"
            max={MAX_ORDER_NUMBER}
            min={MIN_ORDER_NUMBER}
            name="order"
          />
          <ImageInput
            control={form.control}
            label="Bild (valfri)"
            maxHeight={COMMITTEE_IMAGE_SIZE}
            maxWidth={COMMITTEE_IMAGE_SIZE}
            name="image"
            quality={COMMITTEE_IMAGE_QUALITY}
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

export default UpsertProgramBoardMemberForm;
