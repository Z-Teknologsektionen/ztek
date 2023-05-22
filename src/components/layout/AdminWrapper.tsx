import { signIn, useSession } from "next-auth/react";
import { type FC, type PropsWithChildren } from "react";
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
      <main>{children}</main>
    </>
  );
};

export default AdminWrapper;
