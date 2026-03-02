"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, Loader2, Download, FileText, Printer } from "lucide-react";
import { useSession } from "next-auth/react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function TransactionsPage() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const userEmail = session?.user?.email;

  useEffect(() => {
    async function fetchTransactions() {
      try {
        // 
        const res = await fetch(`/api/kyc?email=${session.user.email}`);  
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    }
    if (userEmail) fetchTransactions();
  }, [userEmail]);

  const transactions = userData?.history || [];

  // transection slip
  const downloadSingleReceipt = (tx: any) => {
    const doc = new jsPDF({
        unit: "mm",
        format: [100, 150] 
    });

    doc.setFontSize(16);
    doc.setTextColor(30, 80, 255);
    doc.text("Transaction Receipt", 10, 20);
    
    doc.setDrawColor(200, 200, 200);
    doc.line(10, 25, 90, 25);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Date: ${new Date(tx.date).toLocaleString()}`, 10, 35);
    doc.text(`Transaction ID: ${tx.transactionId}`, 10, 42);
    
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Description: ${tx.description || tx.type}`, 10, 55);
    doc.text(`Amount: ${tx.amount} ${tx.currency}`, 10, 65);
    doc.text(`Status: ${tx.status || "Completed"}`, 10, 75);

    doc.setFontSize(8);
    doc.text("Thank you for using NovaPay", 10, 100);

    doc.save(`Receipt_${tx.transactionId}.pdf`);
  };

 
  const downloadFullStatement = () => {
    const doc = new jsPDF();
    doc.text("Full Account Statement", 14, 20);
    
    const tableRows = transactions.map((tx: any) => [
      new Date(tx.date).toLocaleDateString(),
      tx.transactionId,
      tx.type,
      `${tx.amount} ${tx.currency}`,
      tx.status || "Completed"
    ]);

    autoTable(doc, {
      startY: 30,
      head: [["Date", "ID", "Type", "Amount", "Status"]],
      body: tableRows,
      theme: "striped"
    });

    doc.save(`Statement_${userEmail}.pdf`);
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-blue-600" /></div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 p-4 max-w-6xl mx-auto">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Account Statement</h1>
          <p className="text-gray-500 text-sm">View and download your recent activity</p>
        </div>
        
        {transactions.length > 0 && (
          <button 
            onClick={downloadFullStatement}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/20"
          >
            <Download size={18} />
            Download All
          </button>
        )}
      </div>

      {/* Transactions List */}
      <div className="rounded-2xl bg-white dark:bg-[#0c1a2b] border border-blue-100 dark:border-blue-900 shadow-xl overflow-hidden">
        <div className="p-6 border-b dark:border-blue-900 bg-gray-50/50 dark:bg-blue-900/10 flex items-center gap-2">
          <FileText className="text-blue-600" size={20} />
          <h3 className="font-bold text-blue-900 dark:text-blue-100">Recent Transactions</h3>
        </div>

        <div className="overflow-x-auto">
          {transactions.length > 0 ? (
            <div className="min-w-full divide-y dark:divide-blue-900">
              {[...transactions].reverse().map((tx: any) => {
                const isIncome = tx.type?.toLowerCase().includes("deposit") || tx.type?.toLowerCase().includes("receive");
                
                return (
                  <div key={tx.transactionId} className="flex items-center justify-between px-6 py-5 hover:bg-gray-50 dark:hover:bg-blue-900/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${isIncome ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20" : "bg-rose-100 text-rose-600 dark:bg-rose-900/20"}`}>
                        {isIncome ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 dark:text-gray-100">
                          {tx.description || tx.type}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          ID: {tx.transactionId} • {new Date(tx.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-right">
                      <div>
                        <p className={`text-lg font-bold ${isIncome ? "text-emerald-500" : "text-rose-500"}`}>
                          {isIncome ? "+" : "-"}{tx.amount} <span className="text-sm font-normal text-gray-400">{tx.currency}</span>
                        </p>
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{tx.status || "Completed"}</p>
                      </div>

                     
                      <button 
                        onClick={() => downloadSingleReceipt(tx)}
                        title="Download Receipt"
                        className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-blue-600 hover:text-white transition-all"
                      >
                        <Printer size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center">
              <FileText size={40} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 font-medium">No activity found in your history.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}