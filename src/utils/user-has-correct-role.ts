import { AccountRoles } from "@prisma/client";

export const userHasCorrectRole = (
  userRoles: AccountRoles[] | undefined | null,
  requierdRole: AccountRoles | undefined,
): boolean => {
  if (userRoles === undefined) return false;
  if (userRoles === null) return false;

  return (
    requierdRole === undefined ||
    userRoles.includes(requierdRole) ||
    userRoles.includes(AccountRoles.ADMIN) ||
    userRoles.includes(AccountRoles.SUPER_ADMIN)
  );
};

export const userHasAdminAccess = (
  userRoles: AccountRoles[] | undefined | null,
): boolean => userHasCorrectRole(userRoles, AccountRoles.ADMIN);
