"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { navLinks } from "@/data/navLinks"

export default function Footer() {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  const accountLinks = [
    { name: "Login", href: "/login" },
    { name: "Sign Up", href: "/signup" },
  ]

  const socialLinks = [
    { name: "Facebook", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "Twitter", href: "#" },
  ]

  return (
    <footer className="bg-white dark:bg-[#1D4E48] text-[#1D4E48] dark:text-gray-100 border-t-2 border-[#2e7a47] transition-colors duration-300 py-12 mt-1">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">

        {/* Branding */}
        <div className="flex flex-col items-start">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Lenden Logo"
              width={60}
              height={15}
              priority
              className="object-contain"
            />
          </Link>
          <p className="text-sm mt-4 md:text-base max-w-xs">
            Your trusted digital wallet. Fast, secure, and simple to manage your payments and transfers.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row gap-10">
          <div>
            <h2 className="font-semibold mb-3">Company</h2>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`transition-colors ${
                      isActive(link.href)
                        ? "text-[#1D4E48] font-bold"
                        : "hover:text-[#BDDD7E]"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-3">Account</h2>
            <ul className="space-y-2">
              {accountLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`transition-colors ${
                      isActive(link.href)
                        ? "text-[#BDDD7E] font-bold"
                        : "hover:text-[#BDDD7E]"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social */}
        <div className="flex flex-col items-start md:items-end">
          <h2 className="font-semibold mb-3">Follow Us</h2>
          <div className="flex gap-4 mb-4">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-[#BDDD7E] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <p className="text-sm md:text-base">📍 123 Digital Street, Dhaka, Bangladesh</p>
          <p className="text-sm md:text-base">📞 +880 123 456 789</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-300 dark:border-gray-500 text-center text-sm pt-4 text-gray-500 dark:text-gray-300">
        © {new Date().getFullYear()} Lenden. All rights reserved.
      </div>
    </footer>
  )
}