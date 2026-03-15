import type { NextAuthConfig } from "next-auth";

/**
 * Lightweight auth config for Edge Runtime (middleware).
 * Does NOT import Prisma or bcryptjs — only JWT/session callbacks.
 */
export default {
  providers: [], // providers are configured in the full auth.ts
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;
