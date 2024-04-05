import mongoose from "mongoose";
import isMobilePhone from "validator/lib/isMobilePhone";
import { z } from "zod";
import { MAX_ORDER_NUMBER, MIN_ORDER_NUMBER } from "~/constants/committees";

const base64Regex =
  /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

const slugRegex = /^[a-z]+(?:-[a-z]+)*$/;

export const standardDate = z.date({
  required_error: "Obligatoriskt fält",
  invalid_type_error: "Måste vara ett datum",
});

export const futureDate = standardDate.min(new Date());

export const passedDate = standardDate.max(new Date());

export const standardString = z
  .string({
    required_error: "Obligatoriskt fält",
    invalid_type_error: "Måste vara en sträng",
  })
  .trim();

export const nonEmptyString = standardString.min(1, {
  message: "Obligatoriskt fält. Får inte vara tomt",
});

export const standardNumber = z.number({
  required_error: "Obligatoriskt fält",
  invalid_type_error: "Måste vara ett nummer",
});

export const standardBoolean = z.boolean({
  required_error: "Obligatoriskt fält",
  invalid_type_error: "Måste vara en bool",
});

export const objectId = nonEmptyString.refine((val) => {
  return mongoose.Types.ObjectId.isValid(val);
}, "Ogiltigt objectId");

export const datetimeString = nonEmptyString.datetime({
  precision: 3,
  offset: false,
  message: "Otilllåtet datum/tidsformat",
});

export const futureDateTimeString = datetimeString.refine(
  (dateStr) => new Date() < new Date(dateStr),
  "Du kan inte boka ett datum som har passerat",
);

export const orderNumber = standardNumber
  .int("Måste vara ett heltal")
  .positive("Måste vara ett positivt tal")
  .min(MIN_ORDER_NUMBER, {
    message: `Måste vara ett tal större än eller lika med ${MIN_ORDER_NUMBER}`,
  })
  .max(MAX_ORDER_NUMBER, {
    message: `Måste vara ett tal mindre än eller lika med ${MAX_ORDER_NUMBER}`,
  });

export const emailString = nonEmptyString.email({ message: "Ogiltig epost" });

export const base64WebPImageString = nonEmptyString
  .startsWith("data:image/webp;base64,", {
    message: "Måste vara en base64 sträng med typ webp",
  })
  .refine((val) => {
    const formatedVal = val.replace("data:image/webp;base64,", "");
    return base64Regex.test(formatedVal);
  }, "Inte giltig base64 sträng");

export const phoneNumberString = nonEmptyString.refine(
  (val) => isMobilePhone(val, "sv-SE", { strictMode: false }),
  "Ogiltigt telefonnummer",
);

export const slugString = nonEmptyString.refine(
  (val) => slugRegex.test(val),
  `Otillåten sträng, får bara innehålla småbokstäver och - men inte sluta på -. Använder följande regexp "${slugRegex}"`,
);

export const emptyString = z.literal("");

export const emptyStringToUndefined = emptyString.transform(() => undefined);

export const emptyStringToNull = emptyString.transform(() => null);

export const undefinedToNull = z.undefined().transform(() => null);

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
