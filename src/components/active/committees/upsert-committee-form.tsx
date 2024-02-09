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
import {
  COMMITTEE_IMAGE_QUALITY,
  COMMITTEE_IMAGE_SIZE,
  MAX_ELECTION_PERIOD,
  MAX_ORDER_NUMBER,
  MIN_ELECTION_PERIOD,
  MIN_ORDER_NUMBER,
} from "~/constants/committees";
import { createCommitteeSchema } from "~/server/api/helpers/schemas/committees";
import { getCommitteeTypeStringFromEnum } from "~/utils/getCommitteeTypeStringFromEnum";
import UpsertCommitteeSocialLinksFormSection from "./upsert-committee-social-links-form-section";

export type UpsertCommitteeFormProps = IUpsertForm<
  typeof createCommitteeSchema
>;
export type UpsertCommitteeFormValues = z.infer<typeof createCommitteeSchema>;

const DEFAULT_VALUES: UpsertCommitteeFormProps["defaultValues"] = {
  electionPeriod: MIN_ELECTION_PERIOD,
  order: MIN_ORDER_NUMBER,
  socialLinks: [],
  committeeType: CommitteeType.COMMITTEE,
  image: "",
};

const UpsertCommitteeForm: FC<UpsertCommitteeFormProps> = ({
  defaultValues,
  onSubmit,
  formType,
}) => {
  const form = useForm<UpsertCommitteeFormValues>({
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
              name: getCommitteeTypeStringFromEnum(cType),
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
            max={MAX_ELECTION_PERIOD}
            min={MIN_ELECTION_PERIOD}
            name="electionPeriod"
          />
          <NumberInput
            control={form.control}
            defaultValue={MIN_ORDER_NUMBER}
            description="Används för att bestämma vilken ordning organet ska visas i"
            label="Ordning"
            max={MAX_ORDER_NUMBER}
            min={MIN_ORDER_NUMBER}
            name="order"
          />
          <UpsertCommitteeSocialLinksFormSection control={form.control} />
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
