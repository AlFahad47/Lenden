import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, type, amount, currency, sender, receiver, description } = body;

    if (!email || !amount) {
      return NextResponse.json({ message: "Email and Amount are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("novapay_db");
    const usersCollection = db.collection("users");

    // ১. ইউজারের বর্তমান ব্যালেন্স চেক করা (যাতে নেগেটিভ ব্যালেন্স না হয়)
    const user = await usersCollection.findOne({ email });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const txAmount = Number(amount);
    
    // টাকা পাঠানোর বা বিল দেওয়ার ক্ষেত্রে ব্যালেন্স চেক
    const isExpense = ["withdraw", "send_money", "bill_payment"].includes(type.toLowerCase());
    if (isExpense && (user.balance || 0) < txAmount) {
      return NextResponse.json({ message: "Insufficient balance" }, { status: 400 });
    }

    // ২. ব্যালেন্স কতটুকু পরিবর্তন হবে তা নির্ধারণ করা
    // যদি টাইপ 'deposit' বা 'receive' হয় তবে যোগ হবে, নাহলে বিয়োগ হবে
    const balanceAdjustment = isExpense ? -txAmount : txAmount;

    // নতুন ট্রানজেকশন অবজেক্ট
    const newTransaction = {
      transactionId: `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`,
      type,
      amount: txAmount,
      currency: currency || "BDT",
      status: "completed",
      sender: sender || "Self",
      receiver: receiver || "System",
      description,
      date: new Date()
    };

    // ৩. একসাথেই হিস্ট্রি পুশ এবং ব্যালেন্স ইনক্রিমেন্ট/ডিক্রিমেন্ট করা
    const result = await usersCollection.updateOne(
      { email: email },
      { 
        $push: { history: newTransaction as any },
        $inc: { balance: balanceAdjustment }, // মেইন ব্যালেন্স আপডেট
        $set: { updatedAt: new Date() }
      }
    );

    return NextResponse.json({ 
      success: true, 
      message: "Transaction successful and balance updated",
      transaction: newTransaction,
      updatedBalance: (user.balance || 0) + balanceAdjustment
    }, { status: 200 });

  } catch (error) {
    console.error("Transaction Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}