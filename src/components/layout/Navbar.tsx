



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
