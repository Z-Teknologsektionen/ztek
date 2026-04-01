import { z } from "zod";
import { emailString, standardString } from "./helpers/common-zod-helpers";

export const upsertContactFormSchema = z.object({
  email: emailString,
  message: standardString,
});
