"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import type { FC, PropsWithChildren } from "react";
import { useState } from "react";
import superjson from "superjson";
import { apiApp, getBaseUrl } from "~/utils/api";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 1000 } },
});

export const TrpcProvider: FC<PropsWithChildren> = ({ children }) => {
  // eslint-disable-next-line react/hook-use-state, @typescript-eslint/no-unsafe-assignment
  const [trpcClient] = useState(() =>
    apiApp.createClient({
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      transformer: superjson,
    }),
  );

  return (
    <apiApp.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </apiApp.Provider>
  );
};
