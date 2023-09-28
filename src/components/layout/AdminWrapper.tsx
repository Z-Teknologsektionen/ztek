import { signIn, useSession } from "next-auth/react";
import { type FC, type PropsWithChildren } from "react";
import HeadLayout from "./HeadLayout";
import Unauthorized from "./Unauthorized";

type ProtectedRouteProps = {
  requiredRole?: string;
};

const AdminWrapper: FC<PropsWithChildren<ProtectedRouteProps>> = ({
  children,
  requiredRole,
}) => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => void signIn("google"),
  });
  if (status === "loading") return null;
  if (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (requiredRole &&
      session.user.roles?.includes(requiredRole.toUpperCase())) ||
    session.user.admin
  ) {
    // Check if a requiredRole is specified and if the user's roles include it
    return (
      <>
        <HeadLayout title="Admin" />
        <main>{children}</main>
      </>
    );
  } else return <Unauthorized />;
};

export default AdminWrapper;
