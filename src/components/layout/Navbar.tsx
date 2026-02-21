"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { HiMenu, HiX, HiSun, HiMoon } from "react-icons/hi"
import { navLinks } from "@/data/navLinks"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const pathname = usePathname()

  // Persist dark mode in localStorage
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark")
      setDarkMode(true)
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }
    setDarkMode(!darkMode)
  }

  return (
    <nav className="bg-[#1D4E48] dark:bg-[#111827] w-full sticky top-0 mb-1 z-50 shadow-md">
      <div className="flex justify-between w-11/12 mx-auto py-4 items-center transition-colors duration-300">
        {/* Logo */}
        <div className="flex items-center">
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
        </div>

        {/* Desktop Links + Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <ul className="flex items-center gap-6 text-white dark:text-gray-200 font-medium">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className={`hover:text-[#BDDD7E] dark:hover:text-[#FACC15] transition ${
                    pathname === link.href ? "font-bold" : ""
                  }`}
                >
                  {link.name}
                </Link>
                {pathname === link.href && (
                  <span className="absolute left-0 -bottom-2 w-full h-1 bg-[#BDDD7E] dark:bg-[#FACC15] rounded-full"></span>
                )}
              </li>
            ))}
            <li>
              <Link
                href="/login"
                className="bg-[#BDDD7E] dark:bg-[#FACC15] text-[#1D4E48] dark:text-[#111827] px-4 py-2 rounded-md font-semibold hover:opacity-90 transition"
              >
                Login
              </Link>
            </li>
          </ul>

          {/* Desktop Dark/Light Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white dark:bg-gray-700 text-[#1D4E48] dark:text-[#FACC15] hover:opacity-90 transition"
          >
            {darkMode ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Hamburger + Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Dark/Light Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white dark:bg-gray-700 text-[#1D4E48] dark:text-[#FACC15] hover:opacity-90 transition"
          >
            {darkMode ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
          </button>

          <div
            className="text-white dark:text-gray-200 text-3xl cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="flex flex-col justify-center items-center mt-4 gap-4 text-white dark:text-gray-200 font-medium md:hidden transition-colors">
          {navLinks.map((link) => (
            <li key={link.name} className="relative">
              <Link
                href={link.href}
                className={`hover:text-[#BDDD7E] dark:hover:text-[#FACC15] transition ${
                  pathname === link.href ? "font-bold" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
              {pathname === link.href && (
                <span className="absolute left-0 -bottom-2 w-full h-1 bg-[#BDDD7E] dark:bg-[#FACC15] rounded-full"></span>
              )}
            </li>
          ))}
          <li>
            <Link
              href="/login"
              className="bg-[#BDDD7E] dark:bg-[#FACC15] text-[#1D4E48] dark:text-[#111827] px-4 py-2 rounded-md font-semibold hover:opacity-90 transition"
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