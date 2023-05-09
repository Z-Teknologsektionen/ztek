import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const objectId = z.string().refine((val) => {
  return isValidObjectId(val);
});
