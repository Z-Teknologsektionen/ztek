import { AccountRoles } from "@prisma/client";
import { z } from "zod";
import { objectId } from "../customZodTypes";

export const updateUserRolesSchema = z.object({
  id: objectId,
  roles: z.optional(z.array(z.nativeEnum(AccountRoles))),
});
