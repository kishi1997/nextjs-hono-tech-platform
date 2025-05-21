import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/db";
import { accounts, sessions, users } from "@/db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
  }),
  providers: [Google],
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   return baseUrl + "/dashboard"; // ← 認証後に移動させたいページ
    // },
    async signIn({ user, account, profile }) {
      console.log("ログイン成功:", {
        user: user.email,
        provider: account?.provider,
        timestamp: new Date().toISOString(),
      });
      return true;
    },
    async session({ session, user }) {
      // セッション情報のログ
      console.log("セッション更新:", {
        user: session.user?.email,
        timestamp: new Date().toISOString(),
      });
      return session;
    },
  },
});
