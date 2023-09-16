import { signIn, useSession } from "next-auth/react";
import { type FC, type PropsWithChildren } from "react";
import HeadLayout from "./HeadLayout";
import Unauthorized from "./Unauthorized";

const AdminWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => void signIn("google"),
  });

  if (status === "loading") return null;

  if (!session.user.admin) {
    return <Unauthorized />;
  }

  return (
    <>
      <HeadLayout title="Admin" />
      <main>{children}</main>
    </>
  );
};

export default AdminWrapper;
