import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { BasicInput } from "~/components/forms/BasicInput";
import { NumberInput } from "~/components/forms/NumberInput";
import { TextAreaInput } from "~/components/forms/TextAreaInput";
import type { IUpsertForm } from "~/components/forms/form-types";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { createMeetingElectionSchema } from "~/server/api/helpers/schemas/meetingElection";
import { getStudyPeriodFromDate } from "~/utils/getStudyPeriodFromDate";

type UpsertMeetingElectionFormProps = IUpsertForm<
  typeof createMeetingElectionSchema
>;

const DEFAULT_VALUES: UpsertMeetingElectionFormProps["defaultValues"] = {
  title: "",
  year: new Date().getFullYear(),
  meeting: getStudyPeriodFromDate(new Date()),
  eligibleVoters: [],
  candidates: [],
};

const UpsertMeetingElectionForm: FC<UpsertMeetingElectionFormProps> = ({
  defaultValues = DEFAULT_VALUES,
  onSubmit,
  formType,
}) => {
  const form = useForm<z.infer<typeof createMeetingElectionSchema>>({
    resolver: zodResolver(createMeetingElectionSchema),
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-h-96 space-y-4 overflow-y-scroll p-1">
          <BasicInput control={form.control} label="Titel" name="title" />
          <NumberInput control={form.control} label="År" name="year" />

          <NumberInput
            control={form.control}
            label="Vilket sektionsmöte?"
            name="meeting"
          />
          <TextAreaInput
            control={form.control}
            label="Röstberättigade"
            name="eligibleVoters"
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

export default UpsertMeetingElectionForm;
