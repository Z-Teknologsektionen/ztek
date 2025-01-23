import { z } from "zod";
import {
  emailString,
  nonEmptyString,
} from "~/schemas/helpers/custom-zod-helpers";

export const sendEmailSchema = z.object({
  message: nonEmptyString,
  recipients: emailString
    .array()
    .min(1, "Du måste välja minst en mottagare.")
    .max(10, "Du kan inte specificiera så många personer"),
  sender: emailString.optional(),
  subject: nonEmptyString,
  cc: emailString.optional(),
});
