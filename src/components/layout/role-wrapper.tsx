import type { AccountRoles } from "@prisma/client";
import { useRouter } from "next/router";
import type { FC, PropsWithChildren } from "react";
import { useRequireAuth } from "~/hooks/useRequireAuth";
import { userHasRequiredRole } from "~/utils/user-has-correct-role";
import HeadLayout from "./head-layout";

const RoleWrapper: FC<
  PropsWithChildren<{ accountRole: AccountRoles | undefined }>
> = ({ children, accountRole }) => {
  const { push } = useRouter();
  const { data: session, status } = useRequireAuth();

  if (status === "loading") return null;

  if (!userHasRequiredRole(session.user.roles, accountRole))
    return push("/denied");

  return (
    <>
      <HeadLayout title="Sektionsaktiv" />
      {children}
    </>
  );
};

export default RoleWrapper;
