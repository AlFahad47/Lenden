"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Menu, X, Sparkles, Sun, Moon } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else if (stored === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
      if (prefersDark) document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  };

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Home", path: "/" },
    { name: "Chat", path: "/chat" },
    { name: "Review", path: "/review" },
    { name: "Blog", path: "/blog" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
    { name: "AdminDash", path: "/dashboard/admin" },
    { name: "UserDash", path: "/dashboard/users" },
  ];

  if (!mounted) return null;

  return (
    <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4 pointer-events-none">

      <nav
        className={`pointer-events-auto relative flex items-center justify-between p-2 rounded-[2rem] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isScrolled
            ? 'w-full max-w-4xl bg-white/90 dark:bg-white/[0.03] backdrop-blur-[24px] border border-gray-200 dark:border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]'
            : 'w-full max-w-5xl bg-white/70 dark:bg-[#0f172a]/20 backdrop-blur-xl border border-gray-200/80 dark:border-white/5 shadow-lg dark:shadow-2xl'
        }`}
      >
        {/* Inner Glass Shine */}
        <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] pointer-events-none"></div>

        {/* Brand / Logo */}
        <div className="pl-4 md:pl-6 flex-shrink-0 z-20 flex items-center gap-2">
          <Sparkles className="text-[#3b82f6] w-5 h-5" />
          <Link href="/" className="text-gray-900 dark:text-white font-bold text-lg md:text-xl tracking-wide drop-shadow-md">
            NovaPay
          </Link>
        </div>

        {/* Desktop Links (Center) */}
        <div className="hidden md:flex flex-1 items-center justify-center px-2 overflow-hidden">
          <div className="flex items-center gap-0.5 bg-gray-100/80 dark:bg-white/[0.02] p-1 rounded-full border border-gray-200 dark:border-white/[0.05] overflow-x-auto scrollbar-none">
          {navLinks.map((link) => {
            const isActive = pathname === link.path || (link.name === 'Home' && pathname === '/');
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`relative px-2.5 py-1.5 text-xs font-medium transition-all duration-300 rounded-full whitespace-nowrap ${
                  isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/60 dark:hover:bg-white/[0.05]'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#3b82f6] rounded-full shadow-[0_0_10px_3px_rgba(59,130,246,0.8)]"></span>
                )}
              </Link>
            );
          })}
          </div>
        </div>

        {/* Right side: Theme toggle + CTA */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0 pr-1 z-20">

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-white/[0.05] border border-gray-300 dark:border-white/[0.08] text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/[0.1] transition-all duration-300"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* CTA Button */}
          <Link
            href="/register"
            className="group relative flex items-center gap-2 px-6 py-2.5 rounded-full overflow-hidden border border-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] transition-all duration-500 group-hover:scale-110 group-hover:from-[#2563eb] group-hover:to-[#1d4ed8]"></div>
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent opacity-50 rounded-t-full"></div>
            <span className="relative text-white text-sm font-semibold tracking-wide drop-shadow-sm">Get the App</span>
            <ArrowUpRight
              size={16}
              strokeWidth={2.5}
              className="relative text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Mobile right: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2 pr-4 z-20">
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-white/[0.05] border border-gray-300 dark:border-white/[0.08] text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white transition-all"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            className="text-gray-900 dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-[120%] left-0 w-full bg-[#0a101f]/80 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] p-5 flex flex-col gap-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:hidden">
            {navLinks.map((link) => {
              const isActive = pathname === link.path || (link.name === 'Home' && pathname === '/');
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive ? 'bg-[#3b82f6]/20 text-white border border-[#3b82f6]/30' : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 flex justify-center items-center gap-2 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white px-5 py-3.5 rounded-xl text-sm font-bold shadow-[0_0_20px_-5px_rgba(59,130,246,0.6)]"
            >
              Get the App
              <ArrowUpRight size={18} />
            </Link>
          </div>
        )}

      </nav>
    </div>
  );
};

export default Navbar;
