import type { FC } from "react";
import { useFieldArray, type Control } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { BasicInput } from "~/components/forms/BasicInput";
import { NumberInput } from "~/components/forms/NumberInput";
import SecondaryTitle from "~/components/layout/SecondaryTitle";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import type { UpsertOldCommitteeFormValues } from "./upsert-old-committee-form";

type UpsertOldCommitteeMembersFormSectionProps = {
  control: Control<UpsertOldCommitteeFormValues>;
};

const UpsertOldCommitteeMembersFormSection: FC<
  UpsertOldCommitteeMembersFormSectionProps
> = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "members",
  });

  return (
    <div className="rounded-xl border p-2">
      <SecondaryTitle>Medlemmar</SecondaryTitle>
      {fields.map((field, index) => (
        <div key={field.id}>
          <Separator className="my-4" />
          <div className="flex w-full items-center justify-between">
            <h2 className="font-medium ">Medlem {index + 1}</h2>
            <Button
              className="mr-4 h-6 content-center text-sm"
              onClick={() => {
                remove(index);
              }}
              size={"sm"}
              type="button"
              variant={"outline"}
            >
              Ta bort
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <BasicInput
              control={control}
              label="Namn"
              name={`members.${index}.name`}
              placeholder="Namn"
            />
            <BasicInput
              control={control}
              label="Postnamn"
              name={`members.${index}.nickName`}
              placeholder="Postnamn"
            />
            <BasicInput
              control={control}
              label="Post"
              name={`members.${index}.role`}
              placeholder="Post"
            />
            <NumberInput
              control={control}
              label="Ordning"
              name={`members.${index}.order`}
              placeholder="Ordning"
            />
          </div>
        </div>
      ))}
      <Separator className="my-4" />
      <Button
        className="flex items-center"
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
        <MdAdd className="mt-0.5" />
        Ny medlem
      </Button>
    </div>
  );
};

export default UpsertOldCommitteeMembersFormSection;
