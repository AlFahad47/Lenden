import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "ইমেইল দিতে হবে!" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    // ইউজার আছে কিনা চেক করা
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "এই ইমেইল দিয়ে কোনো একাউন্ট পাওয়া যায়নি!" }, { status: 404 });
    }

    // Google দিয়ে লগিন করা ইউজার হলে পাসওয়ার্ড রিসেট করা যাবে না
    if (user.provider === "google") {
      return NextResponse.json({ message: "আপনি Google দিয়ে লগিন করেছেন, পাসওয়ার্ড রিসেট করার দরকার নেই!" }, { status: 400 });
    }

    // Random 6-digit reset token তৈরি করা
    const resetToken = crypto.randomInt(100000, 999999).toString();
    const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 মিনিট valid

    // ডাটাবেজে token সেভ করা
    await db.collection("users").updateOne(
      { email },
      {
        $set: {
          resetToken,
          resetTokenExpiry,
        },
      }
    );

    // NOTE: এখানে আসলে Email পাঠানোর কোড থাকবে, কিন্তু Development-এ শুধু token রিটার্ন করছি
    // Production-এ Nodemailer/SendGrid/Resend দিয়ে Email পাঠাবেন
    
    return NextResponse.json({ 
      message: "পাসওয়ার্ড রিসেট কোড পাঠানো হয়েছে! (Development Mode: Check Console)", 
      resetToken // শুধুমাত্র development এ দেখানোর জন্য
    }, { status: 200 });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json({ message: "সার্ভারে কোনো সমস্যা হয়েছে!" }, { status: 500 });
  }
}
