// "use client"

// import React, { useState, useEffect } from "react"
// import Link from "next/link"
// import Image from "next/image"
// import { usePathname } from "next/navigation"
// import { HiMenu, HiX, HiSun, HiMoon } from "react-icons/hi"
// import { navLinks } from "@/data/navLinks"

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [darkMode, setDarkMode] = useState(false)
//   const [mounted, setMounted] = useState(false)
//   const pathname = usePathname()

//   useEffect(() => {
//     setMounted(true)
//     const storedTheme = localStorage.getItem("theme")
//     if (storedTheme === "dark") {
//       setDarkMode(true)
//       document.documentElement.classList.add("dark")
//     } else if (storedTheme === "light") {
//       setDarkMode(false)
//       document.documentElement.classList.remove("dark")
//     } else {
//       const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
//       setDarkMode(prefersDark)
//       if (prefersDark) document.documentElement.classList.add("dark")
//     }
//   }, [])

//   const toggleDarkMode = () => {
//     setDarkMode((prev) => {
//       const newMode = !prev
//       localStorage.setItem("theme", newMode ? "dark" : "light")
//       document.documentElement.classList.toggle("dark", newMode)
//       return newMode
//     })
//   }

//   if (!mounted) return null

//   return (
//     <nav className="bg-white/90 mb-1 dark:bg-[#1D4E48]/90 backdrop-blur-md border-b border-white/20 dark:border-white/10 transition-all duration-300 w-full sticky top-0 z-50 shadow-lg">
//       <div className="flex justify-between w-11/12 mx-auto py-4 items-center">

//         {/* Logo */}
//         <Link href="/" className="flex items-center">
         

//                 <Image
//           src="/logo.png" 
//           alt="Lenden Logo"
//           width={60}
//           height={15}
//           priority
//           className="hidden dark:block object-contain hover:scale-105 transition-transform"
//         />

//         <Image
//           src="/lightmoodlogo.png" // dark mode logo
//           alt="Lenden Logo"
//           width={60}
//           height={15}
//           priority
//           className="block dark:hidden object-contain hover:scale-105 transition-transform"
//         />
//         </Link>

//         {/* Desktop */}
//         <div className="hidden md:flex items-center gap-6">
//           <ul className="flex items-center gap-8 text-[#1D4E48] dark:text-gray-200 font-medium">
//             {navLinks.map((link) => (
//               <li key={link.name} className="relative group">
//                 <Link
//                   href={link.href}
//                   className={`transition ${
//                     pathname === link.href ? "font-semibold" : ""
//                   }`}
//                 >
//                   {link.name}
//                 </Link>

//                 {/* animated underline */}
//                 <span
//                   className={`absolute left-0 -bottom-1 h-[2px] bg-[#1D4E48] dark:bg-[#BDDD7E] transition-all duration-300 ${
//                     pathname === link.href
//                       ? "w-full"
//                       : "w-0 group-hover:w-full"
//                   }`}
//                 />
//               </li>
//             ))}

//             {/* Login button */}
//             <Link
//               href="/login"
//               className="bg-[#1D4E48] dark:bg-[#BDDD7E] text-white dark:text-[#111827] px-5 py-2 rounded-lg font-semibold shadow hover:-translate-y-0.5 hover:shadow-lg transition"
//             >
//               Login
//             </Link>
//           </ul>

//           {/* Toggle */}
//           <button
//             onClick={toggleDarkMode}
//             className="p-2 rounded-full bg-white/80 dark:bg-gray-700 text-[#1D4E48] dark:text-[#BDDD7E] hover:rotate-12 transition"
//           >
//             {darkMode ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
//           </button>
//         </div>

//         {/* Mobile */}
//         <div className="flex md:hidden items-center gap-2">
//           <button
//             onClick={toggleDarkMode}
//             className="p-2 rounded-full bg-white/80 dark:bg-gray-700 text-[#1D4E48] dark:text-[#BDDD7E]"
//           >
//             {darkMode ? <HiSun /> : <HiMoon />}
//           </button>

//           <div
//             className="text-[#1D4E48] dark:text-gray-200 text-3xl cursor-pointer"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <HiX /> : <HiMenu />}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <ul className="md:hidden flex flex-col items-center gap-5 pb-6 text-[#1D4E48] dark:text-gray-200 font-medium animate-fadeIn">
//           {navLinks.map((link) => (
//             <li key={link.name}>
//               <Link href={link.href} onClick={() => setIsOpen(false)}>
//                 {link.name}
//               </Link>
//             </li>
//           ))}

//           <Link
//             href="/login"
//             className="bg-[#1D4E48] dark:bg-[#BDDD7E] text-white dark:text-[#111827] px-5 py-2 rounded-lg font-semibold"
//             onClick={() => setIsOpen(false)}
//           >
//             Login
//           </Link>
//         </ul>
//       )}
//     </nav>
//   )
// }




"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); 

  // Scroll detection for dynamic width and blur intensity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Solution', path: '/solution' },
    { name: 'Company', path: '/company' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    // Fixed wrapper to position the navbar perfectly
    <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4 pointer-events-none">
      
      {/* --- THE GLASS NAVBAR --- */}
      <nav 
        className={`pointer-events-auto relative flex items-center justify-between p-2 rounded-[2rem] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isScrolled 
            ? 'w-full max-w-4xl bg-white/[0.03] backdrop-blur-[24px] border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]' 
            : 'w-full max-w-5xl bg-[#0f172a]/20 backdrop-blur-xl border border-white/5 shadow-2xl'
        }`}
      >
        {/* Subtle Inner Glass Shine */}
        <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] pointer-events-none"></div>

        {/* Brand / Logo */}
        <div className="pl-4 md:pl-6 flex-shrink-0 z-20 flex items-center gap-2">
          <Sparkles className="text-[#3b82f6] w-5 h-5" />
          <Link href="/" className="text-white font-bold text-lg md:text-xl tracking-wide drop-shadow-md">
            NovaPay
          </Link>
        </div>

        {/* Desktop Links (Center) */}
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 bg-white/[0.02] p-1 rounded-full border border-white/[0.05]">
          {navLinks.map((link) => {
            const isActive = pathname === link.path || (link.name === 'Home' && pathname === '/');
            
            return (
              <Link 
                key={link.name} 
                href={link.path} 
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full group ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                
                {/* Glowing Active Dot Indicator */}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#3b82f6] rounded-full shadow-[0_0_10px_3px_rgba(59,130,246,0.8)]"></span>
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA Button (Right) */}
        <div className="hidden md:flex flex-shrink-0 pr-1 z-20">
          <Link 
            href="/register" 
            className="group relative flex items-center gap-2 px-6 py-2.5 rounded-full overflow-hidden border border-white/10"
          >
            {/* Button Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] transition-all duration-500 group-hover:scale-110 group-hover:from-[#2563eb] group-hover:to-[#1d4ed8]"></div>
            
            {/* Button Inner Shine */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent opacity-50 rounded-t-full"></div>

            <span className="relative text-white text-sm font-semibold tracking-wide drop-shadow-sm">Get the App</span>
            <ArrowUpRight 
              size={16} 
              strokeWidth={2.5} 
              className="relative text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" 
            />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="md:hidden text-white z-20 pr-4"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Dropdown (Glassmorphism) */}
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
              )
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