import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, resetToken, newPassword } = await req.json();

    if (!email || !resetToken || !newPassword) {
      return NextResponse.json({ message: "সবগুলো ফিল্ড পূরণ করতে হবে!" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    // ইউজার খুঁজে বের করা
    const user = await db.collection("users").findOne({ 
      email,
      resetToken,
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid reset token বা ইমেইল ভুল!" }, { status: 400 });
    }

    // Token expired কিনা চেক করা
    if (user.resetTokenExpiry && new Date() > new Date(user.resetTokenExpiry)) {
      return NextResponse.json({ message: "রিসেট কোড expired হয়ে গেছে! নতুন করে চেষ্টা করুন।" }, { status: 400 });
    }

    // নতুন পাসওয়ার্ড হ্যাশ করা
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // পাসওয়ার্ড আপডেট করা এবং token মুছে দেওয়া
    await db.collection("users").updateOne(
      { email },
      {
        $set: {
          password: hashedPassword,
        },
        $unset: {
          resetToken: "",
          resetTokenExpiry: "",
        },
      }
    );

    return NextResponse.json({ message: "পাসওয়ার্ড সফলভাবে রিসেট হয়েছে!" }, { status: 200 });

  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json({ message: "সার্ভারে কোনো সমস্যা হয়েছে!" }, { status: 500 });
  }
}
