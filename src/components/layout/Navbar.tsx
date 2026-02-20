"use client"

import React, { useState } from "react"
import Link from "next/link"

import { HiMenu, HiX } from "react-icons/hi"
import { navLinks } from "@/data/navLinks"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-[#1D4E48] px-6 py-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-[#BDDD7E] font-bold text-2xl">Lenden</div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-6 text-white font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="hover:text-[#BDDD7E] transition">
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/login"
              className="bg-[#BDDD7E] text-[#1D4E48] px-4 py-2 rounded-md font-semibold hover:opacity-90"
            >
              Login
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <div
          className="md:hidden text-white text-3xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="flex flex-col mt-4 gap-4 text-white font-medium md:hidden">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="hover:text-[#BDDD7E] transition"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/login"
              className="bg-[#BDDD7E] text-[#1D4E48] px-4 py-2 rounded-md font-semibold hover:opacity-90"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </li>
        </ul>
      )}
    </nav>
  )
}