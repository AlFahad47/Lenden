

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

export default function KYCPage() {
  const [role, setRole] = useState<"User" | "Agent">("User");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    Swal.fire({
      title: "KYC Submitted!",
      text: `${role} verification submitted successfully.`,
      icon: "success",
      confirmButtonColor: "#0061ff",
    });
  };

  return (
    <div
      className="min-h-screen 
      bg-gray-50 
      dark:bg-[#04090f] 
      transition-colors duration-500 px-6 py-16"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4 
          bg-gradient-to-r from-[#0095ff] to-[#0061ff] 
          bg-clip-text text-transparent"
        >
          {role} KYC Verification
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-600 dark:text-blue-300 mb-12"
        >
          Secure identity verification for platform compliance
        </motion.p>

        <div className="flex justify-center mb-12">
          <div
            className="bg-white 
            dark:bg-[#0c1a2b] 
            border border-gray-200 
            dark:border-blue-700/50
            p-2 rounded-xl flex gap-2 shadow-md"
          >
            {["User", "Agent"].map((r) => (
              <motion.button
                key={r}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setRole(r as "User" | "Agent")}
                className={`px-8 py-2 rounded-lg font-medium transition-all duration-300 ${
                  role === r
                    ? "bg-gradient-to-r from-[#0095ff] to-[#0061ff] text-white shadow-md"
                    : "text-gray-700 dark:text-blue-300 hover:bg-gray-100 dark:hover:bg-blue-900/30"
                }`}
              >
                {r}
                {r === "Agent" && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="ml-2 text-xs bg-black/20 px-2 py-1 rounded-full"
                  >
                    PRO
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.form
            onSubmit={handleSubmit}
            key={role}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-10 
            bg-white 
            dark:bg-[#0c1a2b] 
            p-8 rounded-3xl 
            border border-gray-200 
            dark:border-blue-700/40
            shadow-xl"
          >
            <Section title="👤 Personal Information">
              <Input label="Full Name" />
              <Input label="Date of Birth" type="date" />
              <Select label="Gender" options={["Male", "Female", "Other"]} />
              <Input label="Nationality" />
            </Section>

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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 mt-6"
            >
              <motion.input
                whileTap={{ scale: 0.85 }}
                type="checkbox"
                className="w-5 h-5 accent-[#0095ff]"
              />
              <span className="text-gray-700 dark:text-blue-300">
                I confirm that all provided information is accurate and
                verifiable.
              </span>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="w-full mt-8 py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-[#0095ff] to-[#0061ff]
              hover:opacity-90 transition-all duration-300 shadow-lg"
            >
              Submit {role} KYC
            </motion.button>
          </motion.form>
        </AnimatePresence>
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <h2
        className="text-xl font-semibold mb-6 
        bg-gradient-to-r from-[#0095ff] to-[#0061ff] 
        bg-clip-text text-transparent"
      >
        {title}
      </h2>
      <div className="grid md:grid-cols-2 gap-6">{children}</div>
    </motion.div>
  );
}

function Input({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-2"
    >
      <label className="text-sm text-gray-700 dark:text-blue-300">
        {label}
      </label>
      <input
        type={type}
        className="bg-gray-100 
        dark:bg-blue-900/20
        text-gray-800 dark:text-blue-100
        border border-gray-300 
        dark:border-blue-700/40
        rounded-lg px-4 py-2 
        focus:outline-none focus:ring-2 
        focus:ring-[#0095ff] transition"
      />
    </motion.div>
  );
}

function Textarea({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-2 md:col-span-2"
    >
      <label className="text-sm text-gray-700 dark:text-blue-300">
        {label}
      </label>
      <textarea
        rows={3}
        className="bg-gray-100 
        dark:bg-blue-900/20
        text-gray-800 dark:text-blue-100
        border border-gray-300 
        dark:border-blue-700/40
        rounded-lg px-4 py-2 
        focus:outline-none focus:ring-2 
        focus:ring-[#0095ff] transition"
      />
    </motion.div>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-2"
    >
      <label className="text-sm text-gray-700 dark:text-blue-300">
        {label}
      </label>
      <select
        className="bg-gray-100 
        dark:bg-blue-900/20
        text-gray-800 dark:text-blue-100
        border border-gray-300 
        dark:border-blue-700/40
        rounded-lg px-4 py-2 
        focus:outline-none focus:ring-2 
        focus:ring-[#0095ff] transition"
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </motion.div>
  );
}

function FileInput({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-2"
    >
      <label className="text-sm text-gray-700 dark:text-blue-300">
        {label}
      </label>

      <input
        type="file"
        className="bg-gray-100 
        dark:bg-blue-900/20
        text-gray-800 dark:text-blue-100
        border border-gray-300 
        dark:border-blue-700/40
        rounded-lg px-4 py-2 
        file:mr-3 
        file:px-4 file:py-2
        file:rounded-lg file:border-0 
        file:bg-gradient-to-r file:from-[#0095ff] file:to-[#0061ff] 
        file:text-white hover:file:opacity-90 transition"
      />
    </motion.div>
  );
}