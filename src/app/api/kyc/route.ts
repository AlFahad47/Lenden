import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

/**
 * GET: database get
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
 * POST: edit save
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, fullName, phone, nationality, idNumber, currency, bank } = body;

    if (!email) return NextResponse.json({ message: "Email is required" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db("novapay_db");
    const usersCollection = db.collection("users");

    // $set
    const result = await usersCollection.updateOne(
      { email: email },
      {
        $set: {
          currency: currency,
          bank: bank,
          "kycDetails.fullName": fullName,
          "kycDetails.phone": phone,
          "kycDetails.nationality": nationality,
          "kycDetails.idNumber": idNumber, // read only
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Profile Updated in MongoDB!" }, { status: 200 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}