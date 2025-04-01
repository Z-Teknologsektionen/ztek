import type { FC } from "react";
import type { z } from "zod";
import FormFieldCombobox from "~/components/forms/form-field-combobox";
import FormFieldInput from "~/components/forms/form-field-input";
import FormFieldMultiCombobox from "~/components/forms/form-field-multi-combobox";
import FormFieldTextArea from "~/components/forms/form-field-textarea";
import FormWrapper from "~/components/forms/form-wrapper";
import {
  MAX_ELECTION_PERIOD,
  MIN_ELECTION_PERIOD,
} from "~/constants/committees";
import { useFormWithZodSchema } from "~/hooks/useFormWithZodSchema";
import { createCourseSchema } from "~/schemas/course";
import type { IUpsertForm } from "~/types/form-types";
import { api } from "~/utils/api";

export type UpsertCourseFormProps = IUpsertForm<typeof createCourseSchema>;
export type UpsertCourseFormValues = z.infer<typeof createCourseSchema>;

const DEFAULT_VALUES: UpsertCourseFormProps["defaultValues"] = {
  name: "",
  description: "",
  code: "",
  courseId: 123456,
  credits: 7.5,
  examinationType: "Tenta",
  examiner: "",
  studyPeriod: [1],
  successorId: "",
  year: [1],
};

const UpsertCourseForm: FC<UpsertCourseFormProps> = ({
  defaultValues,
  onSubmit,
  formType,
}) => {
  const form = useFormWithZodSchema({
    schema: createCourseSchema,
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
  });

  const allCourses =
    api.course.getAllCoursesAsAuthed.useQuery().data?.map((course) => ({
      value: course.id,
      label: `${course.code} - ${course.name}`,
    })) || [];

  return (
    <FormWrapper
      form={form}
      formType={formType}
      onValid={onSubmit}
      resetForm={() => form.reset()}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-2">
        <div className="md:col-span-3">
          <FormFieldInput
            form={form}
            label="Kursnamn"
            name="name"
            placeholder="Softskills med Forkman"
            type="text"
          />
        </div>
        <div className="md:col-span-1">
          <FormFieldInput
            form={form}
            label="Kurskod"
            name="code"
            placeholder="LIV420"
            type="text"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-2">
        <div className="md:col-span-2">
          <FormFieldInput
            description="Totalt antal poäng för kursen."
            form={form}
            label="Antal HP"
            name="credits"
            type="number"
          />
        </div>
        <div className="md:col-span-2">
          <FormFieldInput
            description={
              "Vad har kursen för ID. Detta hittar du i url:n på kursportalen. T.ex. så har FFR120 koden 39592 då urln blir: https://www.student.chalmers.se/sp/course?course_id=39592"
            }
            form={form}
            label="Kurs-ID"
            name="courseId"
            type="number"
          />
        </div>
      </div>

      <FormFieldTextArea form={form} label="Beskrivning" name="description" />
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-2">
        <div className="md:col-span-2">
          <FormFieldMultiCombobox
            description="Vilka läsperioder går kursen i?"
            form={form}
            label="Läsperiod"
            name="studyPeriod"
            noResultsText="Inga resultat"
            options={Array.from(
              { length: MAX_ELECTION_PERIOD - MIN_ELECTION_PERIOD + 1 },
              (_, i) => MIN_ELECTION_PERIOD + i,
            ).map((number) => ({
              label: `LP ${number.toString()}`,
              value: number,
            }))}
            placeholder="Välj läsperiod"
            searchText="Sök"
          />
        </div>
        <div className="md:col-span-2">
          <FormFieldCombobox
            description="Vilket år går kursen?"
            form={form}
            label="År"
            name="year"
            noResultsText="Inga resultat"
            options={Array.from({ length: 5 }, (_, i) => i + 1).map(
              (number) => ({
                label: `År ${number.toString()}`,
                value: number,
              }),
            )}
            placeholder="Välj år"
            searchText="Sök"
          />
        </div>
      </div>
      <FormFieldCombobox
        description="Ersätter denna kursen en gammal kurs? Isåfall vilken."
        form={form}
        label="Ersätter kurs"
        name="successorId"
        noResultsText="Inga resultat"
        options={allCourses}
        placeholder="Välj kurs"
        searchText=""
      />
    </FormWrapper>
  );
};

export default UpsertCourseForm;
