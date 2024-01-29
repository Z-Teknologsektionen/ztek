import { signIn, useSession } from "next-auth/react";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useRequireAuth = () =>
  useSession({
    required: true,
    onUnauthenticated: () => void signIn("google"),
  });
