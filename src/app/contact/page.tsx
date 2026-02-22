"use client";
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Package, Clock, Headphones, Send, MapPin, Phone, Mail, Building, CalendarDays } from 'lucide-react';

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f4f7f6] dark:bg-[#070e0d] text-slate-900 dark:text-slate-100 transition-colors duration-700 font-sans relative overflow-hidden selection:bg-[#e6ffa1] selection:text-[#19524c]">
      
      {/* Background Animated Blobs (Ultra Premium Glassy Ambient Effect) */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#e6ffa1] rounded-full mix-blend-multiply filter blur-[180px] opacity-20 dark:opacity-[0.07] animate-[pulse_10s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#19524c] rounded-full mix-blend-multiply filter blur-[180px] opacity-15 dark:opacity-30 animate-[pulse_12s_ease-in-out_infinite_reverse]"></div>

      {/* Header Banner - Frosted Glass */}
      <div className="bg-white/30 dark:bg-[#0b2421]/40 backdrop-blur-2xl py-24 text-center border-b border-white/40 dark:border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.03)] relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#19524c] dark:text-white mb-4 tracking-tight drop-shadow-sm">Contact Us</h1>
        <p className="text-sm text-slate-600 dark:text-[#e6ffa1]/80 font-medium tracking-widest uppercase">
          Home <span className="mx-3 opacity-40">/</span> Contact
        </p>
      </div>

      <div className="w-11/12 mx-auto py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Side: Form Section (Advanced Glassmorphism) */}
          <div className="lg:col-span-7 bg-white/50 dark:bg-[#111c1b]/50 backdrop-blur-3xl border border-white/60 dark:border-white/5 p-8 sm:p-12 rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-500 hover:shadow-[0_8px_40px_0_rgba(31,38,135,0.08)]">
            <div className="mb-12">
              <h2 className="text-xs font-bold text-[#19524c] dark:text-[#e6ffa1] tracking-[0.25em] uppercase mb-4 flex items-center gap-4">
                <span className="w-10 h-[2px] bg-gradient-to-r from-[#19524c] to-transparent dark:from-[#e6ffa1] rounded-full"></span> 
                Let's Connect
              </h2>
              <h3 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                Get Your <span className="text-[#19524c] dark:text-[#e6ffa1] italic font-serif font-medium relative whitespace-nowrap px-2">
                  Free Quote
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#e6ffa1]/60 dark:text-[#19524c]/60 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="5" fill="transparent" strokeLinecap="round"/></svg>
                </span>
                Today
              </h3>
            </div>

            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2.5 uppercase tracking-widest transition-colors group-focus-within:text-[#19524c] dark:group-focus-within:text-[#e6ffa1]">Full Name *</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full px-5 py-4 rounded-2xl bg-white/60 dark:bg-black/30 border border-slate-200/60 dark:border-slate-800/60 focus:bg-white dark:focus:bg-[#0a1110] focus:border-[#19524c] dark:focus:border-[#e6ffa1] focus:ring-4 focus:ring-[#19524c]/10 dark:focus:ring-[#e6ffa1]/10 outline-none transition-all duration-300 placeholder:text-slate-400/80 dark:placeholder:text-slate-600 font-medium shadow-sm inset-shadow-sm" 
                  />
                </div>
                <div className="group">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2.5 uppercase tracking-widest transition-colors group-focus-within:text-[#19524c] dark:group-focus-within:text-[#e6ffa1]">Email Address *</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full px-5 py-4 rounded-2xl bg-white/60 dark:bg-black/30 border border-slate-200/60 dark:border-slate-800/60 focus:bg-white dark:focus:bg-[#0a1110] focus:border-[#19524c] dark:focus:border-[#e6ffa1] focus:ring-4 focus:ring-[#19524c]/10 dark:focus:ring-[#e6ffa1]/10 outline-none transition-all duration-300 placeholder:text-slate-400/80 dark:placeholder:text-slate-600 font-medium shadow-sm inset-shadow-sm" 
                  />
                </div>
              </div>
              
              <div className="group">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2.5 uppercase tracking-widest transition-colors group-focus-within:text-[#19524c] dark:group-focus-within:text-[#e6ffa1]">Subject *</label>
                <input 
                  type="text" 
                  placeholder="How can we help you?" 
                  className="w-full px-5 py-4 rounded-2xl bg-white/60 dark:bg-black/30 border border-slate-200/60 dark:border-slate-800/60 focus:bg-white dark:focus:bg-[#0a1110] focus:border-[#19524c] dark:focus:border-[#e6ffa1] focus:ring-4 focus:ring-[#19524c]/10 dark:focus:ring-[#e6ffa1]/10 outline-none transition-all duration-300 placeholder:text-slate-400/80 dark:placeholder:text-slate-600 font-medium shadow-sm inset-shadow-sm" 
                />
              </div>
              
              <div className="group">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2.5 uppercase tracking-widest transition-colors group-focus-within:text-[#19524c] dark:group-focus-within:text-[#e6ffa1]">Your Message *</label>
                <textarea 
                  rows={5} 
                  placeholder="Write your message here..." 
                  className="w-full px-5 py-4 rounded-2xl bg-white/60 dark:bg-black/30 border border-slate-200/60 dark:border-slate-800/60 focus:bg-white dark:focus:bg-[#0a1110] focus:border-[#19524c] dark:focus:border-[#e6ffa1] focus:ring-4 focus:ring-[#19524c]/10 dark:focus:ring-[#e6ffa1]/10 outline-none transition-all duration-300 resize-none placeholder:text-slate-400/80 dark:placeholder:text-slate-600 font-medium leading-relaxed shadow-sm inset-shadow-sm"
                ></textarea>
              </div>
              
              <button 
                type="button" 
                className="group flex items-center bg-gradient-to-r from-[#19524c] to-[#14423d] dark:from-[#e6ffa1] dark:to-[#d4f57a] rounded-full p-2 pr-8 hover:shadow-[0_10px_30px_rgba(25,82,76,0.3)] dark:hover:shadow-[0_10px_30px_rgba(230,255,161,0.25)] transition-all duration-500 active:scale-[0.98] w-full sm:w-auto mt-2"
              >
                <span className="bg-[#e6ffa1] dark:bg-[#19524c] text-[#19524c] dark:text-[#e6ffa1] p-3.5 rounded-full shadow-md transition-transform duration-500 group-hover:rotate-[15deg] group-hover:scale-105 flex items-center justify-center">
                  <Send size={18} strokeWidth={2.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </span>
                <span className="ml-5 font-bold text-[#e6ffa1] dark:text-[#19524c] text-sm tracking-widest uppercase">
                  Send Message
                </span>
              </button>
            </form>
          </div>

          {/* Right Side: Information Card (Dark Glassmorphism) */}
          <div className="lg:col-span-5 bg-[#19524c]/95 dark:bg-[#0c2926]/90 backdrop-blur-3xl border border-white/10 dark:border-white/5 rounded-[2.5rem] rounded-tr-[7rem] p-10 lg:p-14 text-white shadow-2xl h-full transition-transform duration-500 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-[-50px] right-[-50px] w-72 h-72 bg-[#e6ffa1] rounded-full mix-blend-overlay filter blur-[90px] opacity-20 pointer-events-none"></div>
            <div className="absolute bottom-[-50px] left-[-50px] w-52 h-52 bg-[#091211] rounded-full mix-blend-overlay filter blur-[60px] opacity-40 pointer-events-none"></div>

            <div className="space-y-10 relative z-10">
              
              {/* Info Block 1 */}
              <div className="flex items-start gap-5 group cursor-default">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-[#e6ffa1] group-hover:text-[#19524c] transition-all duration-500 text-[#e6ffa1]">
                  <Building size={22} strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold mb-1.5 text-white/60 uppercase tracking-widest">Headquarters</h4>
                  <p className="text-white text-[15px] font-medium leading-relaxed">
                    Lenden Fintech Tower<br />
                    Tech Valley, Dhaka 1200
                  </p>
                </div>
              </div>

              {/* Info Block 2 */}
              <div className="flex items-start gap-5 group cursor-default">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-[#e6ffa1] group-hover:text-[#19524c] transition-all duration-500 text-[#e6ffa1]">
                  <Phone size={22} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h4 className="text-[11px] font-bold mb-1.5 text-white/60 uppercase tracking-widest">Contact details</h4>
                  <div className="space-y-2.5 mt-2">
                    <a href="tel:+880123456789" className="flex items-center gap-3 text-white text-[15px] font-medium hover:text-[#e6ffa1] transition-colors group/link w-fit">
                      +880 123-456-789
                    </a>
                    <a href="mailto:support@lenden.com" className="flex items-center gap-3 text-white text-[15px] font-medium hover:text-[#e6ffa1] transition-colors group/link w-fit">
                      support@lenden.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Info Block 3 */}
              <div className="flex items-start gap-5 group cursor-default">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-[#e6ffa1] group-hover:text-[#19524c] transition-all duration-500 text-[#e6ffa1]">
                  <CalendarDays size={22} strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold mb-1.5 text-white/60 uppercase tracking-widest">Business Hours</h4>
                  <p className="text-white text-[15px] font-medium mb-1">Sun - Thu : 09:00 AM - 06:00 PM</p>
                  <p className="text-white/50 text-[14px] font-medium">Fri - Sat : Closed</p>
                </div>
              </div>
            </div>

            <div className="pt-10 mt-12 border-t border-white/10 relative z-10">
              <h4 className="text-[11px] font-bold mb-5 text-white/60 tracking-widest uppercase">Connect With Us</h4>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                  <a key={idx} href="#" className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl text-white/90 hover:bg-[#e6ffa1] hover:text-[#19524c] hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(230,255,161,0.15)] transition-all duration-300 border border-white/10">
                    <Icon size={18} strokeWidth={2} className={idx < 2 ? "fill-current border-none" : ""} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Unique & Working Map Section */}
      <div className="w-11/12 mx-auto pb-16 relative z-10">
        <div className="relative w-full h-[450px] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgb(0,0,0,0.4)] border border-white/60 dark:border-white/5 group bg-slate-200 dark:bg-slate-900">
          
          {/* Floating Location Badge */}
          <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20 bg-white/90 dark:bg-[#0c1816]/90 backdrop-blur-xl p-4 md:pr-8 rounded-2xl shadow-2xl border border-white/40 dark:border-white/5 flex items-center gap-4 transition-transform duration-700 group-hover:translate-x-1 group-hover:translate-y-1">
            <div className="bg-[#19524c] dark:bg-[#e6ffa1] p-3 rounded-xl shadow-inner">
              <MapPin className="text-[#e6ffa1] dark:text-[#19524c]" size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-lg tracking-tight">Lenden HQ</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5 tracking-wide">Dhaka, Bangladesh</p>
            </div>
          </div>

          <div className="absolute inset-0 bg-[#19524c]/5 dark:bg-[#070e0d]/40 pointer-events-none group-hover:opacity-0 transition-opacity duration-700 z-10 backdrop-blur-[1px]"></div>
          
          {/* Real Google Maps Embed (Dhaka Location) */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9024424301397!2d90.39108011536269!3d23.75085809467994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8a335090e5f%3A0x8b326d9c6e3b56!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1614161400000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full filter dark:invert dark:contrast-[85%] dark:hue-rotate-[190deg] dark:saturate-[50%] dark:opacity-80 transition-all duration-1000 group-hover:filter-none object-cover"
          ></iframe>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-11/12 mx-auto pb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[
            { icon: Package, title: "Secure Wallet", desc: "Bank-grade encryption & security." },
            { icon: Clock, title: "Fast Support", desc: "24/7 dedicated assistance team." },
            { icon: Headphones, title: "Expert Advice", desc: "Ready to solve your financial issues." }
          ].map((feature, idx) => (
            <div key={idx} className="flex items-start gap-6 p-8 bg-white/40 dark:bg-[#111c1b]/40 backdrop-blur-2xl border border-white/60 dark:border-white/5 rounded-[2rem] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-500 group cursor-pointer">
              <div className="text-[#19524c] dark:text-[#e6ffa1] bg-white/60 dark:bg-[#19524c]/30 p-4 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm border border-white/50 dark:border-white/5">
                <feature.icon size={28} strokeWidth={2} />
              </div>
              <div className="pt-1">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-[17px] tracking-tight mb-1.5 group-hover:text-[#19524c] dark:group-hover:text-[#e6ffa1] transition-colors">{feature.title}</h4>
                <p className="text-[14px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ContactUs;