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
