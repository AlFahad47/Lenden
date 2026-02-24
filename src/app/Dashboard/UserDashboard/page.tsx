"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Globe, CreditCard, Landmark } from "lucide-react";

function Card({ children, className = "" }: any) {
  return (
    <div
      className={`relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl
      border border-slate-200/60 dark:border-slate-700/60
      rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/50
      p-6 ${className}`}
    >
      {children}
    </div>
  );
}

const userData = {
  name: "Jarif Mahfuz",
  email: "jarifmahfuz0@email.com",
  country: "Bangladesh",
  currency: "BDT",
  idNo: "USR-458721",
  phone: "+8801904947118",
  nid: "199876543210",
  bank: "1234-5678-91011",
};

export default function UserDashboard() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-sky-100 via-purple-100 to-blue-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100">

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8"
      >
        User Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold">
              {userData.name.charAt(0)}
            </div>

            <h2 className="text-xl font-semibold">{userData.name}</h2>
            <p className="text-slate-500 dark:text-slate-400">
              {userData.email}
            </p>

            <button className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition">
              Edit Profile
            </button>
          </div>
        </Card>

        {/* Details Section */}
        <div className="lg:col-span-2 grid gap-6">

          {/* Personal Info */}
          <Card>
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <Info icon={User} label="Full Name" value={userData.name} />
              <Info icon={Mail} label="Email" value={userData.email} />
              <Info icon={Phone} label="Phone" value={userData.phone} />
              <Info icon={Globe} label="Country" value={userData.country} />
            </div>
          </Card>

          {/* Financial Info */}
          <Card>
            <h3 className="text-lg font-semibold mb-4">Financial Details</h3>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <Info icon={CreditCard} label="Currency" value={userData.currency} />
              <Info icon={User} label="User ID" value={userData.idNo} />
              <Info icon={User} label="NID Number" value={userData.nid} />
              <Info icon={Landmark} label="Bank Account" value={userData.bank} />
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}

function Info({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
      <Icon className="w-5 h-5 text-emerald-500" />
      <div>
        <p className="text-slate-500 dark:text-slate-400 text-xs">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}