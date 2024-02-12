import { AccountRoles } from "@prisma/client";
import { z } from "zod";
import { objectId } from "~/server/api/helpers/customZodTypes";

export const updateUserRolesSchema = z.object({
  id: objectId,
  roles: z.array(z.nativeEnum(AccountRoles)).optional(),
});
