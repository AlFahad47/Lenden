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
        bg-white/80 dark:bg-slate-900/80
        backdrop-blur-2xl
        border border-slate-200/60 dark:border-slate-700/60
        rounded-2xl
        shadow-xl shadow-slate-200/50 dark:shadow-black/50
        hover:shadow-2xl hover:shadow-emerald-500/10
        hover:-translate-y-1
        transition-all duration-500 ease-out
        before:absolute before:inset-0
        before:rounded-2xl
        before:bg-gradient-to-br
        before:from-emerald-400/5 before:to-cyan-400/5
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
    <div className="h-screen relative overflow-hidden bg-gradient-to-br from-purple-300 via-sky-200 to-blue-300 dark:from-blue-950 dark:via-slate-950 dark:to-purple-950 text-slate-800 dark:text-slate-100 flex transition-colors duration-500">
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
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      {stat.title}
                    </p>
                    <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </section>

          {/* Charts */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <Card className="h-80 xl:col-span-2">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4">
                  Revenue Analytics
                </h4>

                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        strokeOpacity={0.1}
                      />
                      <XAxis
                        dataKey="name"
                        tick={{ fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0f172a",
                          border: "none",
                          borderRadius: "8px",
                        }}
                        labelStyle={{ color: "#10b981" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#10b981"
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
                <h4 className="text-lg font-semibold mb-4">
                  User Distribution
                </h4>
                <div className="h-full flex items-center justify-center text-slate-400">
                  Pie Chart
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Table */}
          <section>
            <Card>
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4">
                  Recent Transactions
                </h4>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
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
                          className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition"
                        >
                          <td className="py-3">User {row}</td>
                          <td className="py-3">$120.00</td>
                          <td className="py-3">
                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-500">
                              Success
                            </span>
                          </td>
                          <td className="py-3">Today</td>
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
