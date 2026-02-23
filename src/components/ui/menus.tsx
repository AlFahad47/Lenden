"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  FaPaperPlane,
  FaMoneyBillWave,
  FaMobileAlt,
  FaReceipt,
  FaHandHoldingUsd,
  FaWallet,
  FaUniversity,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa"
import { IconType } from "react-icons"
import { useRouter } from "next/navigation"
import { Wallet } from "lucide-react"

type MenuItem = {
  name: string
  icon: IconType
  route: string
}

const quickActions: MenuItem[] = [
  { name: "Send Money", icon: FaPaperPlane, route: "/send-money" },
  { name: "Request Money", icon: FaHandHoldingUsd, route: "/request-money" },
  { name: "Cash Out", icon: FaMoneyBillWave, route: "/cash-out" },
  { name: "Add Money", icon: FaWallet, route: "/add-money" },
  { name: "Mobile Recharge", icon: FaMobileAlt, route: "/mobile-recharge" },
  { name: "Pay Bill", icon: FaReceipt, route: "/pay-bill" },
  { name: "Transaction History", icon: FaReceipt, route: "/transactions" },
  { name: "Wallet", icon: Wallet, route: "/wallet" },
  { name: "Cards & Banks", icon: FaWallet, route: "/cards-banks" },
  { name: "Subscriptions", icon: FaReceipt, route: "/subscriptions" },
  { name: "Security Settings", icon: FaShieldAlt, route: "/security" },
  { name: "Disputes / Support", icon: FaHeadset, route: "/support" },
]

function Section({ title, items }: { title: string; items: MenuItem[] }) {
  const router = useRouter()

  return (
    <div
      className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-100
      dark:from-[#234A45] dark:via-[#0b1f1d] dark:to-[#234A45] transition-colors duration-500 py-12"
    >
      <div className="w-11/12 mx-auto">
        {/* Fancy Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold 
           bg-gradient-to-r from-[#1D4E48] via-[#0fa133] to-[#35e0cc]
           dark:from-white dark:via-[#BDDD7E] dark:to-[#1D4E48]
           bg-clip-text text-transparent text-center pb-5"
        >
          {title}
        </motion.h2>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 120 }}
                whileHover={{ scale: 1.1, y: -5 }}
                onClick={() => router.push(item.route)}
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <div
                  className="w-16 h-16 rounded-3xl bg-[#BDDD7E]/70 dark:bg-[#BDDD7E]/20 
                  flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <Icon className="text-[#1D4E48] dark:text-[#BDDD7E] text-2xl" />
                </div>
                <p className="text-xs md:text-sm font-semibold text-center text-[#1D4E48] dark:text-gray-200">
                  {item.name}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function Menus(): JSX.Element {
  return (
    <section className="w-full">
      <Section title="Quick Actions" items={quickActions} />
    </section>
  )
}