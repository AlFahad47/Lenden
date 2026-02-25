"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  FaPaperPlane,
  FaMoneyBillWave,
  FaMobileAlt,
  FaReceipt,
  FaHandHoldingUsd,
  FaWallet,
  FaShieldAlt,
  FaHeadset,
  FaLock,
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

// Items accessible without login
const publicRoutes = ["/mobile-recharge", "/pay-bill", "/add-money", "/send-money"]

function Section({ title, items }: { title: string; items: MenuItem[] }) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true")
  }, [])

  const handleClick = (item: MenuItem) => {
    const isPublic = publicRoutes.includes(item.route)
    if (isLoggedIn || isPublic) {
      router.push(item.route)
    } else {
      router.push("/login")
    }
  }

  return (
    <div className="w-full bg-gradient-to-br from-[#f0f7ff] via-white to-[#e8f4ff] dark:from-[#040c1a] dark:via-[#04090f] dark:to-[#040c1a] transition-colors duration-500 py-12">
      <div className="w-11/12 mx-auto">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold
           bg-gradient-to-r from-[#0061ff] via-[#0095ff] to-[#00d4ff]
           dark:from-white dark:via-[#93C5FD] dark:to-[#0061ff]
           bg-clip-text text-transparent text-center pb-5"
        >
          {title}
        </motion.h2>

        {/* Guest notice */}
        {!isLoggedIn && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-sm text-gray-400 dark:text-gray-500 mb-6 -mt-2"
          >
            <span className="inline-flex items-center gap-1">
              <FaLock className="text-xs" />
              Login to unlock all features
            </span>
          </motion.p>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {items.map((item, index) => {
            const Icon = item.icon
            const isPublic = publicRoutes.includes(item.route)
            const locked = !isLoggedIn && !isPublic

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 120 }}
                whileHover={{ scale: locked ? 1.05 : 1.1, y: locked ? 0 : -5 }}
                onClick={() => handleClick(item)}
                className="flex flex-col items-center gap-2 cursor-pointer relative"
              >
                <div className="relative w-16 h-16 rounded-3xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300">
                  <Icon className={`text-2xl ${locked ? "text-[#0061ff]/40 dark:text-[#00b4ff]/40" : "text-[#0061ff] dark:text-[#00b4ff]"}`} />
                  {locked && (
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#0061ff] dark:bg-[#0095ff] flex items-center justify-center shadow-md">
                      <FaLock className="text-white text-[8px]" />
                    </div>
                  )}
                </div>
                <p className={`text-xs md:text-sm font-semibold text-center ${locked ? "text-gray-400 dark:text-gray-500" : "text-[#0061ff] dark:text-gray-200"}`}>
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
