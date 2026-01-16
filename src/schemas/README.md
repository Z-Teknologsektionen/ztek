# Zod Schemas

## What is Zod... and schemas?

Zod is a library for data validation. Data is validated against a schema, which is an object specifying what values will pass, and what values will fail. Furthermore, Zod schemas may specify error messages upon failed validation. Validation may be made more strict than just ensuring proper types.

Methods like `z.object()`, `z.string()` or `someSchemaInstance.refine()` all return schemas, while methods like `someSchemaInstance.parse()` does data validation. Type hints (as displayed in VS Code) for Zod schemas are very complicated, and not very helpful. For typing a variable as a Zod schema, use `ZodTypeAny`.

Refer to the newest [Zod documentation](https://zod.dev) for usage and meaning of unclear member functions like `someSchemaInstance.partial()`. Alternatively for matching the version of Zod used in ztek (as of january 2026), refer to the [Zod 3 documentation](https://v3.zod.dev/)

## What's in this folder?

- Schemas

- Helpers, which are also schemas, but used to validate object properties.

## Where are the schemas used?

- ### Inputs to [React Hook Form](https://react-hook-form.com/docs)s.

  Schemas are passed to the `useFormWithZodSchema` hook, to define what fields are allowed in the form, and to determine what error messages to display to the user on improper input. This will look something like:

  ```ts
  import { useFormWithZodSchema } from "~/hooks/useFormWithZodSchema";
  import { upsertMemberBaseSchema } from "~/schemas/member";

  const form = useFormWithZodSchema({
    schema: upsertMemberBaseSchema,
    defaultValues,
  });

  // form fields may now be accessed
  const nickName: string = form.getValues().nickName;
  ```

  The purpose of this is to instantly give the user an error message upon invalid form input. This is possible to extract from the `form` object, ... probably, somehow.

- ### Inputs to tRPC procedures

  Schemas are used as input validators for tRPC [procedures](https://trpc.io/docs/server/procedures). This validation is done both on the client-side (to not need to send requests that'd obviously be rejected), and later on server-side (because u can't ever trust the client 💔).

  This will look something like the following example. Two tRPC procedures are defined. In the first case `getOneByEmail`, the Zod schema is defined inline. In the second case `updateMemberAsActive`, the Zod schema is imported.

  ```ts
  import { z } from "zod";
  import { updateMemberAsActiveSchema } from "~/schemas/member";

  export const committeeMemberRouter = createTRPCRouter({
    getOneByEmail: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
        }),
      )
      .query(({ ctx, input: { email } }) => {
        /*
         *  Database operation goes here
         *  This would be implemented using `prisma` client
         */
        return committeeMember;
      }),
    updateMemberAsActive: protectedProcedure
      .input(updateMemberAsActiveSchema)
      .mutation(
        ({ ctx, input: { id, name, nickName, image, order, phone } }) => {
          /*
           *  Database operation goes here
           *  This would be implemented using `prisma` client
           */
          return updatedMember;
        },
      ),
    /* further procedures go here */
  });
  ```

  The purpose of this is:

  1.  Known types in tRPC procedure definitions
  2.  Catching unexpected errors that should already not occur if the input came from a already validated form.

- ### sftp api

  The SFTP API is for some reason not currently using tRPC (may change in the future). Instead the API endpoint is implemented using Next's App Router [Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers). In this case instead of passing the Zod schema to some black-box function defined by a package, the Zod schema is used using the Zod native way: `someSchemaInstance.safeParse()`. Here's an example:

  ```ts
  import { type NextRequest } from "next/server";
  import { NextResponseZODError } from "~/app/api/next-response-helpers";
  import { sftpDeleteFileSchema } from "~/schemas/sftp";
  import type { NextSFTPAPIResponseWithUrl } from "~/types/sftp-types";
  import { deleteFileFromSftpServer } from "./utils/sftp-engine";

  export async function DELETE(
    request: NextRequest,
  ): NextSFTPAPIResponseWithUrl {
    const result = sftpDeleteFileSchema.safeParse(await request.json());

    if (!result.success) {
      return NextResponseZODError(result.error);
    }

    return await deleteFileFromSftpServer(result.data);
    //removed some error handling, to keep example shorter
  }
  ```
