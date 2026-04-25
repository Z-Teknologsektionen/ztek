# Server side tRPC setup

## Overview

### Folder contents

This folder contains:

- tRPC initalization (creation of the root object)
- tRPC procedure & router definitions

This is elsewere:

- tRPC client (see `~/utils/trpc-client`)
- tRPC server adaptor (see `~/app/api/trpc`)

### Purpose

Since db operations may not be done from client (because that'll require sending the db keys to the browser) they need to be done on the server, upon request from the client. The tRPC (typed Remote Procedure Call) package provides a way to abstract away the underlying HTTP requests implementing this.

## tRPC quick guide

### Documentation

The tRPC package's documentation is highly _opinionated_, meaning instead of giving you detailed reference about each type, member and function call signature, it describes the intended uses (and by that the _ONLY_ documented uses) of the package, by examples.

Thus, much code in this source is there just because it was in the examples, and when looking for documentation it's relevant to know which examples were used to write the tRPC setup done for ztek:

- For client side, see [React Query Integration](https://trpc.io/docs/client/react/setup).
- For server side, see []().
- For server adaptor, see []().

### Concepts

tRPC defines a few concepts, like "procedure", or "context" etc etc... See [the documentation](https://trpc.io/docs/concepts#vocabulary) for definitions.

### Procedure Builders

The most basic procedure builder is given by `trpc.procedure`.
This has function members to either:

- #### Return a modified `ProcedureBuilder`.
  These are for instance:
  - `.use()` which attaches a middleware function.
  - `.input()`/`.output()` which validates the input / output of the resulting procedure against a [Zod schema](https://v3.zod.dev/).
- #### Return a procedure (aka either `QueryProcedure` or `MutationProcedure`)

  These are `.query()` and `.mutation()`. They both take function (from now on called a **_resolver_**) a to be run server-side, but which will be callable through the tRPC client (see `~/utils/trpc-client/api`).

  Resolvers take the context, and the procedure's input (with known type if the `procedureBuilder` was defined using `.input()`), among others.

### Middlewares

[Middlewares](https://trpc.io/docs/server/middlewares) are functions that wrap the _resolver_ (see above) of a procedure. These may be added to `procedureBuilder`s, i.e. before the resolver is known.

Middlewares are defined by functions, and take the same inputs as resolvers, and the `next` function in advance to this. The wrapped resolver will be invoked when calling `next`, and you're expected to return the return value of `next`, possibly modified.

To properly type middleware functions they should be directly wrapped in either `trpc.middleware()` or `procedureBuilderInstance.use()`.

## tRPC setup (except for procedures/routers)

### Contexts

All procedures will have access to:

1.  The `prisma` db client.
2.  The requesting user's `Session` (this type is from NextAuth.js).

This will from now on be called the _context_.

```ts
export type TRPCContext = {
  prisma: typeof prisma;
  session: Session | null
};
```

Before any procedure is later called, a context instance will need to have been supplied.

### The root object

It's unclear what it represents, but all tRPC related objects will be obtained from this. Creating it takes the context type, and this will later be enforced.

```ts
export const trpc: TRPCRootObject</*etc etc*/> =
initTRPC.context<TRPCContext>().create(/*etc*/)
```
The documentation chose to name this `t` and *not* export it, but instead export like every single one of it's members. This design pattern is not used in ztek.

### Base `ProcedureBuilder`s and middleware

`./procedure-builders.ts` contains very general procedure builders and middleware, which may be used (after some further customization) for all procedures defined. This is mostly (if not all) for authentication. For unauthorized users, the middlewares will throw a `TRPCError` instead of calling the resolver `next`.

Note that `CommitteeProcedure` is not a `ProcedureBuilder` but a function returning one, given a function to retrieve the owner committee's db id, given the id of the db entry to do an operation on.

```ts
const committeeProcedure: (
  getOwnerCommitteeId: (ctx: TRPCContext, id: string) => Promise<string | null>,
) => ProcedureBuilder</*etc etc*/>;
```

## tRPC procedure/router definitions

Most of the router files first define router-specific `ProcedureBuilder`s from the previously defined base `ProcedureBuilder`s:
```ts
const carouselItemProcedure = protectedProcedure.use(
  enforceRoleOrAdmin(AccountRoles.MODIFY_HOMEPAGE_CAROUSEL),
);

const carouselItemOwnerProcedure = committeeProcedure(
  async (ctx: TRPCContext, id: string) => {
    /*db operation to get committee id goes here*/
  },
).use(enforceRoleOrAdmin(AccountRoles.MODIFY_HOMEPAGE_CAROUSEL));

```

Then the router is defined and exported, with procedures defined inline. The procedure definitions usually do these things:
1.  A db operation
1.  Invalidation of [Next.js cache tags](https://nextjs.org/docs/app/api-reference/directives/use-cache#on-demand-revalidation), if db content changed.

```ts
export const homePageCarouselRouter = trpc.router({

  /*
  *   Multiple procedures go here
  */

  // here's one of them:
  deleteOneAsActive: carouselItemOwnerProcedure
    .input(
      z.object({
        id: objectId,
      }),
    )
    .mutation(async ({ ctx, input: { id } }) => {
      const deletedItem = await ctx.
        prisma.homePageCarouselItem.delete({
          where: {
            id,
          },
        });

      revalidateTag("home-page-carousel", "max");

      return deletedItem;
    }),

});
```

Finally, all routers are added to the main router `appRouter`. This is the root of the router tree, where procedures are leaves.

```ts
export const appRouter = trpc.router({
  homePageCarousel: homePageCarouselRouter,
  zenithMedia: zenithMediaRouter,
  /* more routers go here */
});

// export type definition of API
export type AppRouter = typeof appRouter;
```

`appRouter` (or type `AppRouter`) is then used to set up the tRPC client, from which the procedures may be called.


