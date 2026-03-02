"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import Swal from "sweetalert2";

const initialRequests = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    country: "USA",
    status: "Pending",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@example.com",
    country: "UK",
    status: "Pending",
  },
  {
    id: 3,
    name: "Ali Khan",
    email: "ali@example.com",
    country: "UAE",
    status: "Pending",
  },
];

/* ---------- Gradient Card Wrapper ---------- */
function GradientCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`
        relative overflow-hidden rounded-2xl
        bg-white/70 dark:bg-[#0c1a2b]/80
        backdrop-blur-xl
        border border-blue-200 dark:border-blue-900
        shadow-xl
        ${className}
      `}
    >
      <motion.div
        className="absolute inset-0 opacity-0 
        bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export default function UserRequestsPage() {
  const [requests, setRequests] = useState(initialRequests);

  const handleAction = async (
    id: number,
    action: "Accepted" | "Rejected" | "Fraud",
  ) => {
    const result = await Swal.fire({
      title: `Confirm ${action}?`,
      text: "This action can be reviewed later.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor:
        action === "Accepted"
          ? "#22c55e"
          : action === "Rejected"
            ? "#ef4444"
            : "#f97316",
      confirmButtonText: `Yes, ${action}`,
    });

    if (result.isConfirmed) {
      setRequests((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, status: action } : user,
        ),
      );

      Swal.fire({
        title: `${action}!`,
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400";
      case "Rejected":
        return "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400";
      case "Fraud":
        return "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400";
      default:
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          KYC User Requests
        </h1>
        <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">
          Review and manage user verification requests
        </p>
      </motion.div>

      {/* Requests */}
      <div className="grid gap-6">
        {requests.map((user, i) => (
          <GradientCard key={user.id} className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              {/* User Info */}
              <div>
                <h3 className="text-lg font-semibold text-blue-900 dark:text-white">
                  {user.name}
                </h3>
                <p className="text-sm text-blue-500 dark:text-blue-400">
                  {user.email}
                </p>
                <p className="text-sm text-gray-500 dark:text-blue-300/70 mt-1">
                  Country: {user.country}
                </p>

                <span
                  className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                    user.status,
                  )}`}
                >
                  {user.status}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => handleAction(user.id, "Accepted")}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl
                  bg-green-500 hover:bg-green-600
                  text-white text-sm transition"
                >
                  <CheckCircle size={16} />
                  Accept
                </button>

                <button
                  onClick={() => handleAction(user.id, "Rejected")}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl
                  bg-red-500 hover:bg-red-600
                  text-white text-sm transition"
                >
                  <XCircle size={16} />
                  Reject
                </button>

                <button
                  onClick={() => handleAction(user.id, "Fraud")}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl
                  bg-orange-500 hover:bg-orange-600
                  text-white text-sm transition"
                >
                  <AlertTriangle size={16} />
                  Fraud
                </button>
              </div>
            </motion.div>
          </GradientCard>
        ))}
      </div>
    </div>
  );
}
