import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { DropdownInput } from "~/components/forms/DropdownInput";
import { ImageInput } from "~/components/forms/ImageInput";
import { NumberInput } from "~/components/forms/NumberInput";
import { TextInput } from "~/components/forms/TextInput";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { upsertMemberBaseSchema } from "~/server/api/helpers/schemas/members";
import { api } from "~/utils/api";

interface IUpsertMemberForm {
  defaultValues: {
    committeeId?: string;
    email?: string;
    image?: string | undefined;
    name?: string;
    nickName?: string;
    order?: number;
    phone?: string;
    role?: string;
  };
  onSubmit: (props: z.infer<typeof upsertMemberBaseSchema>) => void;
  type: "create" | "update";
}

export const UpsertMemberForm: FC<IUpsertMemberForm> = ({
  defaultValues: {
    order = 0,
    committeeId = undefined,
    email = "",
    name = undefined,
    nickName = undefined,
    phone = undefined,
    role = "",
    image = undefined,
  },
  onSubmit,
  type,
}) => {
  const defaultValues = {
    order,
    committeeId,
    email,
    name,
    nickName,
    role,
    phone,
    image,
  };

  const form = useForm<z.infer<typeof upsertMemberBaseSchema>>({
    resolver: zodResolver(upsertMemberBaseSchema),
    defaultValues: defaultValues,
  });

  const { data: committees } = api.committee.getAllAsAdmin.useQuery();

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className=" space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-h-96 space-y-4 overflow-y-scroll p-1">
          <TextInput label="Namn" name="name" />
          <TextInput label="Kommitténamn" name="nickName" />
          <TextInput
            label="Epost"
            name="email"
            placeholder="lucky@ztek.se"
            type="email"
          />
          <TextInput
            description="Vilken post har personen?"
            label="Post"
            name="role"
            placeholder="Ordförande"
          />

          <DropdownInput
            description="Hittar du inte rätt organ? Du kan lägga till fler organ som administratör."
            label="Tillhör organ"
            mappable={committees}
            name="committeeId"
            placeholder="Välj organ"
          />
          <NumberInput
            description="Används för att bestämma vilken ordning organets medlemmar ska
                  visas i"
            label="Ordning"
            max={99}
            min={0}
            name="order"
          />
          <TextInput
            description="Du behöver inte fylla i detta. Kommer visas publikt på organsidan."
            label="Telefonnummer"
            name="phone"
            type="tel"
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
