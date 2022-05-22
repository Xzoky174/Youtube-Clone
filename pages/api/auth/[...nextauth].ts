import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connect from "../../../utils/mongoConnect";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

export default NextAuth({
  secret: process.env.SECRET,

  jwt: { maxAge: 50 * 24 * 30 * 60 },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  adapter: MongoDBAdapter(
    (await connect()).usersClient as unknown as Promise<any>
  ),

  callbacks: {
    async session({ session, user }) {
      session = {
        ...session,
        user: {
          id: user.id,
          ...session.user,
        },
      };

      return session;
    },
  },
});
