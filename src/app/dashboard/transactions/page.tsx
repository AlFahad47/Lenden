"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, Search, Filter, Loader2 } from "lucide-react";
// ইউজার ইমেইল পাওয়ার জন্য আপনার Auth হুক (যেমন: useSession বা localStorage)
// এখানে আমি ডেমো হিসেবে একটি ইমেইল ধরছি
const USER_EMAIL = "user@example.com"; 

export default function TransactionsPage() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ১. ডাটাবেজ থেকে ট্রানজেকশন ফেচ করা
  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await fetch(`/api/user?email=${USER_EMAIL}`); // আপনার GET API রুট
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-blue-600" /></div>;

  // ২. ক্যালকুলেশন (আপনার পাঠানো JSON ফরম্যাট অনুযায়ী)
  const transactions = userData?.history || [];
  const totalIncome = transactions
    .filter((t: any) => t.type === "deposit")
    .reduce((acc: number, t: any) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t: any) => t.type === "withdraw")
    .reduce((acc: number, t: any) => acc + t.amount, 0);

  const netBalance = userData?.balance || 0;

  return (
    <motion.div initial="hidden" animate="show" className="space-y-8 px-1 sm:px-2">
      {/* Header & Search (আগের মতোই থাকবে) ... */}

      {/* Summary Cards - ডাইনামিক ভ্যালু */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <SummaryCard label="Total Income" value={`${totalIncome} BDT`} color="text-green-500" />
        <SummaryCard label="Total Expense" value={`${totalExpense} BDT`} color="text-red-500" />
        <SummaryCard label="Net Balance" value={`${netBalance} BDT`} color="text-blue-500" />
      </div>

      {/* Transactions List - লুপ ঘুরিয়ে ডাটা দেখানো */}
      <div className="rounded-2xl bg-white/80 dark:bg-[#0c1a2b]/80 border border-blue-200 dark:border-blue-900 shadow-md overflow-hidden">
        {transactions.length > 0 ? (
          // উল্টো করে দেখাচ্ছি যাতে লেটেস্ট ট্রানজেকশন আগে আসে
          [...transactions].reverse().map((tx: any, i: number) => {
            const isIncome = tx.type === "deposit";
            return (
              <div key={tx.transactionId} className="flex items-center justify-between px-6 py-4 border-b dark:border-blue-900">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${isIncome ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"}`}>
                    {isIncome ? <ArrowDownLeft className="text-green-500" size={18} /> : <ArrowUpRight className="text-red-500" size={18} />}
                  </div>
                  <div>
                    <p className="font-medium text-blue-900 dark:text-blue-100">{tx.description || tx.type}</p>
                    <p className="text-xs text-blue-500">{new Date(tx.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className={`font-semibold ${isIncome ? "text-green-500" : "text-red-500"}`}>
                  {isIncome ? "+" : "-"}{tx.amount} {tx.currency}
                </div>
              </div>
            );
          })
        ) : (
          <p className="p-10 text-center text-gray-500">No transactions found.</p>
        )}
      </div>
    </motion.div>
  );
}

// ছোট কম্পোনেন্ট কার্ডের জন্য
function SummaryCard({ label, value, color }: any) {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1a2b] border border-blue-200 dark:border-blue-900 shadow-md">
      <p className="text-sm text-blue-600 dark:text-blue-400">{label}</p>
      <h2 className={`text-2xl font-bold ${color}`}>{value}</h2>
    </div>
  );
}