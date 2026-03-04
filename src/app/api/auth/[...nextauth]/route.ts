import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

const handler = NextAuth({
  providers: [
    // Google Login Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    
    // Email/Password Login Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("ইমেইল ও পাসওয়ার্ড দিতে হবে!");
        }

        const client = await clientPromise;
        const db = client.db();
        
        // ডাটাবেজ থেকে ইমেইল দিয়ে ইউজার খোঁজা
        const user = await db.collection("users").findOne({ email: credentials.email });
        if (!user) {
          throw new Error("এই ইমেইল দিয়ে কোনো একাউন্ট পাওয়া যায়নি!");
        }

        // ইউজারের দেওয়া পাসওয়ার্ড এবং ডাটাবেজের হ্যাশ করা পাসওয়ার্ড মেলানো
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) {
          throw new Error("পাসওয়ার্ড ভুল হয়েছে!");
        }

        // Login success — return these fields to be stored in the JWT token
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role ?? "User", // include role from database (fallback to "User")
        };
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
  
  callbacks: {
    async signIn({ user, account }) {
      // Google দিয়ে লগিন করলে ইউজারকে ডাটাবেজে সেভ করা (যদি আগে না থাকে)
      if (account?.provider === "google") {
        try {
          const client = await clientPromise;
          const db = client.db();
          
          const existingUser = await db.collection("users").findOne({ email: user.email });
          
          if (!existingUser) {
            await db.collection("users").insertOne({
              name: user.name,
              email: user.email,
              image: user.image,
              provider: "google",
              createdAt: new Date(),
            });
          }
        } catch (error) {
          console.error("Google Sign-in Error:", error);
          return false;
        }
      }
      return true;
    },
    
    async jwt({ token, user }) {
      // When the user logs in, NextAuth calls this with the user object
      // We copy role into the token so it persists across requests
      if (user) {
        token.role = (user as { role?: string }).role ?? "User";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string; // copy role from token into session
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };