"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  Bell,
  ShieldCheck,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useRouter, usePathname } from "next/navigation";

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

function Card({ children, className = "" }: any) {
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

function CardContent({ children, className = "" }: any) {
  return <div className={className}>{children}</div>;
}

function Button({ children, className = "", ...props }: any) {
  return (
    <button
      className={`
        p-2 rounded-xl
        hover:bg-slate-200 dark:hover:bg-slate-800
        transition
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

const sidebarItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard/AdminDashboard" },
  { icon: Users, label: "Users", path: "/dashboard/UserDashboard" },
  { icon: CreditCard, label: "Transactions", path: "/dashboard/transactions" },
  { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
  {
    icon: ShieldCheck,
    label: "KYC Verification",
    path: "/dashboard/kyc-verification",
  },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

export default function LendenDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="h-screen relative overflow-hidden bg-gradient-to-br from-purple-300 via-sky-200 to-blue-300 dark:from-blue-950 dark:via-slate-950 dark:to-purple-950 text-slate-800 dark:text-slate-100 flex transition-colors duration-500">
      {/* SIDEBAR */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 256 }}
        transition={{ duration: 0.3 }}
        className={`fixed md:static top-0 left-0 h-screen md:h-full ${
          collapsed ? "w-20" : "w-64"
        } bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6 z-40 transition-all duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent whitespace-nowrap">
              Lenden Admin
            </h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:block text-emerald-500 text-xl"
          >
            ☰
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item, i) => {
            const isActive = pathname === item.path;

            return (
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  router.push(item.path);
                  setMobileOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "hover:bg-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${isActive ? "text-emerald-500" : ""}`}
                />
                {!collapsed && <span>{item.label}</span>}
              </motion.button>
            );
          })}
        </nav>
      </motion.aside>

      {/* MAIN */}
      <div className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-20 h-16 border-b border-slate-200 dark:border-slate-800 bg-white/75 dark:bg-slate-900/70 backdrop-blur-xl px-8 flex items-center justify-between">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-emerald-500 text-xl"
          >
            ☰
          </button>

          <h2 className="text-xl font-semibold capitalize">
            {pathname.split("/").pop()?.replace("-", " ")}
          </h2>

          <div className="flex items-center gap-4">
            <Button>
              <Bell className="w-5 h-5" />
            </Button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-md" />
          </div>
        </header>

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
                {/* chart here */}
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
