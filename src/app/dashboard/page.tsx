"use client";

import {
  Users,
  CreditCard,
  DollarSign,
  Activity,
  ArrowUpRight,
} from "lucide-react";

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back 👋
        </h1>
        <p className="opacity-90">
          Here’s what’s happening with your platform today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Users"
          value="12,450"
          icon={<Users size={22} />}
          growth="+12%"
        />
        <StatCard
          title="Total Revenue"
          value="$84,300"
          icon={<DollarSign size={22} />}
          growth="+18%"
        />
        <StatCard
          title="Transactions"
          value="1,245"
          icon={<CreditCard size={22} />}
          growth="+5%"
        />
        <StatCard
          title="Active Sessions"
          value="342"
          icon={<Activity size={22} />}
          growth="+3%"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <h2 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-200">
          Quick Actions
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <QuickButton label="Add New User" />
          <QuickButton label="Create Report" />
          <QuickButton label="Verify KYC" />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <h2 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-200">
          Recent Activity
        </h2>

        <ul className="space-y-4">
          <ActivityItem text="New user registered" time="2 minutes ago" />
          <ActivityItem text="Transaction completed" time="10 minutes ago" />
          <ActivityItem text="KYC verified successfully" time="1 hour ago" />
          <ActivityItem text="New admin added" time="3 hours ago" />
        </ul>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function StatCard({
  title,
  value,
  icon,
  growth,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  growth: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl text-emerald-600 dark:text-emerald-400">
          {icon}
        </div>
        <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
          {growth}
          <ArrowUpRight size={14} />
        </span>
      </div>
      <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
        {value}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        {title}
      </p>
    </div>
  );
}

function QuickButton({ label }: { label: string }) {
  return (
    <button className="bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white transition px-5 py-3 rounded-xl font-medium text-slate-700 dark:text-slate-200">
      {label}
    </button>
  );
}

function ActivityItem({
  text,
  time,
}: {
  text: string;
  time: string;
}) {
  return (
    <li className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
      <span className="text-slate-700 dark:text-slate-200">{text}</span>
      <span className="text-sm text-slate-500">{time}</span>
    </li>
  );
}