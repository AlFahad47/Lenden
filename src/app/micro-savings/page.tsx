"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Percent, CalendarDays, Wallet, X, Sparkles, TrendingUp, AlertCircle, Info, Plus } from 'lucide-react';
import { useSession } from "next-auth/react"; // Session use করার জন্য

export default function SmartSavingGoal() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form States
  const [goalName, setGoalName] = useState("");
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [months, setMonths] = useState<number>(1);
  
  // Calculated States
  const [suggestedPercent, setSuggestedPercent] = useState<number>(0);
  const [monthlySavingNeeded, setMonthlySavingNeeded] = useState<number>(0);

  useEffect(() => {
    if (targetAmount > 0 && months > 0 && income > 0) {
      const neededPerMonth = targetAmount / months;
      const percentOfIncome = (neededPerMonth / income) * 100;
      
      setMonthlySavingNeeded(Math.round(neededPerMonth));
      setSuggestedPercent(parseFloat(percentOfIncome.toFixed(1)));
    }
  }, [income, targetAmount, months]);

  const disposableIncome = income - expense;
  const isFeasible = disposableIncome >= monthlySavingNeeded;

  // --- API CALL FUNCTION ---
 // --- REWRITTEN API CALL FUNCTION ---
  const handleConfirmGoal = async () => {
    // ১. ডিবাগিং এর জন্য কনসোলে চেক করা (F12 চেপে Console এ দেখবেন)
    console.log("Current Session:", session);
    console.log("Current Goal Name:", goalName);
    console.log("Current Target:", targetAmount);

    // ২. সুনির্দিষ্ট ভ্যালিডেশন চেক
    if (!session || !session.user) {
      alert("সেশন পাওয়া যায়নি। দয়া করে আবার লগইন করুন।");
      return;
    }

    if (!goalName || goalName.trim() === "") {
      alert("গোল এর একটি নাম দিন (যেমন: Phone, Laptop)।");
      return;
    }

    if (targetAmount <= 0) {
      alert("Target Amount অবশ্যই ০ এর বেশি হতে হবে।");
      return;
    }

    if (!isFeasible) {
      alert("আপনার খরচ বাদ দিলে এই গোলটি পূরণ করা সম্ভব নয়। দয়া করে ইনপুট চেক করুন।");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        email: session.user.email,
        newGoal: {
          goalName: goalName.trim(),
          monthlyIncome: income,
          estExpense: expense,
          targetAmount: targetAmount,
          time: months,
          suggestedPercent: suggestedPercent,
          status: "active",
        }
      };

      console.log("Sending Payload:", payload);

      const res = await fetch("/api/user/update", { // আপনার সঠিক পাথ
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

      const data = await res.json();

      if (res.ok) {
        alert("Smart Goal সফলভাবে সেভ হয়েছে!");
        setIsOpen(false);
        setGoalName(""); // রিসেট গোল নেম
      } else {
        alert("Error: " + (data.message || "সেভ করতে সমস্যা হয়েছে।"));
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("সার্ভারের সাথে কানেক্ট করা যাচ্ছে না।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#050a14] text-[#1E293B] dark:text-white p-6 md:p-12 transition-colors duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-white dark:to-blue-500 bg-clip-text text-transparent">
          NovaPay Savings
        </h1>
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-blue-600 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
        >
          <Plus size={20} /> Create Smart Goal
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsOpen(false)} 
              className="fixed inset-0 bg-black/40 dark:bg-black/90 backdrop-blur-md" 
            />

            <motion.div 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 50 }}
              className="relative w-full max-w-4xl bg-white dark:bg-[#0c1425] border border-gray-200 dark:border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              <button 
                onClick={() => setIsOpen(false)} 
                className="absolute top-8 right-8 text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors"
              >
                <X />
              </button>

              {/* LEFT: INPUT FORM */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-500/10 dark:bg-blue-500/20 rounded-2xl text-blue-600 dark:text-blue-400">
                    <Sparkles />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Setup Goal</h2>
                </div>

                <div className="space-y-4">
                  <InputField 
                    label="Goal Name" 
                    icon={<Target size={16}/>} 
                    placeholder="e.g. Europe Trip" 
                    value={goalName}
                    onChange={(e:any) => setGoalName(e.target.value)}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Monthly Income" icon={<TrendingUp size={16}/>} type="number" onChange={(e:any) => setIncome(Number(e.target.value))} />
                    <InputField label="Est. Expenses" icon={<AlertCircle size={16}/>} type="number" onChange={(e:any) => setExpense(Number(e.target.value))} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Target Amount ($)" icon={<Wallet size={16}/>} type="number" onChange={(e:any) => setTargetAmount(Number(e.target.value))} />
                    <InputField label="Time (Months)" icon={<CalendarDays size={16}/>} type="number" onChange={(e:any) => setMonths(Number(e.target.value))} />
                  </div>
                </div>
              </div>

              {/* RIGHT: SMART SUGGESTION BOX */}
              <div className="bg-blue-50/50 dark:bg-white/5 border border-blue-100 dark:border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-700 dark:text-white">
                    <Info size={20} className="text-blue-500 dark:text-blue-400" /> AI Suggestion
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="p-4 rounded-2xl bg-blue-600/5 dark:bg-blue-500/10 border border-blue-600/10 dark:border-blue-500/20">
                      <p className="text-gray-500 dark:text-gray-400 text-sm">Recommended Monthly Save</p>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        ${monthlySavingNeeded} <span className="text-sm font-normal text-gray-400">/ month</span>
                      </p>
                    </div>

                    <div className="flex justify-between items-center px-2">
                      <span className="text-gray-500 dark:text-gray-400">Calculated Percentage</span>
                      <span className="text-2xl font-bold text-gray-800 dark:text-white">{suggestedPercent}%</span>
                    </div>

                    {income > 0 && (
                      <div className={`p-4 rounded-2xl text-sm transition-colors ${isFeasible ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'}`}>
                        {isFeasible 
                          ? `Great! You have $${disposableIncome - monthlySavingNeeded} left after saving.` 
                          : `Warning: This goal requires more than your disposable income ($${disposableIncome}).`}
                      </div>
                    )}
                  </div>
                </div>

                <motion.button 
                  onClick={handleConfirmGoal}
                  disabled={loading || !isFeasible || targetAmount <= 0}
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-5 rounded-2xl font-bold text-lg mt-8 shadow-xl transition-all ${
                    loading || !isFeasible 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-blue-600 text-white shadow-blue-600/30 hover:bg-blue-500"
                  }`}
                >
                  {loading ? "Processing..." : `Confirm ${suggestedPercent}% Auto-Save`}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InputField({ label, icon, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-2 px-1">
        {icon} {label}
      </label>
      <input 
        {...props} 
        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 text-gray-800 dark:text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all placeholder:text-gray-400" 
      />
    </div>
  );
}