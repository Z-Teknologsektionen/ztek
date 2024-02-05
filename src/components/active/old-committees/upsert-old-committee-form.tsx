import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import type { FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import type { z } from "zod";
import { BasicInput } from "~/components/forms/BasicInput";
import { DropdownInput } from "~/components/forms/DropdownInput";
import { ImageInput } from "~/components/forms/ImageInput";
import { NumberInput } from "~/components/forms/NumberInput";
import type { IUpsertForm } from "~/components/forms/form-types";
import SecondaryTitle from "~/components/layout/SecondaryTitle";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { createOldCommitteeSchema } from "~/server/api/helpers/schemas/oldCommittee";
import { api } from "~/utils/api";

type UpsertOldCommitteeFormProps = IUpsertForm<typeof createOldCommitteeSchema>;

const DEFAULT_VALUES: UpsertOldCommitteeFormProps["defaultValues"] = {
  name: "",
  year: new Date().getFullYear(),
  logo: "",
  image: "",
  members: [],
  belongsToCommitteeId: "",
};

const UpsertOldCommitteeForm: FC<UpsertOldCommitteeFormProps> = ({
  defaultValues = DEFAULT_VALUES,
  onSubmit,
  formType,
}) => {
  const { data } = useSession();
  const userEmail = data?.user.email;
  const { data: committee } = api.committee.getOneByEmail.useQuery({
    email: userEmail || "",
  });
  const form = useForm<z.infer<typeof createOldCommitteeSchema>>({
    resolver: zodResolver(createOldCommitteeSchema),
    defaultValues: defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "members",
  });

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-h-96 space-y-4 overflow-y-scroll p-1">
          <BasicInput
            control={form.control}
            description="Ex. Zexet 22"
            label="Namn"
            name="name"
          />
          <DropdownInput
            control={form.control}
            defaultValue={committee?.id}
            disabled={false}
            label="Huvudorgan"
            mappable={[
              {
                id: committee?.id || "",
                name: committee?.name || "Okänt. Kontakta webbgruppen.",
              },
            ]}
            name="belongsToCommitteeId"
            placeholder="Välj huvudorgan"
          />
          <NumberInput
            control={form.control}
            description="Används för att sortera de olika åren. Så om man satt 22/23, skriv 2022"
            label="År"
            name="year"
          />
          <ImageInput control={form.control} label="Omslagsbild" name="image" />
          <ImageInput control={form.control} label="Logga" name="logo" />
          <div className="flex justify-start">
            <SecondaryTitle>Medlemmar</SecondaryTitle>
            <Button
              className="ml-2"
              onClick={() =>
                append({
                  name: "",
                  nickName: "",
                  order: 0,
                  role: "",
                })
              }
              size={"sm"}
              type="button"
              variant={"outline"}
            >
              <MdAdd className="h-8 w-4" />
            </Button>
          </div>
          {fields.map((field, index) => (
            <div key={field.id} className="">
              <div className="grid grid-cols-2 gap-2">
                <BasicInput
                  control={form.control}
                  label="Namn"
                  name={`members.${index}.name`}
                  placeholder="Namn"
                />
                <BasicInput
                  control={form.control}
                  label="Postnamn"
                  name={`members.${index}.nickName`}
                  placeholder="Postnamn"
                />
                <BasicInput
                  control={form.control}
                  label="Post"
                  name={`members.${index}.role`}
                  placeholder="Post"
                />
                <NumberInput
                  control={form.control}
                  label="Ordning"
                  name={`members.${index}.order`}
                  placeholder="Ordning"
                />
                <Button
                  className="mr-auto"
                  onClick={() => {
                    remove(index);
                  }}
                  size={"sm"}
                  type="button"
                  variant={"destructive"}
                >
                  Ta bort
                </Button>
              </div>
            </div>
          ))}
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

export default UpsertOldCommitteeForm;
