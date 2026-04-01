import isMobilePhone from "validator/lib/isMobilePhone";
import { z } from "zod";
import {
  MAX_COMMITTEE_ORDER_NUMBER,
  MAX_ELECTION_PERIOD,
  MIN_COMMITTEE_ORDER_NUMBER,
  MIN_ELECTION_PERIOD,
} from "~/constants/committees";

import {
  MAX_MEDIA_ORDER_NUMBER,
  MIN_MEDIA_ORDER_NUMBER,
} from "~/constants/zenith-media";

const slugRegex = /^[a-z]+(?:-[a-z]+)*$/;
export const base64Regex =
  /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

//standard types

export const emptyString = z.literal("");
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

export const objectId = standardString.regex(
  /^[0-9a-fA-F]{24}$/,
  "Ogiltigt objectId",
);

// less standard types

export const committeeOrderNumber = standardNumber
  .min(MIN_COMMITTEE_ORDER_NUMBER, {
    message: `Måste vara ett tal större än eller lika med ${MIN_COMMITTEE_ORDER_NUMBER}`,
  })
  .max(MAX_COMMITTEE_ORDER_NUMBER, {
    message: `Måste vara ett tal mindre än eller lika med ${MAX_COMMITTEE_ORDER_NUMBER}`,
  });

export const mediaOrderNumber = standardNumber
  .min(MIN_MEDIA_ORDER_NUMBER, {
    message: `Måste vara ett tal större än eller lika med ${MIN_MEDIA_ORDER_NUMBER}`,
  })
  .max(MAX_MEDIA_ORDER_NUMBER, {
    message: `Måste vara ett tal mindre än eller lika med ${MAX_MEDIA_ORDER_NUMBER}`,
  });

export const emailString = standardString.email({ message: "Ogiltig epost" });

export const nonEmptyString = standardString.min(1, {
  message: "Obligatoriskt fält. Får inte vara tomt",
});

export const base64WebPImageString = standardString
  .startsWith("data:image/webp;base64,", {
    message: "Måste vara en base64 sträng med typ webp",
  })
  .refine((val) => {
    const formattedVal = val.replace("data:image/webp;base64,", "");
    return base64Regex.test(formattedVal);
  }, "Inte giltig base64 sträng");

export const phoneNumberString = standardString.refine(
  (val) => isMobilePhone(val, "sv-SE"),
  "Ogiltigt telefonnummer",
);

export const slugString = standardString.refine(
  (val) => slugRegex.test(val),
  `Otillåten sträng, får bara innehålla småbokstäver och "-" men inte sluta på "-". Använder följande RegExp "${slugRegex}"`,
);

export const httpsUrlString = standardString
  .url("Måste vara en URL")
  .startsWith("https://", "Måste vara en säker https länk");

export const relativePathString = standardString.startsWith("/");

export const stringToBoolean = standardString
  .transform((str) => str.toLowerCase())
  .refine(
    (str) => str === "true" || str === "false",
    `Ogiltig sträng, måste vara "true" eller "false"`,
  )
  .transform((str) => str.toLowerCase() === "true");

export const electionPeriod = standardNumber
  .int("Måste vara ett heltal")
  .nonnegative("Måste vara ett ickenegativt tal")
  .min(
    MIN_ELECTION_PERIOD,
    `Måste vara ett nummer mellan ${MIN_ELECTION_PERIOD} och ${MAX_ELECTION_PERIOD}`,
  )
  .max(
    MAX_ELECTION_PERIOD,
    `Måste vara ett nummer mellan ${MIN_ELECTION_PERIOD} och ${MAX_ELECTION_PERIOD}`,
  );
