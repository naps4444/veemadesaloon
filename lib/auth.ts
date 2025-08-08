// lib/auth.ts

import { NextAuthOptions, DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { clientPromise } from "./mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

// Extend types to include role
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role || "user", // fallback to "user" if undefined
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.role = user.role; // ✅ Make sure this is here
    }
    return token;
  },
  async session({ session, token }) {
    if (token && session.user) {
      session.user.role = token.role; // ✅ Also required here
    }
    return session;
  },
},

};
