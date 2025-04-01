import { z } from "zod";
import { MAX_DESCRIPTION_TEXT_LENGTH } from "~/constants/committees";
import {
  courseCodeString,
  nonEmptyString,
  objectId,
  standardNumber,
  standardString,
  studyPeriod,
  studyYear,
} from "./helpers/custom-zod-helpers";

export const createCourseSchema = z.object({
  name: nonEmptyString,
  code: courseCodeString,
  description: standardString
    .min(1, "Måste vara minst 1 tecken")
    .max(
      MAX_DESCRIPTION_TEXT_LENGTH,
      `Får inte vara mer än ${MAX_DESCRIPTION_TEXT_LENGTH.toString()} tecken`,
    ),
  credits: standardNumber,
  year: studyYear.array().min(1),
  studyPeriod: studyPeriod.array(),
  examiner: nonEmptyString,
  examinationType: nonEmptyString,
  successorId: objectId,
  courseId: standardNumber,
});

export const updateCourseSchema = createCourseSchema
  .partial()
  .extend({ id: objectId });
