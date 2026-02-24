"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileOpen]);

  return (
    <div className="flex h-screen overflow-hidden relative bg-slate-100 dark:bg-slate-950">
      {/* Sidebar */}
      <aside
        className={`
    fixed md:static top-0 left-0 h-full md:h-auto
    ${collapsed ? "w-20" : "w-64"}
    bg-white dark:bg-slate-900
    border-r border-slate-200 dark:border-slate-800
    transition-all duration-300 flex flex-col z-40
    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
          {!collapsed && (
            <h1 className="text-lg font-bold text-emerald-500 tracking-wide">
              NovaPay
            </h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md  hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            {collapsed ? (
              <ChevronRight
                size={18}
                className="text-purple-600 dark:text-white"
              />
            ) : (
              <ChevronLeft
                size={18}
                className="text-purple-600 dark:text-white"
              />
            )}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive =
              item.path === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-emerald-500 text-white"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                <item.icon size={18} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Overlay (Mobile Only) */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 text-purple-600 dark:text-purple-400 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            ☰
          </button>
          <h2 className="text-lg font-semibold capitalize text-slate-700 dark:text-slate-200">
            {getPageTitle()}
          </h2>

          <div className="flex items-center gap-5">
            <button className="relative">
              <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full" />
            </button>

            {/* Profile Image */}
            <div className="w-9 h-9 relative">
              <Image
                src="/Jarif.jpeg"
                alt="Profile"
                fill
                className="rounded-full object-cover"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
