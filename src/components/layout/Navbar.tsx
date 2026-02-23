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
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme === "dark") {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    } else if (storedTheme === "light") {
      setDarkMode(false)
      document.documentElement.classList.remove("dark")
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setDarkMode(prefersDark)
      if (prefersDark) document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev
      localStorage.setItem("theme", newMode ? "dark" : "light")
      document.documentElement.classList.toggle("dark", newMode)
      return newMode
    })
  }

  if (!mounted) return null

  return (
    <nav className="bg-white/90 mb-1 dark:bg-[#1D4E48]/90 backdrop-blur-md border-b border-white/20 dark:border-white/10 transition-all duration-300 w-full sticky top-0 z-50 shadow-lg">
      <div className="flex justify-between w-11/12 mx-auto py-4 items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center">
         

                <Image
          src="/logo.png" 
          alt="Lenden Logo"
          width={60}
          height={15}
          priority
          className="hidden dark:block object-contain hover:scale-105 transition-transform"
        />

        <Image
          src="/lightmoodlogo.png" // dark mode logo
          alt="Lenden Logo"
          width={60}
          height={15}
          priority
          className="block dark:hidden object-contain hover:scale-105 transition-transform"
        />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-8 text-[#1D4E48] dark:text-gray-200 font-medium">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className={`transition ${
                    pathname === link.href ? "font-semibold" : ""
                  }`}
                >
                  {link.name}
                </Link>

                {/* animated underline */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-[#1D4E48] dark:bg-[#BDDD7E] transition-all duration-300 ${
                    pathname === link.href
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </li>
            ))}

            {/* Login button */}
            <Link
              href="/login"
              className="bg-[#1D4E48] dark:bg-[#BDDD7E] text-white dark:text-[#111827] px-5 py-2 rounded-lg font-semibold shadow hover:-translate-y-0.5 hover:shadow-lg transition"
            >
              Login
            </Link>
          </ul>

          {/* Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white/80 dark:bg-gray-700 text-[#1D4E48] dark:text-[#BDDD7E] hover:rotate-12 transition"
          >
            {darkMode ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white/80 dark:bg-gray-700 text-[#1D4E48] dark:text-[#BDDD7E]"
          >
            {darkMode ? <HiSun /> : <HiMoon />}
          </button>

          <div
            className="text-[#1D4E48] dark:text-gray-200 text-3xl cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center gap-5 pb-6 text-[#1D4E48] dark:text-gray-200 font-medium animate-fadeIn">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} onClick={() => setIsOpen(false)}>
                {link.name}
              </Link>
            </li>
          ))}

          <Link
            href="/login"
            className="bg-[#1D4E48] dark:bg-[#BDDD7E] text-white dark:text-[#111827] px-5 py-2 rounded-lg font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        </ul>
      )}
    </nav>
  )
}