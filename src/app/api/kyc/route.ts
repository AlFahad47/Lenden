import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

/**
 * GET: Fetch the FULL user data including KYC details
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) return NextResponse.json({ message: "Email is required" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db("novapay_db");
    const user = await db.collection("users").findOne({ email });

    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * POST: Submit or Update KYC data with Country, Currency, and Address
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, role, currency, ...kycData } = body;

    if (!email) return NextResponse.json({ message: "Email is required" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db("novapay_db"); 
    const usersCollection = db.collection("users");

    // ডাটাবেসে আপডেট করার লজিক
    const result = await usersCollection.updateOne(
      { email: email }, 
      { 
        $set: { 
          role: role || "User",
          currency: currency || "USD", // কারেন্সি সরাসরি মেইন অবজেক্টে সেভ হবে
          kycStatus: "pending", 
          kycDetails: {
            ...kycData, // এতে fullName, nationality, permanentAddress ইত্যাদি থাকবে
          },
          kycSubmittedAt: new Date(),
          updatedAt: new Date()
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "KYC data submitted and status set to pending." 
    }, { status: 200 });

  } catch (error) {
    console.error("POST KYC Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}