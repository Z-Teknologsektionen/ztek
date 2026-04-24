


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

    -  The `api` object's `.useQuery`/`.useMutation` hooks needs to be called from the scope of a React component nested inside a tRPC provider.

        The tRPC provider is a `FunctionConponent` inserted somewhere near the root of the HTML DOM tree.

    -   On server side there must be a [tRPC server adaptor](https://trpc.io/docs/server/adapters). tRPC defines multiple of these, but in our case we use [`fetchRequestHandler`](https://trpc.io/docs/server/adapters/fetch). This listens for incomming procedure calls.

    -   The tRPC provider must be set up such that it knows on what API endpoint the tRPC server adaptor is.

1.  ### By the server-side `caller` or `cacheableCaller` objects.