"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
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
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className={`relative 
      bg-white 
      dark:bg-[#0c1a2b] 
      border border-gray-200 
      dark:border-blue-700/50
      rounded-2xl 
      shadow-md 
      dark:shadow-blue-900/40
      p-6 transition ${className}`}
    >
      {children}
    </motion.div>
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
    image: "/user.jfif",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsOpen(false);

    await Swal.fire({
      title: "Profile Updated!",
      text: "Your information has been saved successfully.",
      icon: "success",
      confirmButtonColor: "#0095ff",
      confirmButtonText: "Awesome!",
      background: "#0c1a2b",
      color: "#fff",
    });
  };

  return (
    <motion.div
      className="min-h-screen p-8 
      bg-gray-50 
      dark:bg-[#04090f] 
      text-gray-800 
      dark:text-blue-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold mb-8"
      >
        User Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center text-center gap-4">
            {userData.image ? (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Image
                  src={userData.image}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="rounded-full object-cover border-4 
                  border-blue-500 dark:border-[#0095ff]"
                  priority
                />
              </motion.div>
            ) : (
              <div
                className="w-24 h-24 rounded-full 
              bg-gradient-to-r from-[#0095ff] to-[#0061ff]
              flex items-center justify-center text-white text-3xl font-bold"
              >
                {userData.name.charAt(0)}
              </div>
            )}

            <h2 className="text-xl font-semibold">{userData.name}</h2>

            <p className="text-gray-500 dark:text-blue-300">{userData.email}</p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="mt-4 px-4 py-2 
              bg-[#0095ff] 
              hover:bg-[#0070ff] 
              text-white rounded-xl transition"
            >
              Edit Profile
            </motion.button>
          </div>
        </Card>

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
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="fixed z-50 inset-0 flex items-center justify-center p-4"
            >
              <div
                className="bg-white dark:bg-[#0c1a2b] 
              border border-gray-200 dark:border-blue-700/50
              rounded-2xl p-6 w-full max-w-md shadow-xl"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Edit Profile</h2>
                  <button onClick={() => setIsOpen(false)}>
                    <X className="w-5 h-5 text-gray-500 dark:text-blue-300" />
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

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSave}
                  className="mt-6 w-full 
                  bg-[#0095ff] 
                  hover:bg-[#0070ff] 
                  text-white py-2 rounded-xl transition"
                >
                  Save Changes
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
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
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3 p-4 rounded-xl 
      bg-gray-100 
      dark:bg-blue-900/20 
      border border-gray-200 
      dark:border-blue-700/40 transition"
    >
      <Icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
      <div>
        <p className="text-gray-500 dark:text-blue-300 text-xs">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </motion.div>
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
      <label className="text-sm text-gray-500 dark:text-blue-300">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-1 px-3 py-2 rounded-lg 
        bg-gray-100 
        dark:bg-blue-900/20 
        border border-gray-300 
        dark:border-blue-700/40
        focus:outline-none 
        focus:ring-2 
        focus:ring-[#0095ff] 
        transition"
      />
    </div>
  );
}
