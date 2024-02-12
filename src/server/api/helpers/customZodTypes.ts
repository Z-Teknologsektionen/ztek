import mongoose from "mongoose";
import isMobilePhone from "validator/lib/isMobilePhone";
import { z } from "zod";

const base64Regex =
  /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

const slugRegex = /^[a-z]+(?:-[a-z]+)*$/;

export const standardString = z
  .string({
    required_error: "Obligatoriskt fält",
    invalid_type_error: "Måste vara en sträng",
  })
  .trim();

export const standardNumber = z.number({
  required_error: "Obligatoriskt fält",
  invalid_type_error: "Måste vara ett nummer",
});

export const standardBoolean = z.boolean({
  required_error: "Obligatoriskt fält",
  invalid_type_error: "Måste vara en bool",
});

export const objectId = standardString.refine((val) => {
  return mongoose.Types.ObjectId.isValid(val);
}, "Ogiltigt objectId");

export const datetimeString = standardString.datetime({
  precision: 3,
  offset: false,
  message: "Otilllåtet datum/tidsformat",
});

export const orderNumber = standardNumber
  .min(0, { message: "Måste vara ett tal större än eller lika med 0" })
  .max(99, { message: "Måste vara ett tal mindre än eller lika med 99" });

export const emailString = standardString.email({ message: "Ogiltig epost" });

export const nonEmptyString = standardString.min(1, {
  message: "Får inte vara en tom sträng",
});

export const base64WebPImageString = standardString
  .startsWith("data:image/webp;base64,", {
    message: "Måste vara en base64 sträng med typ webp",
  })
  .refine((val) => {
    const formatedVal = val.replace("data:image/webp;base64,", "");
    return base64Regex.test(formatedVal);
  }, "Inte giltig base64 sträng");

export const phoneNumberString = standardString.refine(
  (val) => isMobilePhone(val, "sv-SE"),
  "Ogiltigt telefonnummer",
);

export const slugString = standardString.refine(
  (val) => slugRegex.test(val),
  `Otillåten sträng, får bara innehålla småbokstäver och - men inte sluta på -. Använder följande regexp "${slugRegex}"`,
);

export const emptyString = z.literal("");

export const httpsUrlString = standardString
  .url("Måste vara en URL")
  .startsWith("https://", "Måste vara en säker https länk");

export const validYear = standardNumber
  .int("Måste vara ett heltal")
  .min(1000, "Årtalet måste vara ett 4 siffrigt tal")
  .max(9999, "Årtalet måste vara ett 4 siffrigt tal");

export const validYearPastOrCurrent = validYear.refine(
  (val) => val <= new Date().getFullYear(),
  "Årtalet får inte vara ett framtida årtal",
);

export const relativePathString = z.string().trim().startsWith("/");
