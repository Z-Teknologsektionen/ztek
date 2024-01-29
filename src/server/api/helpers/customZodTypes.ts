import mongoose from "mongoose";
import isMobilePhone from "validator/lib/isMobilePhone";
import { z } from "zod";

const base64Regex =
  /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

const slugRegex = /^[a-z]+(?:-[a-z]+)*$/;

export const objectId = z.string().refine((val) => {
  return mongoose.Types.ObjectId.isValid(val);
}, "");

export const datetimeString = z.string().datetime({
  precision: 3,
  offset: false,
  message: "Otilllåtet datum/tids format",
});

export const orderNumber = z
  .number()
  .min(0, { message: "Måste vara ett tal större än eller lika med 0" })
  .max(99, { message: "Måste vara ett tal mindre än eller lika med 99" })
  .optional()
  .default(0);

export const emailString = z.string().email({ message: "Ogiltig epost" });

export const nonEmptyString = z
  .string()
  .min(1, { message: "Får inte vara en tom sträng" });

export const base64WebPImageString = z
  .string()
  .startsWith("data:image/webp;base64,", {
    message: "Måste vara en base64 sträng med typ webp",
  })
  .refine((val) => {
    const formatedVal = val.replace("data:image/webp;base64,", "");
    return base64Regex.test(formatedVal);
  }, "Inte giltig base64 sträng");

export const base64WebPImageOrEmptyString = z.string().refine((str) => {
  if (str === "") return true;

  return base64WebPImageString.safeParse(str).success;
}, "Ogiltig base64 sträng av webp typ");

export const phoneNumberOrEmptyString = z.string().refine((val) => {
  if (val === "") return true;
  return isMobilePhone(val, "sv-SE");
}, "Ogiltigt telefonnummer");

export const slugString = z.string().refine((val) => {
  return slugRegex.test(val);
}, `Otillåten slug, får bara innehålla småbokstäver och - men inte sluta på -. Använder följande regexp "${slugRegex}"`);

export const emptyString = z.literal("");
