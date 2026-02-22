"use client";
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Package, Clock, Headphones, Send, MapPin } from 'lucide-react';

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f4f7f6] dark:bg-[#091211] text-slate-900 dark:text-slate-100 transition-colors duration-500 font-sans relative overflow-hidden selection:bg-[#e6ffa1] selection:text-[#19524c]">
      
      {/* Background Animated Blobs (Premium Glassy Effect) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#e6ffa1] rounded-full mix-blend-multiply filter blur-[150px] opacity-20 dark:opacity-5 animate-[pulse_8s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#19524c] rounded-full mix-blend-multiply filter blur-[150px] opacity-10 dark:opacity-30 animate-[pulse_10s_ease-in-out_infinite_reverse]"></div>

      {/* Header Banner */}
      <div className="bg-[#19524c]/95 dark:bg-[#0b2421]/90 backdrop-blur-xl py-20 text-center border-b border-white/10 shadow-sm relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">Contact Us</h1>
        <p className="text-sm text-[#e6ffa1] font-medium tracking-wide">Home <span className="mx-2 opacity-50">/</span> Contact Us</p>
      </div>

      <div className="w-11/12 mx-auto py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Form Section */}
          <div className="lg:col-span-7 bg-white/70 dark:bg-[#111c1b]/60 backdrop-blur-2xl border border-white/60 dark:border-white/5 p-8 sm:p-12 rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.03)] dark:shadow-[0_8px_40px_rgb(0,0,0,0.2)] transition-all duration-300">
            <div className="mb-12">
              <h2 className="text-xs font-bold text-[#19524c] dark:text-[#e6ffa1] tracking-[0.2em] uppercase mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#19524c] dark:bg-[#e6ffa1] rounded-full"></span> LET'S CONNECT
              </h2>
              <h3 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                Get Your <span className="text-[#19524c] dark:text-[#e6ffa1] italic font-serif font-medium relative whitespace-nowrap">
                  Free Quote Today
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#e6ffa1]/50 dark:text-[#19524c]/50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/></svg>
                </span>
              </h3>
            </div>

            <form className="space-y-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div className="group">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider transition-colors group-focus-within:text-[#19524c] dark:group-focus-within:text-[#e6ffa1]">Your Name *</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full px-5 py-4 rounded-2xl bg-white/60 dark:bg-black/20 border border-slate-200/60 dark:border-slate-800 focus:bg-white dark:focus:bg-black/40 focus:border-[#19524c] dark:focus:border-[#e6ffa1] focus:ring-4 focus:ring-[#19524c]/10 dark:focus:ring-[#e6ffa1]/10 outline-none transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium" 
                  />
                </div>
                <div className="group">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider transition-colors group-focus-within:text-[#19524c] dark:group-focus-within:text-[#e6ffa1]">Email Address *</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full px-5 py-4 rounded-2xl bg-white/60 dark:bg-black/20 border border-slate-200/60 dark:border-slate-800 focus:bg-white dark:focus:bg-black/40 focus:border-[#19524c] dark:focus:border-[#e6ffa1] focus:ring-4 focus:ring-[#19524c]/10 dark:focus:ring-[#e6ffa1]/10 outline-none transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium" 
                  />
                </div>
              </div>
              
              <div className="group">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider transition-colors group-focus-within:text-[#19524c] dark:group-focus-within:text-[#e6ffa1]">Subject *</label>
                <input 
                  type="text" 
                  placeholder="How can we help you?" 
                  className="w-full px-5 py-4 rounded-2xl bg-white/60 dark:bg-black/20 border border-slate-200/60 dark:border-slate-800 focus:bg-white dark:focus:bg-black/40 focus:border-[#19524c] dark:focus:border-[#e6ffa1] focus:ring-4 focus:ring-[#19524c]/10 dark:focus:ring-[#e6ffa1]/10 outline-none transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium" 
                />
              </div>
              
              <div className="group">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider transition-colors group-focus-within:text-[#19524c] dark:group-focus-within:text-[#e6ffa1]">Your Message *</label>
                <textarea 
                  rows={5} 
                  placeholder="Write your message here..." 
                  className="w-full px-5 py-4 rounded-2xl bg-white/60 dark:bg-black/20 border border-slate-200/60 dark:border-slate-800 focus:bg-white dark:focus:bg-black/40 focus:border-[#19524c] dark:focus:border-[#e6ffa1] focus:ring-4 focus:ring-[#19524c]/10 dark:focus:ring-[#e6ffa1]/10 outline-none transition-all duration-300 resize-none placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium leading-relaxed"
                ></textarea>
              </div>
              
              <button 
                type="button" 
                className="group flex items-center bg-gradient-to-r from-[#19524c] to-[#123e39] dark:from-[#e6ffa1] dark:to-[#d4f57a] rounded-full p-2 pr-8 hover:shadow-[0_8px_30px_rgba(25,82,76,0.25)] dark:hover:shadow-[0_8px_30px_rgba(230,255,161,0.25)] transition-all duration-500 active:scale-95 w-full sm:w-auto mt-2"
              >
                <span className="bg-[#e6ffa1] dark:bg-[#19524c] text-[#19524c] dark:text-[#e6ffa1] p-3 rounded-full shadow-md transition-all duration-300 group-hover:rotate-12 flex items-center justify-center">
                  <Send size={18} strokeWidth={2.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </span>
                <span className="ml-5 font-bold text-[#e6ffa1] dark:text-[#19524c] text-sm tracking-wide uppercase">
                  Send Message
                </span>
              </button>
            </form>
          </div>

          {/* Right Side: Information Card */}
          <div className="lg:col-span-5 bg-[#19524c] dark:bg-[#0c2926] border border-white/10 rounded-[2.5rem] rounded-tr-[6rem] p-10 lg:p-12 text-white shadow-2xl h-full transition-transform duration-500 hover:-translate-y-2 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-[#e6ffa1] rounded-full mix-blend-overlay filter blur-[80px] opacity-30 pointer-events-none"></div>
            <div className="absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-[#123e39] rounded-full mix-blend-overlay filter blur-[50px] opacity-50 pointer-events-none"></div>

            <div className="space-y-12 relative z-10">
              <div className="group cursor-default">
                <h4 className="text-xs font-bold mb-3 text-[#e6ffa1]/80 uppercase tracking-widest group-hover:translate-x-1 transition-transform duration-300">Headquarters</h4>
                <p className="text-white text-lg font-medium leading-relaxed">
                  Lenden Fintech Tower<br />
                  Tech Valley, Dhaka 1200
                </p>
              </div>

              <div className="group cursor-default">
                <h4 className="text-xs font-bold mb-3 text-[#e6ffa1]/80 uppercase tracking-widest group-hover:translate-x-1 transition-transform duration-300">Contact Us</h4>
                <p className="text-white text-lg font-medium mb-2 hover:text-[#e6ffa1] transition-colors cursor-pointer block">📞 +880 123-456-789</p>
                <p className="text-white text-lg font-medium hover:text-[#e6ffa1] transition-colors cursor-pointer block">✉️ support@lenden.com</p>
              </div>

              <div className="group cursor-default">
                <h4 className="text-xs font-bold mb-3 text-[#e6ffa1]/80 uppercase tracking-widest group-hover:translate-x-1 transition-transform duration-300">Business Hours</h4>
                <p className="text-white text-lg font-medium mb-1">Sun - Thu : 09:00 AM - 06:00 PM</p>
                <p className="text-slate-400 text-md font-medium">Fri - Sat : Closed</p>
              </div>
            </div>

            <div className="pt-10 mt-10 border-t border-white/10 relative z-10">
              <h4 className="text-sm font-bold mb-5 text-white tracking-wide">Connect With Us</h4>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                  <a key={idx} href="#" className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl text-[#e6ffa1] hover:bg-[#e6ffa1] hover:text-[#19524c] hover:-translate-y-1.5 hover:shadow-[0_10px_20px_rgba(230,255,161,0.2)] transition-all duration-300 border border-white/10">
                    <Icon size={20} className={idx < 2 ? "fill-current border-none" : ""} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Unique & Working Map Section */}
      <div className="w-11/12 mx-auto pb-16 relative z-10 -mt-6">
        <div className="relative w-full h-[450px] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgb(0,0,0,0.4)] border-4 border-white/80 dark:border-[#111c1b] group bg-slate-200 dark:bg-slate-800">
          
          {/* Floating Location Badge (Unique Map Element) */}
          <div className="absolute top-6 left-6 z-20 bg-white/95 dark:bg-[#111c1b]/95 backdrop-blur-xl p-4 pr-6 rounded-2xl shadow-xl border border-white/20 dark:border-white/5 flex items-center gap-4 transition-transform duration-500 group-hover:scale-105">
            <div className="bg-[#19524c] dark:bg-[#e6ffa1] p-3 rounded-xl shadow-inner">
              <MapPin className="text-[#e6ffa1] dark:text-[#19524c]" size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-lg tracking-tight">Lenden HQ</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Dhaka, Bangladesh</p>
            </div>
          </div>

          {/* Working Google Maps Embed */}
          <div className="absolute inset-0 bg-[#19524c]/5 dark:bg-black/20 pointer-events-none group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116834.00977793544!2d90.33728804006155!3d23.780777744476024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1716383617154!5m2!1sen!2sbd" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full filter dark:invert dark:contrast-[85%] dark:hue-rotate-180 dark:opacity-80 transition-all duration-700 hover:filter-none object-cover"
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
            <div key={idx} className="flex items-center gap-6 p-7 bg-white/60 dark:bg-[#111c1b]/60 backdrop-blur-xl border border-white/60 dark:border-white/5 rounded-3xl hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-[#e6ffa1]/5 transition-all duration-500 group cursor-pointer">
              <div className="text-[#19524c] dark:text-[#e6ffa1] bg-slate-100 dark:bg-[#19524c]/30 p-4 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <feature.icon size={32} strokeWidth={2} />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-xl tracking-tight mb-1">{feature.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ContactUs;