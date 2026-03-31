"use client";
import React from "react";
import Link from "next/link";
import { Sparkles, Twitter, Linkedin, Github, Mail, Phone } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050B14] text-slate-400 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={18} className="text-blue-500" />
              <span className="text-white font-black text-xl tracking-wide">NovaPay</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              Secure. Fast. Simple. Your all-in-one digital wallet for modern finance.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all">
                <Twitter size={14} className="text-slate-400 hover:text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all">
                <Linkedin size={14} className="text-slate-400 hover:text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all">
                <Github size={14} className="text-slate-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-widest">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Send Money</Link></li>
              <li><Link href="/donation" className="hover:text-white transition-colors">Donate</Link></li>
              <li><Link href="/dashboard/international" className="hover:text-white transition-colors">International Pay</Link></li>
              <li><Link href="/micro-savings" className="hover:text-white transition-colors">Micro Saving</Link></li>
              <li><Link href="/split-bill" className="hover:text-white transition-colors">Split Bill</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-widest">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/review" className="hover:text-white transition-colors">Reviews</Link></li>
              <li><Link href="/chat" className="hover:text-white transition-colors">Chat</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-widest">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/chat/support" className="hover:text-white transition-colors">Live Chat</Link></li>
            </ul>
            <div className="mt-6 space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Mail size={12} /> support@novapay.com
              </div>
              <div className="flex items-center gap-2">
                <Phone size={12} /> +880 1700-000000
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} NovaPay. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link href="/faq" className="hover:text-slate-400 transition-colors">FAQ</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
