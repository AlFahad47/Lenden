"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Globe,
  CreditCard,
  Landmark,
  X,
} from "lucide-react";

type UserType = {
  name: string;
  email: string;
  country: string;
  currency: string;
  idNo: string;
  phone: string;
  nid: string;
  bank: string;
  image?: string;
};

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
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

export default function UserDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const [userData, setUserData] = useState<UserType>({
    name: "Jarif Mahfuz",
    email: "jarifmahfuz0@email.com",
    country: "Bangladesh",
    currency: "BDT",
    idNo: "USR-458721",
    phone: "+8801904947118",
    nid: "199876543210",
    bank: "1234-5678-91011",
    image: "/Jarif.jpeg", // ✅ Make sure this file is inside /public
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

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
            {userData.image ? (
              <Image
                src={userData.image}
                alt="Profile"
                width={96}
                height={96}
                className="rounded-full object-cover border-4 border-emerald-500"
                priority
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold">
                {userData.name.charAt(0)}
              </div>
            )}

            <h2 className="text-xl font-semibold">{userData.name}</h2>
            <p className="text-slate-500 dark:text-slate-400">
              {userData.email}
            </p>

            <button
              onClick={() => setIsOpen(true)}
              className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition"
            >
              Edit Profile
            </button>
          </div>
        </Card>

        {/* Details */}
        <div className="lg:col-span-2 grid gap-6">
          <Card>
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <Info icon={User} label="Full Name" value={userData.name} />
              <Info icon={Mail} label="Email" value={userData.email} />
              <Info icon={Phone} label="Phone" value={userData.phone} />
              <Info icon={Globe} label="Country" value={userData.country} />
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-4">Financial Details</h3>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <Info
                icon={CreditCard}
                label="Currency"
                value={userData.currency}
              />
              <Info icon={User} label="User ID" value={userData.idNo} />
              <Info icon={User} label="NID Number" value={userData.nid} />
              <Info
                icon={Landmark}
                label="Bank Account"
                value={userData.bank}
              />
            </div>
          </Card>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed z-50 inset-0 flex items-center justify-center p-4"
            >
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Edit Profile</h2>
                  <button onClick={() => setIsOpen(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                  />
                  <Input
                    label="Email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                  />
                  <Input
                    label="Phone"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                  />
                  <Input
                    label="Country"
                    name="country"
                    value={userData.country}
                    onChange={handleChange}
                  />
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-6 w-full bg-emerald-500 text-white py-2 rounded-xl hover:bg-emerald-600 transition"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
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

function Input({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div>
      <label className="text-sm text-slate-500 dark:text-slate-400">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>
  );
}
