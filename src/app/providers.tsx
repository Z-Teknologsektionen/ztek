"use client";

import { SessionProvider } from "next-auth/react";
import type { FC, PropsWithChildren } from "react";
import { TrpcProvider } from "./trpc-provider";

const RootProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <TrpcProvider>{children}</TrpcProvider>
    </SessionProvider>
  );
};

export default RootProviders;
