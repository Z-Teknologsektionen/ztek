import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { BasicInput } from "~/components/forms/BasicInput";
import { DropdownInput } from "~/components/forms/DropdownInput";
import { ImageInput } from "~/components/forms/ImageInput";
import { NumberInput } from "~/components/forms/NumberInput";
import type { IUpsertForm } from "~/components/forms/form-types";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { createMemberSchema } from "~/server/api/helpers/schemas/members";
import { api } from "~/utils/api";

type UpsertMemberFormProps = IUpsertForm<typeof createMemberSchema>;

const DEFAULT_VALUES: UpsertMemberFormProps["defaultValues"] = {
  order: 0,
  phone: "",
  image: "",
  name: "",
  nickName: "",
  email: "",
  role: "",
  committeeId: "",
};

export const UpsertMemberForm: FC<UpsertMemberFormProps> = ({
  defaultValues,
  onSubmit,
  formType,
}) => {
  const form = useForm<z.infer<typeof createMemberSchema>>({
    resolver: zodResolver(createMemberSchema),
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
  });

  const { data: committees } = api.committee.getAllAsAuthed.useQuery();

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className=" space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-h-96 space-y-4 overflow-y-scroll p-1">
          <BasicInput
            control={form.control}
            label="Namn (valfri)"
            name="name"
          />
          <BasicInput
            control={form.control}
            label="Kommitténamn (valfri)"
            name="nickName"
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
            description="Vilken post har personen?"
            label="Post"
            name="role"
            placeholder="Ordförande"
          />

          <DropdownInput
            control={form.control}
            description="Hittar du inte rätt organ? Du kan lägga till fler organ som administratör."
            label="Tillhör organ"
            mappable={committees || []}
            name="committeeId"
            placeholder="Välj organ"
          />
          <NumberInput
            control={form.control}
            description="Används för att bestämma vilken ordning organets medlemmar ska visas i"
            label="Ordning"
            max={99}
            min={0}
            name="order"
          />
          <BasicInput
            control={form.control}
            description="Du behöver inte fylla i detta. Kommer visas publikt på organsidan."
            label="Telefonnummer (valfri)"
            name="phone"
            type="tel"
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
