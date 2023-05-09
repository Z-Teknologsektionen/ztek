import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { GetServerSidePropsContext } from "next";
import type { DefaultSession, NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "~/env.mjs";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      admin: boolean;
      email: string;
      id: string;
      name: string;
      picture: string;
    };
  }

  interface User {
    admin: boolean;
    //   // ...other properties
    //   // role: UserRole;
  }
}

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    session({ session, user }) {
      if (session.user && user.email) {
        // eslint-disable-next-line no-param-reassign
        session.user.email = user.email;
        session.user.admin = user.admin;
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
    signIn(params) {
      if (!params.user.email) return false;
      return params.user.email.endsWith("@ztek.se");
    },
  },
  secret: env.NEXTAUTH_SECRET,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => getServerSession(ctx.req, ctx.res, authOptions);

export default authOptions;
