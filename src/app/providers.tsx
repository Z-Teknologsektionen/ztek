"use client";

import { SessionProvider } from "next-auth/react";
import type { FC, PropsWithChildren } from "react";
import { TrpcProvider } from "~/utils/trpc-client/trpc-provider";

const RootProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <TrpcProvider>{children}</TrpcProvider>
    </SessionProvider>
  );
};

// NOTE:
// Pages router (removal pending) does not use RootProviders component, though it logically should

export default RootProviders;
