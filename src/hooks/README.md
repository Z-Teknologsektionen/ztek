# Hooks

## What is a hook

Hooks are functions which return a stateful value inside a `FunctionComponent`, or inside another hook. By naming convention these should ALWAYS begin with the "use" prefix. The concept of hooks is defined by React. An introduction may be found [here](https://react.dev/learn#using-hooks), and API reference [here](https://react.dev/reference/react/hooks)

## What's in this directory

- ### Mutation hooks

  All tRPC [mutations](https://trpc.io/docs/server/procedures) have a built in hook called [`useMutation`](https://trpc.io/docs/client/react/useMutation) on client side, for attaching handlers (aka functions) to the states (ie loading, success etc etc) a mutation operation may enter. The mutation hooks defined here are procedure-specific wrapper functions for `useMutation` who all implement UI toasts and cache invalidation, while abstracting it away from the front-end code where these are referenced, such as forms, table columns or table toolbars.

- ### Things that may seem constant but are weirdly stateful, because they reference other hooks:

  For instance, the list of routes to display in the website's navbar is such a case. Whether or not to display "[Active](https://ztek.se/active)" depends on if you are logged in or not, which means it references the [`useSession`](https://next-auth.js.org/getting-started/client#usesession) hook.

- ### Wrapper functions

  For example, `useFormWithZodSchema` is a wrapper function for [React Hook Form](https://react-hook-form.com/docs)'s `useForm` hook, for adding zod validation.
