"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react"; // সেশন থেকে ডাটা নিতে

export default function KYCPage() {
  const { data: session } = useSession(); // সেশন কল করা হলো
  const [role, setRole] = useState<"User" | "Agent">("User");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const finalData = { ...data, role };

    try {
      const response = await fetch("/api/kyc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        Swal.fire({
          title: "KYC Submitted!",
          text: `${role} verification data updated in database.`,
          icon: "success",
          confirmButtonColor: "#0061ff",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        const err = await response.json();
        Swal.fire("Error", err.message || "Submission failed", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Connection error", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#04090f] transition-colors duration-500 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-[#0095ff] to-[#0061ff] bg-clip-text text-transparent">
          {role} KYC Verification
        </motion.h1>

        {/* Role Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-white dark:bg-[#0c1a2b] border border-gray-200 dark:border-blue-700/50 p-2 rounded-xl flex gap-2 shadow-md">
            {["User", "Agent"].map((r) => (
              <motion.button key={r} type="button" onClick={() => setRole(r as "User" | "Agent")} className={`px-8 py-2 rounded-lg font-medium transition-all ${role === r ? "bg-gradient-to-r from-[#0095ff] to-[#0061ff] text-white" : "text-gray-700 dark:text-blue-300"}`}>
                {r}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.form onSubmit={handleSubmit} key={role} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-10 bg-white dark:bg-[#0c1a2b] p-8 rounded-3xl border border-gray-200 dark:border-blue-700/40 shadow-xl">
            
            <Section title="👤 Personal Information">
              {/* ডাটাবেস অনুযায়ী ইউজারের নাম ডিফল্ট রাখা হয়েছে */}
              <Input label="Full Name" name="fullName" defaultValue={session?.user?.name || ""} required />
              <Input label="Date of Birth" name="dob" type="date" required />
              <Select label="Gender" name="gender" options={["Male", "Female", "Other"]} />
              <Input label="Nationality" name="nationality" />
            </Section>

            <Section title="🆔 Identity Verification">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2">
                <Input label="NID / Passport Number" name="idNumber" required />
                <div className="md:col-span-2">
                  <FileInput label="Upload ID Document" name="idImage" />
                </div>
              </div>
            </Section>

            <Section title="📞 Contact Information">
              <Input label="Mobile Number" name="phone" required />
              {/* সেশন থেকে ইমেইল নিয়ে আসা হয়েছে এবং readonly করা হয়েছে যাতে ইউজার পরিবর্তন করতে না পারে */}
              <Input 
                label="Email Address" 
                name="email" 
                type="email" 
                defaultValue={session?.user?.email || ""} 
                readOnly={!!session?.user?.email} 
                required 
              />
              <Textarea label="Current Address" name="currentAddress" />
              <Textarea label="Permanent Address" name="permanentAddress" />
            </Section>

            {role === "Agent" && (
              <Section title="💼 Professional Agent Details">
                <Input label="Agent ID" name="agentId" />
                <Input label="License Number" name="license" />
                <Select label="Commission Type" name="commission" options={["Fixed", "Percentage", "Hybrid"]} />
              </Section>
            )}

            <motion.button disabled={isSubmitting} type="submit" className="w-full mt-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#0095ff] to-[#0061ff] shadow-lg disabled:opacity-50">
              {isSubmitting ? "Processing..." : `Submit ${role} KYC`}
            </motion.button>
          </motion.form>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* Reusable Components (Design same as yours) */

function Section({ title, children }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-[#0095ff] to-[#0061ff] bg-clip-text text-transparent">{title}</h2>
      <div className="grid md:grid-cols-2 gap-6">{children}</div>
    </motion.div>
  );
}

function Input({ label, name, type = "text", required = false, defaultValue = "", readOnly = false }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-700 dark:text-blue-300">{label}</label>
      <input 
        name={name} 
        type={type} 
        required={required} 
        defaultValue={defaultValue}
        readOnly={readOnly}
        className={`bg-gray-100 dark:bg-blue-900/20 text-gray-800 dark:text-blue-100 border border-gray-300 dark:border-blue-700/40 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0095ff] outline-none ${readOnly ? "opacity-70 cursor-not-allowed" : ""}`} 
      />
    </div>
  );
}

function Textarea({ label, name }: any) {
  return (
    <div className="flex flex-col gap-2 md:col-span-2">
      <label className="text-sm text-gray-700 dark:text-blue-300">{label}</label>
      <textarea name={name} rows={3} className="bg-gray-100 dark:bg-blue-900/20 text-gray-800 dark:text-blue-100 border border-gray-300 dark:border-blue-700/40 rounded-lg px-4 py-2 outline-none" />
    </div>
  );
}

function Select({ label, name, options }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-700 dark:text-blue-300">{label}</label>
      <select name={name} className="bg-gray-100 dark:bg-blue-900/20 text-gray-800 dark:text-blue-100 border border-gray-300 dark:border-blue-700/40 rounded-lg px-4 py-2 outline-none">
        {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function FileInput({ label, name }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-700 dark:text-blue-300">{label}</label>
      <input type="file" name={name} className="bg-gray-100 dark:bg-blue-900/20 text-gray-800 dark:text-blue-100 border border-gray-300 dark:border-blue-700/40 rounded-lg px-4 py-2 file:bg-blue-600 file:text-white file:border-0 file:rounded-md" />
    </div>
  );
}