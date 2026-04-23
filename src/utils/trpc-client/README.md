


# Entry points for tRPC

## Overview
### Folder contents
This folder contains enry points for 

### Purpose

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

    To properly function, the `api` object's `.useQuery`/`.useMutation` hooks needs to be called from the scope of a React component nested inside a tRPC provider

1.  ### By the server-side `caller` or `cacheableCaller` objects.