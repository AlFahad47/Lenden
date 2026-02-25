import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

const handler = NextAuth({
  providers: [
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

        // লগিন সাকসেস হলে এই ডাটাগুলো সেশনে পাঠাবে
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };