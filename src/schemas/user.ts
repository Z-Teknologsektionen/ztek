import { AccountRoles } from "@prisma/client";
import { z } from "zod";
import { objectId } from "~/schemas/helpers/custom-zod-helpers";

export const updateUserRolesSchema = z.object({
  id: objectId,
  roles: z
    .nativeEnum(AccountRoles)
    .array()
    .max(
      Object.values(AccountRoles).length,
      "Du kan inte ge fler användar roller än vad det finns roller. Kontrolera att det inte finns några dubbletter",
    ),
});
