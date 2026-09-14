


# Entry points for tRPC

## Overview
### Folder contents
This folder contains:
1. Entry points for accessing (aka calling) tRPC procedures.
2. tRPC provider definition (see below)

### Purpose
Frontend usage of the procedures defined in `~/server/trpc`.

## Entry points

There are two main ways to call the tRPC procedures:

1.  ### By the client-side `api` object.

    #### Usage
    Its properties will have the same shape as `appRouter`, and in the end the procedures (leaf nodes) have callable properties `.useQuery` or `.useMutation` to remotely call the procedure.

    Here's an example. Note how the `.useQuery` hook also returns `isLoading` and `isError` values to abstract away that the operation (i.e. waiting for server) is inherently async.

    ```tsx
    const {
        data: documentGroups,
        isLoading: isLoading,
        isError: isError,
    } = api.document.getAllGroupsAsAuthed.useQuery();
    ```

    #### Requirements

    - The `api` object's `.useQuery`/`.useMutation` hooks needs to be called from the scope of a React component nested inside a [tRPC provider](https://trpc.io/docs/client/react/setup#4-add-trpc-providers).

      The tRPC provider is a `FunctionConponent` inserted somewhere near the root of the HTML DOM tree.

    - On server side there must be a [tRPC server adaptor](https://trpc.io/docs/server/adapters). tRPC defines multiple of these, but in our case we use [`fetchRequestHandler`](https://trpc.io/docs/server/adapters/fetch). This listens for incomming procedure calls.

    - The tRPC provider must be set up such that it knows on what API endpoint the tRPC server adaptor is.

1.  ### By the server-side `caller` or `cacheableCaller` objects.

    #### Usage

    Its properties will have the same shape as `appRouter`, and in the end the procedures (leaf nodes), are callable themselves (unlike with `api`).

    Here's an example: Note that `caller`'s members are not async. Awaiting is done because the procedure is defined to return a promise, not because the server side caller is async.
    ```ts
    const committees = await caller.committee.getAll();
    ```

    These calls may be cached server side, using [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)s and Next's [`"use cache"` directives](https://nextjs.org/docs/app/api-reference/directives/use-cache). Nevertheless, another caller `cacheableCaller` (where `Session: null`) is used for this, since trying to obtain a `Session` from cached scope causes runtime errors.
    ```ts
    const committees = await (async () => {
      "use cache";
      cacheTag("committee");
      return await cacheableCaller.committee.getAll();
    })();
    ```

    #### Requirements
    Since this is server side only, it may not under any cirumstances take input from the user. If u try this, Next.js will be very sad... 

## Context insertion

Every tRPC procedure will have access to a context of type `TRPCContext`. This is defined very early, at `~/server/trpc/init.ts`. Nevertheless it's instantiated much later.

To create the context used for server side calls, a function describing how to do so is passed when defining `caller`:

```ts
const createSessionedContext = async (): Promise<TRPCContext> => ({
  session: await getServerAuthSession(),
  prisma: prisma,
});

export const caller = appRouter.createCaller(createSessionedContext);
```

For client side calls, context is added as soon as the call reaches the server, that is, at the tRPC server adaptor.

```ts
const handler = async (req: Request) => {
  const session = await getServerAuthSession();
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({
      prisma,
      session,
    }),
  });
};
```



