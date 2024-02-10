import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { AccountRoles } from "@prisma/client";
import type { GetServerSidePropsContext } from "next";
import type { DefaultSession, NextAuthOptions, Session } from "next-auth";
import { getServerSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  // eslint-disable-next-line @typescript-eslint/no-shadow, no-shadow
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      committeeId: string;
      committeeName: string;
      email: string;
      id: string;
      memberId: number;
      name: string;
      picture: string;
      roles: AccountRoles[];
    };
  }

  interface User {
    email: string;
    roles: AccountRoles[];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    email: string;
    roles: AccountRoles[];
  }
}

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, //1 dag
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          roles: user.roles,
          email: user.email,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      const committeeMember = await prisma.committeeMember.findFirst({
        where: {
          email: token.email,
        },
        include: {
          committee: {
            select: {
              name: true,
            },
          },
        },
      });

      return {
        ...session,
        user: {
          ...session.user,
          roles: token.roles,
          email: token.email,
          memberId: committeeMember?.id ?? undefined,
          committeeId: committeeMember?.committeeId ?? undefined,
          commiteeName: committeeMember?.committee.name ?? undefined,
        },
      };
    },
  },
  events: {
    createUser: async ({ user }) => {
      await prisma.committeeMember.updateMany({
        where: {
          email: user.email,
        },
        data: {
          userId: user.id,
        },
      });
    },
  },
  secret: env.NEXTAUTH_SECRET,
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}): Promise<Session | null> => getServerSession(ctx.req, ctx.res, authOptions);

export default authOptions;
