"use client";
import React, { useState, useEffect } from 'react';
import { Play, ThumbsUp, LineChart, ShieldCheck, Star, ArrowRight, Wallet, Fingerprint, Nfc, Wifi, Plus } from 'lucide-react';

const Banner: React.FC = () => {
  // --- STATES ---
  const [scrollY, setScrollY] = useState(0);
  const [activeCard, setActiveCard] = useState<number>(1); // 1 = Main, 2 = Base, 3 = Dark

  // --- SCROLL TRACKER ---
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- SCROLL SCATTER LOGIC ---
  const scatterProgress = Math.min(Math.max(scrollY - 250, 0) / 400, 1);

  // --- DYNAMIC CARD POSITIONING ENGINE ---
  const getCardStyle = (cardId: number) => {
    const isActive = activeCard === cardId;
    let position = 'center';

    if (!isActive) {
      if (activeCard === 1) position = cardId === 2 ? 'left' : 'right';
      else if (activeCard === 2) position = cardId === 3 ? 'left' : 'right';
      else if (activeCard === 3) position = cardId === 1 ? 'left' : 'right';
    }

    let tx = 0, ty = 0, rot = 0, zIndex = 10, scale = 1;

    if (position === 'center') {
      tx = 0; ty = 0; rot = 0; scale = 1.05; zIndex = 50; 
      ty -= 800 * scatterProgress; 
    } else if (position === 'left') {
      tx = -150; ty = 20; rot = -12; scale = 0.95; zIndex = 20; 
      tx -= 800 * scatterProgress; ty -= 200 * scatterProgress; rot -= 45 * scatterProgress; 
    } else if (position === 'right') {
      tx = 150; ty = 20; rot = 12; scale = 0.95; zIndex = 20; 
      tx += 800 * scatterProgress; ty -= 200 * scatterProgress; rot += 45 * scatterProgress; 
    }

    return {
      transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${scale})`,
      zIndex: zIndex,
      opacity: Math.max(0, 1 - (scatterProgress * 1.5)),
      transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease-out'
    };
  };

  return (
    <section className="relative w-full min-h-screen bg-[#071311] flex flex-col items-center pt-28 pb-16 overflow-hidden text-white font-sans z-0">
      
      <style dangerouslySetInnerHTML={{__html: `
        .bg-tech-grid {
          background-image: 
            linear-gradient(to right, rgba(230, 255, 161, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(230, 255, 161, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-gentle-float { animation: gentleFloat 4s ease-in-out infinite; }
        @keyframes floatIconPulse {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-25px) scale(1.1); opacity: 0.6; }
        }
        .floating-icon { animation: floatIconPulse 6s ease-in-out infinite; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .anim-fade-up { animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .delay-txt-1 { animation-delay: 0.2s; }
        .delay-txt-2 { animation-delay: 0.4s; }
        .delay-txt-3 { animation-delay: 0.6s; }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        @keyframes cardEntrance {
          from { opacity: 0; transform: scale(0.9) translateY(40px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .card-enter-anim { animation: cardEntrance 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      {/* Background Elements */}
      <div className="absolute inset-0 bg-tech-grid z-[-2]" style={{ transform: `translateY(${scrollY * 0.3}px)` }}></div>
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#19524c] opacity-[0.35] blur-[150px] rounded-full pointer-events-none z-[-2] transition-transform duration-500" style={{ transform: `translate(-50%, ${scrollY * 0.05}px)` }}></div>
      
      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none z-[-1] max-w-7xl mx-auto hidden sm:block" style={{ opacity: 1 - scatterProgress }}>
        <Plus className="absolute top-[15%] left-[10%] text-white/20 floating-icon" size={24} style={{ animationDelay: '0s', animationDuration: '7s' }} />
        <Plus className="absolute top-[35%] right-[15%] text-white/20 floating-icon" size={32} style={{ animationDelay: '1.5s', animationDuration: '8s' }} />
        <Plus className="absolute bottom-[40%] left-[20%] text-[#e6ffa1]/20 floating-icon" size={20} style={{ animationDelay: '3s', animationDuration: '6s' }} />
        <Plus className="absolute top-[25%] left-[80%] text-white/20 floating-icon" size={16} style={{ animationDelay: '0.5s', animationDuration: '9s' }} />
      </div>

      {/* Top Badge & Headings */}
      <div className="anim-fade-up flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#e6ffa1]/20 bg-[#19524c]/30 backdrop-blur-md mb-8 z-10 hover:border-[#e6ffa1]/50 transition-colors" style={{ opacity: 1 - (scatterProgress * 2) }}>
        <div className="bg-[#e6ffa1] p-1.5 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(230,255,161,0.5)]">
          <Wallet size={12} className="text-[#0d2b28]" />
        </div>
        <span className="text-[#e6ffa1] text-xs font-bold tracking-widest uppercase pr-2">NovaPay Network</span>
      </div>

      <h1 className="anim-fade-up delay-txt-1 text-[2.75rem] md:text-6xl lg:text-7xl font-bold tracking-tight text-center leading-[1.15] mb-8 z-10 max-w-4xl" style={{ opacity: 1 - (scatterProgress * 2) }}>
        Your Gateway to Digital<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e6ffa1] to-white drop-shadow-[0_0_15px_rgba(230,255,161,0.2)]">
          Finance Innovation
        </span>
      </h1>

      <div className="anim-fade-up delay-txt-2 flex items-center gap-5 mb-16 md:mb-20 z-10" style={{ opacity: 1 - (scatterProgress * 2) }}>
        <button className="relative overflow-hidden flex items-center gap-3 bg-[#e6ffa1] text-[#0d2b28] hover:bg-white transition-all px-7 py-3.5 rounded-full font-bold text-sm shadow-[0_0_30px_-5px_rgba(230,255,161,0.4)] group">
          <span className="relative z-10">Get Started</span>
          <div className="relative z-10 bg-[#19524c] rounded-full p-1.5 text-[#e6ffa1] group-hover:translate-x-1 transition-transform">
            <ArrowRight size={14} strokeWidth={3} />
          </div>
        </button>

        <button className="flex items-center gap-3 px-6 py-3.5 rounded-full border border-[#19524c] bg-[#0d2b28]/50 hover:bg-[#19524c]/50 backdrop-blur-sm transition-all group">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#19524c] text-[#e6ffa1] group-hover:scale-110 transition-transform">
            <Play size={14} fill="currentColor" />
          </div>
          <span className="text-sm font-medium text-slate-300 group-hover:text-white">Watch Demo</span>
        </button>
      </div>

      {/* --- CARDS & WIDGETS SECTION --- */}
      <div className="relative w-full max-w-6xl h-[300px] md:h-[400px] flex items-center justify-center z-20 mt-4 card-enter-anim">
        
        {/* Text Widgets */}
        <div className="absolute left-[2%] lg:left-[5%] top-[5%] flex items-center gap-4 transition-opacity duration-500 z-50 hidden md:flex" style={{ opacity: 1 - (scatterProgress * 2) }}>
          <div className="text-right">
            <h4 className="font-bold text-sm text-white drop-shadow-lg">Excellence Beyond</h4>
            <p className="text-[11px] text-[#e6ffa1] mt-0.5">Top tier features.</p>
          </div>
          <div className="relative w-12 h-12 rounded-2xl border border-[#e6ffa1]/20 bg-[#19524c]/80 flex items-center justify-center text-[#e6ffa1] backdrop-blur-xl shadow-2xl">
            <ThumbsUp size={18} />
          </div>
        </div>

        <div className="absolute left-[5%] lg:left-[10%] bottom-[10%] flex items-center gap-4 transition-opacity duration-500 delay-100 z-50 hidden md:flex" style={{ opacity: 1 - (scatterProgress * 2) }}>
          <div className="text-right">
            <h4 className="font-bold text-sm text-white drop-shadow-lg">Financial Superiority</h4>
            <p className="text-[11px] text-[#e6ffa1] mt-0.5">Grow your wealth.</p>
          </div>
          <div className="relative w-12 h-12 rounded-2xl border border-[#e6ffa1]/20 bg-[#19524c]/80 flex items-center justify-center text-[#e6ffa1] backdrop-blur-xl shadow-2xl">
            <LineChart size={18} />
          </div>
        </div>

        <div className="absolute right-[2%] lg:right-[5%] top-[5%] flex items-center gap-4 transition-opacity duration-500 delay-200 z-50 hidden md:flex" style={{ opacity: 1 - (scatterProgress * 2) }}>
          <div className="relative w-12 h-12 rounded-2xl border border-[#e6ffa1]/20 bg-[#19524c]/80 flex items-center justify-center text-[#e6ffa1] backdrop-blur-xl shadow-2xl">
            <ShieldCheck size={18} />
          </div>
          <div className="text-left">
            <h4 className="font-bold text-sm text-white drop-shadow-lg">Perfected Finance</h4>
            <p className="text-[11px] text-[#e6ffa1] mt-0.5">Bank grade security.</p>
          </div>
        </div>

        <div className="absolute right-[5%] lg:right-[10%] bottom-[10%] flex items-center gap-4 transition-opacity duration-500 delay-300 z-50 hidden md:flex" style={{ opacity: 1 - (scatterProgress * 2) }}>
          <div className="relative w-12 h-12 rounded-2xl border border-[#e6ffa1]/20 bg-[#19524c]/80 flex items-center justify-center text-[#e6ffa1] backdrop-blur-xl shadow-2xl">
            <Star size={18} />
          </div>
          <div className="text-left">
            <h4 className="font-bold text-sm text-white drop-shadow-lg">Superior Technology</h4>
            <p className="text-[11px] text-[#e6ffa1] mt-0.5">Modern web standards.</p>
          </div>
        </div>

        {/* 3 Interactive Cards Container */}
        <div className="relative w-[300px] h-[200px] md:w-[360px] md:h-[230px] flex items-center justify-center pointer-events-auto">
          
          {/* CARD 2: NovaPay Base */}
          <div onClick={() => setActiveCard(2)} className="absolute cursor-pointer" style={getCardStyle(2)}>
            <div className={`w-[260px] h-[160px] md:w-[300px] md:h-[190px] bg-gradient-to-br from-[#0d2b28] to-[#040B0A] rounded-2xl shadow-[0_30px_50px_rgba(0,0,0,0.8)] border border-[#19524c]/50 p-5 flex flex-col justify-between backdrop-blur-md transition-all duration-300 ${activeCard === 2 ? 'animate-gentle-float shadow-[0_40px_70px_rgba(230,255,161,0.2)]' : 'hover:-translate-y-2 hover:border-[#e6ffa1]/40'}`}>
              <div className="flex justify-between items-start opacity-70">
                <span className="font-bold text-lg tracking-tighter text-white">NovaPay Base</span>
                <Wifi size={20} className="text-white rotate-90" />
              </div>
              <div className="opacity-70">
                <p className="font-mono tracking-widest text-sm mb-2 text-white">**** **** **** 1245</p>
                <div className="w-8 h-5 bg-gradient-to-br from-slate-300 to-slate-500 rounded-[3px]"></div>
              </div>
            </div>
          </div>

          {/* CARD 3: Dark Card */}
          <div onClick={() => setActiveCard(3)} className="absolute cursor-pointer" style={getCardStyle(3)}>
            <div className={`w-[260px] h-[160px] md:w-[300px] md:h-[190px] bg-[#091F1C] rounded-2xl shadow-[0_30px_50px_rgba(0,0,0,0.8)] border border-[#19524c] p-0 flex flex-col overflow-hidden transition-all duration-300 ${activeCard === 3 ? 'animate-gentle-float shadow-[0_40px_70px_rgba(230,255,161,0.2)]' : 'hover:-translate-y-2 hover:border-[#e6ffa1]/40'}`}>
              <div className="w-full h-10 md:h-12 bg-black mt-6 opacity-80 shadow-inner"></div>
                <div className="w-[80%] h-8 md:h-10 bg-slate-100 mx-auto mt-4 rounded flex items-center justify-between px-3 border-2 border-slate-300">
                   <div className="flex-1 opacity-50">
                      <svg viewBox="0 0 100 20" className="w-16 md:w-20 h-5">
                         <path d="M5,15 Q20,0 35,15 T65,5 T95,15" fill="none" stroke="#19524c" strokeWidth="2" />
                      </svg>
                   </div>
                   <div className="bg-[#19524c] px-2 py-1 text-[10px] md:text-xs text-white font-mono rounded-sm">892</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent mix-blend-overlay pointer-events-none"></div>
            </div>
          </div>

          {/* CARD 1: NovaPay Platinum */}
          <div onClick={() => setActiveCard(1)} className="absolute cursor-pointer" style={getCardStyle(1)}>
            <div className={`w-[280px] h-[175px] md:w-[340px] md:h-[215px] bg-gradient-to-br from-[#19524c] via-[#0d2b28] to-[#040B0A] rounded-2xl border border-[#e6ffa1]/40 p-6 flex flex-col justify-between backdrop-blur-xl overflow-hidden transition-all duration-300 ${activeCard === 1 ? 'animate-gentle-float shadow-[0_40px_80px_rgba(230,255,161,0.15)]' : 'shadow-[0_30px_50px_rgba(0,0,0,0.8)] hover:-translate-y-2 hover:border-[#e6ffa1]/60'}`}>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50 pointer-events-none"></div>
              {activeCard === 1 && <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite_linear] bg-gradient-to-r from-transparent via-white/15 to-transparent z-0 pointer-events-none"></div>}
              
              <div className="flex justify-between items-start z-10 relative">
                <div className="flex flex-col">
                  <span className="font-black text-2xl tracking-tighter text-[#e6ffa1] drop-shadow-[0_0_8px_rgba(230,255,161,0.5)]">NovaPay<span className="text-white">.</span></span>
                  <span className="text-[8px] text-[#e6ffa1]/70 tracking-widest uppercase mt-0.5">Platinum Visa</span>
                </div>
                <div className="flex items-center gap-2">
                  <Nfc size={20} className="text-[#e6ffa1]/70" />
                  <div className="w-10 h-7 md:w-11 md:h-8 bg-gradient-to-br from-[#FFD700] to-[#B8860B] rounded-[4px] border border-yellow-200/50 shadow-inner flex items-center justify-center">
                    <div className="w-full h-[1px] bg-black/20"></div>
                  </div>
                </div>
              </div>

              <div className="z-10 relative mt-auto">
                <p className="font-mono tracking-[0.2em] md:tracking-[0.25em] text-base md:text-lg mb-3 text-white drop-shadow-md">
                  5422 <span className="text-[#e6ffa1]">****</span> <span className="text-[#e6ffa1]">****</span> 7951
                </p>
                <div className="flex justify-between text-[10px] md:text-xs tracking-widest text-slate-300 uppercase font-medium">
                  <span>Shahria Nafis</span>
                  <span className="text-[#e6ffa1]">12/28</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- TEXT CONTENT (BELOW CARDS) --- */}
      <div className="flex flex-col items-center text-center mt-12 md:mt-16 z-10 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] max-w-3xl text-white mb-6">
          Intelligent Financial Insights
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl">
          Take full control of your digital wallet. Seamless transactions, live analytics, and modern bank-grade security built directly into your pocket.
        </p>
      </div>

    </section>
  );
};

export default Banner;