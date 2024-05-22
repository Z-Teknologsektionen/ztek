import { AccountRoles } from "@prisma/client";

export const canCurrentUserModifyTargetRoleUser = (
  currentUserRoles: AccountRoles[] | undefined | null,
  targetUserRoles: AccountRoles[] | undefined,
): boolean => {
  if (currentUserRoles === undefined) return false;
  if (currentUserRoles === null) return false;

  if (targetUserRoles === undefined) return true;

  if (targetUserRoles.includes(AccountRoles.SUPER_ADMIN)) return false;

  if (currentUserRoles.includes(AccountRoles.SUPER_ADMIN)) return true;

  if (targetUserRoles.includes(AccountRoles.ADMIN)) return false;

  if (currentUserRoles.includes(AccountRoles.ADMIN)) return true;

  if (targetUserRoles.includes(AccountRoles.ORGANIZATION_MANAGEMENT))
    return false;

  return currentUserRoles.includes(AccountRoles.ORGANIZATION_MANAGEMENT);
};
