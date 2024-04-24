import mongoose from "mongoose";
import isMobilePhone from "validator/lib/isMobilePhone";
import { z } from "zod";
import { MAX_ORDER_NUMBER, MIN_ORDER_NUMBER } from "~/constants/committees";
import {
  MAX_SFTP_FILE_SIZE,
  MAX_SFTP_MB_SIZE,
  SFPT_DIRS,
  SFTP_ACCEPTED_MEDIA_TYPES,
} from "~/constants/sftp";
import { env } from "~/env.mjs";
import type { SFTPMediaType } from "~/types/sftp-types";

export const base64Regex =
  /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

const slugRegex = /^[a-z]+(?:-[a-z]+)*$/;

const filenameRegExp = /^[a-zA-Z0-9-]{3,100}\.[a-zA-Z0-9]{1,5}$/;

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
  .min(MIN_ORDER_NUMBER, {
    message: `Måste vara ett tal större än eller lika med ${MIN_ORDER_NUMBER}`,
  })
  .max(MAX_ORDER_NUMBER, {
    message: `Måste vara ett tal mindre än eller lika med ${MAX_ORDER_NUMBER}`,
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

export const relativePathString = standardString.startsWith("/");

export const stringToBoolean = standardString
  .transform((str) => str.toLowerCase())
  .refine(
    (str) => str === "true" || str === "false",
    `Ogiltig sträng måste vara "true" eller "false"`,
  )
  .transform((str) => str.toLowerCase() === "true");

export const sftpUrl = httpsUrlString.refine(
  (str) => str.startsWith(env.NEXT_PUBLIC_SFTP_BASE_URL),
  `Måste börja på ${env.NEXT_PUBLIC_SFTP_BASE_URL}`,
);

export const sftpFilename = standardString.regex(
  filenameRegExp,
  `Ogiltigt filnamn. Använder följande regex: ${filenameRegExp}`,
);

export const sftpFile = z
  .custom<File>()
  .refine((file) => {
    return file.size <= MAX_SFTP_FILE_SIZE;
  }, `Filen får inte vara större än ${MAX_SFTP_MB_SIZE}MB. Kontakta Webbgruppen om du behöver ladda upp större grejer.`)
  .refine(
    (file) => SFTP_ACCEPTED_MEDIA_TYPES.includes(file.type as SFTPMediaType),
    "Inte en godkänd filtyp. Kontakta webbgruppen om du behöver ladda upp den här filtypen.",
  );

export const sftpDir = z.enum(SFPT_DIRS, {
  errorMap: () => ({
    message: `Ogiltigt directory. Måste vara ett av följande: "${SFPT_DIRS.join()}"`,
  }),
});
