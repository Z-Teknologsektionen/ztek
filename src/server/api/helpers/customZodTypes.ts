import { Base64 } from "js-base64";
import mongoose from "mongoose";
import { z } from "zod";

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
  .min(0, { message: "Måste vara ett tal större än 0" })
  .max(99, { message: "Måste vara ett tal mindre än 100 (tvåsiffrigt)" })
  .optional()
  .default(0);

export const emailString = z.string().email({ message: "Ogiltig epost" });

export const nonEmptyString = z
  .string()
  .min(1, { message: "Får inte vara en tom sträng" });

export const base64ImageString = z.string().refine(Base64.isValid);
