import { AccountRoles } from "@prisma/client";
import { z } from "zod";
import { objectId } from "~/schemas/helpers/custom-zod-helpers";

export const updateUserRolesSchema = z.object({
  id: objectId,
  roles: z.array(z.nativeEnum(AccountRoles)).optional(),
});
