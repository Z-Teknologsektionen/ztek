import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useFieldArray } from "react-hook-form";

import { MdAdd } from "react-icons/md";
import FormFieldInputNumber from "~/components/forms/form-field-input-number";
import FormFieldInputText from "~/components/forms/form-field-input-text";
import SecondaryTitle from "~/components/layout/secondary-title";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { MAX_ORDER_NUMBER, MIN_ORDER_NUMBER } from "~/constants/committees";
import type { UpsertOldCommitteeFormValues } from "./upsert-old-committee-form";

type UpsertOldCommitteeMembersFormSectionProps = {
  form: UseFormReturn<UpsertOldCommitteeFormValues>;
};

const UpsertOldCommitteeMembersFormSection: FC<
  UpsertOldCommitteeMembersFormSectionProps
> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
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
            <FormFieldInputText
              form={form}
              label="Namn"
              name={`members.${index}.name`}
              placeholder="Namn"
            />
            <FormFieldInputText
              form={form}
              label="Postnamn"
              name={`members.${index}.nickName`}
              placeholder="Postnamn"
            />
            <FormFieldInputText
              form={form}
              label="Post"
              name={`members.${index}.role`}
              placeholder="Post"
            />
            <FormFieldInputNumber
              form={form}
              label="Ordning"
              max={MAX_ORDER_NUMBER}
              min={MIN_ORDER_NUMBER}
              name={`members.${index}.order`}
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
