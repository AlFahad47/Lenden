"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { usePathname } from "next/navigation";

const stats = [
  { title: "Total Users", value: "12,540" },
  { title: "Total Revenue", value: "$45,210" },
  { title: "Transactions", value: "8,320" },
  { title: "Pending KYC", value: "124" },
];

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 800 },
  { name: "Mar", value: 650 },
  { name: "Apr", value: 900 },
  { name: "May", value: 1200 },
  { name: "Jun", value: 1100 },
];

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        relative
        bg-white dark:bg-[#0c1a2b]
        border border-blue-200 dark:border-blue-700/50
        rounded-2xl
        shadow-lg dark:shadow-blue-900/30
        hover:shadow-xl dark:hover:shadow-blue-500/20
        hover:-translate-y-1
        transition-all duration-500 ease-out
        before:absolute before:inset-0
        before:rounded-2xl
        before:bg-[#0070ff]/10
        before:opacity-0
        hover:before:opacity-100
        before:transition-opacity before:duration-500
        ${className}
      `}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function CardContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export default function Admin() {
  const pathname = usePathname();

  return (
    <div className="h-screen relative overflow-hidden bg-gray-50 dark:bg-[#04090f] text-gray-800 dark:text-blue-100 flex transition-colors duration-500">
      <div className="flex-1 overflow-y-auto">
        <main className="p-8 grid gap-8">
          {/* Stats */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="hover:scale-[1.02] transition">
                  <CardContent className="p-6">
                    <p className="text-gray-500 dark:text-blue-100/60 text-sm">
                      {stat.title}
                    </p>
                    <h3 className="text-3xl font-bold mt-2 text-blue-600 dark:text-blue-400">
                      {stat.value}
                    </h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </section>

          {/* Charts */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <Card className="h-80 xl:col-span-2">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-blue-300">
                  Revenue Analytics
                </h4>

                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid
                        stroke="rgba(0,157,255,0.08)"
                        strokeDasharray="3 3"
                      />
                      <XAxis
                        dataKey="name"
                        tick={{ fill: "#64748b" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: "#64748b" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0c1a2b",
                          border: "1px solid rgba(0,157,255,0.2)",
                          borderRadius: "8px",
                        }}
                        labelStyle={{ color: "#0095ff" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#0095ff"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="h-80">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-blue-300">
                  User Distribution
                </h4>
                <div className="h-full flex items-center justify-center text-gray-400 dark:text-blue-200/60">
                  Pie Chart
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Table */}
          <section>
            <Card>
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-blue-300">
                  Recent Transactions
                </h4>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-gray-500 dark:text-blue-100/60 border-b border-gray-200 dark:border-blue-800">
                      <tr>
                        <th className="text-left py-3">User</th>
                        <th className="text-left py-3">Amount</th>
                        <th className="text-left py-3">Status</th>
                        <th className="text-left py-3">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4].map((row) => (
                        <tr
                          key={row}
                          className="border-b border-gray-200 dark:border-blue-900 hover:bg-gray-100 dark:hover:bg-blue-900/30 transition"
                        >
                          <td className="py-3 text-gray-700 dark:text-blue-100">
                            User {row}
                          </td>
                          <td className="py-3 text-gray-700 dark:text-blue-100">
                            $120.00
                          </td>
                          <td className="py-3">
                            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 dark:bg-[#0070ff]/20 dark:text-[#00b4ff]">
                              Success
                            </span>
                          </td>
                          <td className="py-3 text-gray-500 dark:text-blue-200/70">
                            Today
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}
