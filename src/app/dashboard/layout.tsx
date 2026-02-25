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
  { icon: ShieldCheck, label: "KYC", path: "/dashboard/kyc" },
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

  const getPageTitle = () => {
    const segment = pathname.split("/").filter(Boolean).pop();
    if (!segment || segment === "dashboard") return "Dashboard";
    return segment.replace(/-/g, " ");
  };

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  return (
    <div
      className="flex h-screen overflow-hidden relative 
      bg-blue-50 dark:bg-[#04090f]"
    >
      {/* Sidebar */}
      <aside
        className={`
        fixed md:static top-0 left-0 h-full md:h-auto
        ${collapsed ? "w-20" : "w-64"}
        bg-white dark:bg-[#0c1a2b]
        border-r border-blue-200 dark:border-blue-900
        transition-all duration-300 flex flex-col z-40
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      >
        <div
          className="h-16 flex items-center justify-between px-4 
          border-b border-blue-200 dark:border-blue-900"
        >
          {!collapsed && (
            <h1
              className="text-lg font-bold 
              text-[#0070ff] dark:text-[#00b4ff] tracking-wide"
            >
              NovaPay
            </h1>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md 
            hover:bg-blue-100 dark:hover:bg-blue-900/40"
          >
            {collapsed ? (
              <ChevronRight size={18} className="text-blue-400" />
            ) : (
              <ChevronLeft size={18} className="text-blue-400" />
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
                    ? "bg-[#0070ff] text-white shadow-md"
                    : "text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40"
                }`}
              >
                <item.icon size={18} className="text-blue-400" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header
          className="h-16 
          bg-white dark:bg-[#0c1a2b]
          border-b border-blue-200 dark:border-blue-900
          flex items-center justify-between px-6"
        >
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 
            text-blue-500 dark:text-blue-400 
            rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/40"
          >
            ☰
          </button>

          <h2
            className="text-lg font-semibold capitalize 
            text-blue-800 dark:text-blue-200"
          >
            {getPageTitle()}
          </h2>

          <div className="flex items-center gap-5">
            <button className="relative">
              <Bell className="w-5 h-5 text-blue-400" />
              <span
                className="absolute -top-1 -right-1 
                w-2 h-2 bg-[#00b4ff] rounded-full"
              />
            </button>

            <div className="w-9 h-9 relative">
              <Image
                src="/Jarif24.jpeg"
                alt="Profile"
                fill
                className="rounded-full object-cover 
                border border-blue-300 dark:border-blue-700/50"
              />
            </div>
          </div>
        </header>

        <main
          className="flex-1 overflow-y-auto p-6 
          text-blue-900 dark:text-blue-100/80"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
