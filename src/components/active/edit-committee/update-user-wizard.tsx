import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState, type FC } from "react";
import type { z } from "zod";
import CommitteeImage from "~/components/committees/committee-image";
import FormFieldInputNumber from "~/components/forms/form-field-input-number";
import FormFieldInputTel from "~/components/forms/form-field-input-tel";
import FormFieldInputText from "~/components/forms/form-field-input-text";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { MAX_ORDER_NUMBER, MIN_ORDER_NUMBER } from "~/constants/committees";
import { useUpdateMemberAsActive } from "~/hooks/mutations/useMutateMember";
import { useFormWithZodSchema } from "~/hooks/useFormWithZodSchema";
import { upsertMemberBaseSchema } from "~/schemas/member";
import type { RouterOutputs } from "~/utils/api";
import localeObject from "~/utils/dayjs";
import UpdateUserImageFormField from "./update-user-image-form-field";

dayjs.extend(relativeTime);
dayjs.locale(localeObject);

type UpdateUserWizardProps = {
  member: RouterOutputs["committee"]["getOneByIdAsActive"]["members"][0];
};

export const UpdateUserWizard: FC<UpdateUserWizardProps> = ({ member }) => {
  const [newImage, setNewImage] = useState<string>(member.image);

  const { mutate: mutateMember } = useUpdateMemberAsActive();

  const form = useFormWithZodSchema({
    schema: upsertMemberBaseSchema,
    defaultValues: member,
  });

  const onSubmit = (values: z.infer<typeof upsertMemberBaseSchema>): void =>
    mutateMember({ id: member.id, ...values });

  return (
    <Form {...form}>
      <form
        className="space-y-4 rounded border p-2 shadow"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <CommitteeImage
          alt={`Profilbild på ${member.role}`}
          filename={newImage}
        />
        <div className="space-y-2 p-1">
          <FormFieldInputText form={form} label="Namn" name="name" />
          <FormFieldInputText
            form={form}
            label="Kommitténamn"
            name="nickName"
          />
          <FormFieldInputTel
            description="Du behöver inte fylla i detta. Kommer visas publikt på organsidan."
            form={form}
            label="Telefonnummer"
            name="phone"
          />
          <FormFieldInputNumber
            description="Används för att bestämma vilken ordning organets medlemmar ska visas i"
            form={form}
            label="Ordning"
            max={MAX_ORDER_NUMBER}
            min={MIN_ORDER_NUMBER}
            name="order"
          />
          <UpdateUserImageFormField
            form={form}
            label="Bild"
            name="image"
            setValue={(val) => {
              setNewImage(val);
              form.setValue("image", val);
            }}
          />
        </div>
        <div>
          <p className="text-sm">
            Senast updaterad: {dayjs(member.updatedAt).fromNow()}
          </p>
          <p className="text-xs">Roll: {member.role}</p>
          <p className="text-xs">Email: {member.email}</p>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            onClick={() => {
              form.reset();
              setNewImage(member.image);
            }}
            type="button"
            variant="outline"
          >
            Återställ
          </Button>
          <Button type="submit">Uppdatera</Button>
        </div>
      </form>
    </Form>
  );
};
