import type { AccountRoles } from "@prisma/client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { FC, PropsWithChildren } from "react";
import HeadLayout from "./HeadLayout";

const RoleWrapper: FC<
  PropsWithChildren<{ accountRole: AccountRoles | undefined }>
> = ({ children, accountRole }) => {
  const { push } = useRouter();
  const { data, status } = useSession({
    required: true,
    onUnauthenticated: () => void signIn("google"),
  });

  if (status === "loading") return null;

  const isAdmin = data.user.admin;

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
