import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, role, ...kycData } = body;

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const client = await clientPromise;
    // database name'novapay_db'
    const db = client.db("novapay_db"); 
    const usersCollection = db.collection("users");

    // user email
    const result = await usersCollection.updateOne(
      { email: email }, // match the email
      { 
        $set: { 
          role: role,
          kycStatus: "pending",
          kycDetails: kycData,
          kycSubmittedAt: new Date()
        } 
      },
      { upsert: false } // falseভ
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "User not found with this email" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "KYC data updated successfully!" }, { status: 200 });
  } catch (error) {
    console.error("KYC Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}