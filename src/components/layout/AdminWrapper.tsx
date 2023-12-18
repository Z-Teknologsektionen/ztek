import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { FC, PropsWithChildren } from "react";
import HeadLayout from "./HeadLayout";

const AdminWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { push } = useRouter();
  const { data, status } = useSession({
    required: true,
    onUnauthenticated: () => void signIn("google"),
  });

  if (status === "loading") return null;

  if (!data.user.admin) return push("/denied");

  return (
    <>
      <HeadLayout title="Admin" />
      {children}
    </>
  );
};

export default AdminWrapper;
