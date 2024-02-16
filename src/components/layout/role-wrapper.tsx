import { AccountRoles } from "@prisma/client";
import { useRouter } from "next/router";
import type { FC, PropsWithChildren } from "react";
import { useRequireAuth } from "~/hooks/useRequireAuth";
import HeadLayout from "./head-layout";

const RoleWrapper: FC<
  PropsWithChildren<{ accountRole: AccountRoles | undefined }>
> = ({ children, accountRole }) => {
  const { push } = useRouter();
  const { data, status } = useRequireAuth();

  if (status === "loading") return null;

  const isAdmin = data.user.roles.includes(AccountRoles.ADMIN);

  const hasCorrectRole =
    typeof accountRole === "undefined" || data.user.roles.includes(accountRole);

  if (!hasCorrectRole && !isAdmin) return push("/denied");

  return (
    <>
      <HeadLayout title="Sektionsaktiv" />
      {children}
    </>
  );
};

export default RoleWrapper;
