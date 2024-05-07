import { AccountRoles } from "@prisma/client";

export const userHasRequiredRole = (
  userRoles: AccountRoles[] | undefined | null,
  requiredRole: AccountRoles | undefined,
): boolean => {
  if (userRoles === undefined) return false;
  if (userRoles === null) return false;

  return (
    requiredRole === undefined ||
    userRoles.includes(requiredRole) ||
    userRoles.includes(AccountRoles.ADMIN) ||
    userRoles.includes(AccountRoles.SUPER_ADMIN)
  );
};

export const userHasAdminAccess = (
  userRoles: AccountRoles[] | undefined | null,
): boolean => userHasRequiredRole(userRoles, AccountRoles.ADMIN);
