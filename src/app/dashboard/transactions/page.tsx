"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, Search, Filter } from "lucide-react";

const transactions = [
  {
    id: 1,
    name: "Stripe Payment",
    type: "income",
    amount: 1250,
    date: "Feb 28, 2026",
  },
  {
    id: 2,
    name: "Netflix Subscription",
    type: "expense",
    amount: 15,
    date: "Feb 27, 2026",
  },
  {
    id: 3,
    name: "Client Transfer",
    type: "income",
    amount: 3200,
    date: "Feb 25, 2026",
  },
  {
    id: 4,
    name: "AWS Hosting",
    type: "expense",
    amount: 240,
    date: "Feb 24, 2026",
  },
];

const containerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const slideIn = {
  hidden: { opacity: 0, x: -30 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

export default function TransactionsPage() {
  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="show"
      className="space-y-8 px-1 sm:px-2"
    >
      {/* Page Header */}
      <motion.div
        variants={fadeUp}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-blue-900 dark:text-white">
            Transactions Overview
          </h1>
          <p className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm">
            Monitor your recent financial activity
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-blue-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full sm:w-64 pl-9 pr-4 py-2 rounded-lg border 
              border-blue-200 dark:border-blue-800
              bg-white dark:bg-[#0c1a2b]
              text-blue-800 dark:text-blue-200
              focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg 
            bg-blue-600 hover:bg-blue-700 
            text-white text-sm transition w-full sm:w-auto"
          >
            <Filter size={16} />
            Filter
          </motion.button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[
          { label: "Total Income", value: "$4,450", color: "text-green-500" },
          { label: "Total Expense", value: "$255", color: "text-red-500" },
          { label: "Net Balance", value: "$4,195", color: "text-blue-500" },
        ].map((card) => (
          <motion.div
            key={card.label}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="p-5 sm:p-6 rounded-2xl 
            bg-white/70 dark:bg-[#0c1a2b]/80
            backdrop-blur-xl
            border border-blue-200 dark:border-blue-900
            shadow-md"
          >
            <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400">
              {card.label}
            </p>
            <h2 className={`text-xl sm:text-2xl font-bold ${card.color}`}>
              {card.value}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* Transactions List */}
      <motion.div
        variants={fadeUp}
        className="rounded-2xl 
        bg-white/80 dark:bg-[#0c1a2b]/80
        backdrop-blur-xl
        border border-blue-200 dark:border-blue-900
        shadow-md overflow-hidden"
      >
        {transactions.map((tx, i) => {
          const isIncome = tx.type === "income";

          return (
            <motion.div
              key={tx.id}
              custom={i}
              variants={slideIn}
              initial="hidden"
              animate="show"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between
              gap-3 sm:gap-0
              px-4 sm:px-6 py-4 border-b last:border-none
              border-blue-100 dark:border-blue-900
              hover:bg-blue-50 dark:hover:bg-blue-900/30
              transition"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: isIncome ? -10 : 10 }}
                  className={`p-3 rounded-xl ${
                    isIncome
                      ? "bg-green-100 dark:bg-green-900/30"
                      : "bg-red-100 dark:bg-red-900/30"
                  }`}
                >
                  {isIncome ? (
                    <ArrowDownLeft className="text-green-500" size={18} />
                  ) : (
                    <ArrowUpRight className="text-red-500" size={18} />
                  )}
                </motion.div>

                <div>
                  <p className="font-medium text-sm sm:text-base text-blue-900 dark:text-blue-100">
                    {tx.name}
                  </p>
                  <p className="text-xs text-blue-500 dark:text-blue-400">
                    {tx.date}
                  </p>
                </div>
              </div>

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className={`font-semibold text-sm sm:text-base ${
                  isIncome ? "text-green-500" : "text-red-500"
                }`}
              >
                {isIncome ? "+" : "-"}${tx.amount}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
