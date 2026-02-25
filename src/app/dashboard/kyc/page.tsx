

"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function KYCPage() {
  const [role, setRole] = useState<"User" | "Agent">("User");

  return (
    <div
      className="min-h-screen bg-gradient-to-br 
    from-sky-100 via-purple-100 to-white 
    dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 
    transition-colors duration-500 px-6 py-16"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4 
          bg-gradient-to-r from-sky-500 to-purple-600 
          bg-clip-text text-transparent"
        >
          {role} KYC Verification
        </motion.h1>

        <p className="text-center text-gray-700 dark:text-gray-400 mb-12">
          Secure identity verification for platform compliance
        </p>

        {/* Role Selector */}
        <div className="flex justify-center mb-12">
          <div
            className="bg-white/60 dark:bg-slate-800/60 
          backdrop-blur-xl p-2 rounded-xl flex gap-2 shadow-lg"
          >
            {["User", "Agent"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r as "User" | "Agent")}
                className={`px-8 py-2 rounded-lg font-medium transition-all duration-300 ${
                  role === r
                    ? "bg-gradient-to-r from-sky-500 to-purple-600 text-white shadow-md"
                    : "text-gray-800 dark:text-gray-300 hover:bg-sky-100 dark:hover:bg-slate-700"
                }`}
              >
                {r}
                {r === "Agent" && (
                  <span className="ml-2 text-xs bg-black/20 px-2 py-1 rounded-full">
                    PRO
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.form
          key={role}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-10 
          bg-white/70 dark:bg-slate-900/70 
          backdrop-blur-2xl p-8 rounded-3xl 
          border border-white/40 dark:border-slate-800 
          shadow-2xl"
        >
          <Section title="👤 Personal Information">
            <Input label="Full Name" />
            <Input label="Date of Birth" type="date" />
            <Select label="Gender" options={["Male", "Female", "Other"]} />
            <Input label="Nationality" />
          </Section>

          {/* ✅ Responsive Identity Section */}
          <Section title="🆔 Identity Verification">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2">
              <Input label="NID / Passport Number" />
              <div className="md:col-span-2">
                <FileInput label="Upload ID Document" />
              </div>
            </div>
          </Section>

          <Section title="📞 Contact Information">
            <Input label="Mobile Number" />
            <Input label="Email Address" type="email" />
            <Textarea label="Current Address" />
            <Textarea label="Permanent Address" />
          </Section>

          {role === "Agent" && (
            <>
              <Section title="💼 Professional Agent Details">
                <Input label="Agent ID" />
                <Input label="License Number" />
                <Select
                  label="Commission Type"
                  options={["Fixed", "Percentage", "Hybrid"]}
                />
                <Input label="Years of Experience" />
              </Section>

              <Section title="🏢 Business Information">
                <Textarea label="Business Address" />
                <Input label="Business Registration Number" />
              </Section>

              <Section title="🏦 Payment Information">
                <Input label="Bank Name" />
                <Input label="Bank Account Number" />
              </Section>
            </>
          )}

          <div className="flex items-center gap-3 mt-6">
            <input type="checkbox" className="w-5 h-5 accent-purple-600" />
            <span className="text-gray-800 dark:text-gray-300">
              I confirm that all provided information is accurate and
              verifiable.
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="w-full mt-8 py-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-sky-500 to-purple-600
            hover:opacity-90 transition-all duration-300 shadow-lg"
          >
            Submit {role} KYC
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}

/* Reusable Components */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2
        className="text-xl font-semibold mb-6 
      bg-gradient-to-r from-sky-500 to-purple-600 
      bg-clip-text text-transparent"
      >
        {title}
      </h2>
      <div className="grid md:grid-cols-2 gap-6">{children}</div>
    </div>
  );
}

function Input({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-800 dark:text-gray-400">
        {label}
      </label>
      <input
        type={type}
        className="bg-white dark:bg-slate-800 
        text-gray-800 dark:text-gray-200
        border border-gray-300 dark:border-slate-700 
        rounded-lg px-4 py-2 
        focus:outline-none focus:ring-2 
        focus:ring-purple-500 transition"
      />
    </div>
  );
}

function Textarea({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-2 md:col-span-2">
      <label className="text-sm text-gray-800 dark:text-gray-400">
        {label}
      </label>
      <textarea
        rows={3}
        className="bg-white dark:bg-slate-800 
        text-gray-800 dark:text-gray-200
        border border-gray-300 dark:border-slate-700 
        rounded-lg px-4 py-2 
        focus:outline-none focus:ring-2 
        focus:ring-purple-500 transition"
      />
    </div>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-800 dark:text-gray-400">
        {label}
      </label>
      <select
        className="bg-white dark:bg-slate-800 
        text-gray-800 dark:text-gray-200
        border border-gray-300 dark:border-slate-700 
        rounded-lg px-4 py-2 
        focus:outline-none focus:ring-2 
        focus:ring-purple-500 transition"
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function FileInput({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-800 dark:text-gray-400">
        {label}
      </label>

      <input
        type="file"
        className="bg-white dark:bg-slate-800 
  text-gray-800 dark:text-gray-200
  border border-gray-300 dark:border-slate-700 
  rounded-lg px-4 py-2 
  file:mr-3 
  file:text-xs md:file:text-sm
  file:px-3 md:file:px-4 
  file:py-1.5 md:file:py-2
  file:rounded-lg file:border-0 
  file:bg-gradient-to-r file:from-sky-500 file:to-purple-600 
  file:text-white hover:file:opacity-90 transition"
      />
    </div>
  );
}
