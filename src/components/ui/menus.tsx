"use client"

import React, { useRef } from "react"
import { motion } from "framer-motion"
import {
  FaPaperPlane,
  FaMoneyBillWave,
  FaMobileAlt,
  FaReceipt,
  FaHandHoldingUsd,
  FaWallet,
  FaChevronLeft,
  FaChevronRight,
  FaShieldAlt,
  FaHeadset,
  FaLock,
} from "react-icons/fa"
import { IconType } from "react-icons"
import { useRouter } from "next/navigation"
import { Wallet } from "lucide-react"
import { useSession } from "next-auth/react"

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

export default function QuickActionsSlider() {
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      })
    }
  }

  const handleClick = (route: string, locked: boolean) => {
    if (locked) {
      router.push("/login")
    } else {
      router.push(route)
    }
  }

  return (
    <div className="relative w-full py-10 
      bg-gradient-to-br from-[#f0f7ff] via-white to-[#e8f4ff]
      dark:from-[#040c1a] dark:via-[#04090f] dark:to-[#040c1a]"
    >

      {/* Heading */}
      <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#0061ff] via-[#0095ff] to-[#00d4ff] dark:from-white dark:via-[#93C5FD] dark:to-[#0061ff] bg-clip-text text-transparent text-center">
            What We Offer
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 text-base md:text-lg max-w-xl mx-auto text-center mb-4">
           Login to unlock all features
          </p>
      
      

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10
        bg-white dark:bg-[#0a1625] mt-8
        shadow-lg rounded-full p-3 hover:scale-110 transition"
      >
        <FaChevronLeft className="text-[#0061ff] text-4xl" />
      </button>

      {/* Scroll */}
      <div ref={scrollRef} className="flex gap-8 overflow-hidden px-14">

        {quickActions.map((item, index) => {
          const Icon = item.icon
          const locked = !session?.user

          return (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.08,
                y: -4,
              }}
              transition={{ type: "spring", stiffness: 250 }}
              onClick={() => handleClick(item.route, locked)}
              className="flex flex-col items-center min-w-[100px] cursor-pointer group  pt-3"
            >
              <div className="relative w-20 h-20 rounded-3xl bg-blue-200 dark:bg-blue-400 
                flex items-center justify-center shadow-xl
                group-hover:shadow-[0_0_20px_rgba(0,97,255,0.35)]
                transition"
              >

                <Icon className="text-2xl text-[#0061ff] dark:text-[#ffffff]" />

                {locked && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#0061ff] flex items-center justify-center shadow-md">
                    <FaLock className="text-white text-[9px]" />
                  </div>
                )}
              </div>

              <p className="mt-2 text-sm font-semibold text-center
                text-[#0061ff] dark:text-gray-200
                group-hover:scale-105 transition">
                {item.name}
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10
        bg-white dark:bg-[#0a1625] mt-8
        shadow-lg rounded-full p-3 hover:scale-110 transition"
      >
        <FaChevronRight className="text-[#0061ff]  text-3xl" />
      </button>
    </div>
  )
}