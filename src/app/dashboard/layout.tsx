"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  ShieldCheck,
  Bell,
  ChevronLeft,
  ChevronRight,
  UserCog,
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: UserCog, label: "Admin", path: "/dashboard/admin" },
  { icon: Users, label: "Users", path: "/dashboard/users" },
  { icon: CreditCard, label: "Transactions", path: "/dashboard/transactions" },
  { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
  { icon: ShieldCheck, label: "KYC", path: "/dashboard/kyc-verification" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ---------- Page Title ---------- */
  const getPageTitle = () => {
    const segment = pathname.split("/").filter(Boolean).pop();
    if (!segment || segment === "dashboard") return "Dashboard";
    return segment.replace(/-/g, " ");
  };

  /* ---------- Lock body scroll when mobile sidebar open ---------- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  return (
    <div className="flex h-screen overflow-hidden relative bg-slate-100 dark:bg-slate-950">
      {/* ================= Sidebar ================= */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full md:h-auto
          ${collapsed ? "w-20" : "w-64"}
          bg-white dark:bg-slate-900
          border-r border-slate-200 dark:border-slate-800
          transform transition-all duration-300 ease-in-out
          flex flex-col z-40
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo + Collapse */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
          {!collapsed && (
            <h1 className="text-lg font-bold tracking-wide bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              LENDEN
            </h1>
          )}

          {/* Collapse only on desktop */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:block p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive =
              pathname === item.path ||
              (item.path !== "/dashboard" && pathname.startsWith(item.path));

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-emerald-500 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                  }
                `}
              >
                <item.icon size={18} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ================= Overlay (Mobile) ================= */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* ================= Main ================= */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition"
          >
            ☰
          </button>

          <h2 className="text-lg font-semibold capitalize text-slate-700 dark:text-slate-200">
            {getPageTitle()}
          </h2>

          {/* Right section */}
          <div className="flex items-center gap-5">
            <button className="relative">
              <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full" />
            </button>

            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-semibold shadow">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
