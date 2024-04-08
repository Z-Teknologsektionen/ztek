import { AccountRoles } from "@prisma/client";

export const canUserEditUser = (
  user1Roles: AccountRoles[] | undefined | null,
  user2Roles: AccountRoles[] | undefined,
): boolean => {
  if (user1Roles === undefined) return false;
  if (user1Roles === null) return false;

  if (user2Roles === undefined) return true;

  if (user2Roles.includes(AccountRoles.SUPER_ADMIN)) return false;

  if (user1Roles.includes(AccountRoles.SUPER_ADMIN)) return true;

  if (user2Roles.includes(AccountRoles.ADMIN)) return false;

  if (user1Roles.includes(AccountRoles.ADMIN)) return true;

  if (user2Roles.includes(AccountRoles.ORGANIZATION_MANAGEMENT)) return false;

  return user1Roles.includes(AccountRoles.ORGANIZATION_MANAGEMENT);
};
