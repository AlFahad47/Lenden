import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, transactionId, type, amount, currency, status, sender, receiver, description } = body;

    if (!email) return NextResponse.json({ message: "Email is required" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db("novapay_db");
    const usersCollection = db.collection("users");

    // নতুন ট্রানজেকশন অবজেক্ট
    const newTransaction = {
      transactionId: transactionId || `TXN${Date.now()}`, // অটো আইডি জেনারেশন যদি না থাকে
      type,
      amount: Number(amount),
      currency: currency || "BDT",
      status: status || "completed",
      sender,
      receiver,
      description,
      date: new Date() // বর্তমান সময়
    };

    // $push ব্যবহার করে history অ্যারেতে ডাটা ইনসার্ট করা
    const result = await usersCollection.updateOne(
      { email: email },
      { 
        $push: { history: newTransaction as any },
        $set: { updatedAt: new Date() }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Transaction added to history",
      transaction: newTransaction 
    }, { status: 200 });

  } catch (error) {
    console.error("Transaction Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}