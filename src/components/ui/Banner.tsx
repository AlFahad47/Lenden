"use client";
import React, { useState, useEffect } from 'react';
import { Play, ThumbsUp, LineChart, ShieldCheck, Star, ArrowUpRight, Wallet, Fingerprint, Wifi, Plus } from 'lucide-react';

const Banner: React.FC = () => {
  // --- STATES ---
  const [scrollY, setScrollY] = useState(0);
  const [activeCard, setActiveCard] = useState<number>(1); // 1 = Main, 2 = Base, 3 = Dark
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
  const scatterProgress = Math.min(Math.max(scrollY - 200, 0) / 400, 1);

  // --- DYNAMIC CARD POSITIONING ENGINE ---
  const getCardStyle = (cardId: number) => {
    const visualActive = hoveredCard ?? activeCard;
    const isActive = visualActive === cardId;
    let position = 'center';

    if (!isActive) {
      if (visualActive === 1) position = cardId === 2 ? 'left' : 'right';
      else if (visualActive === 2) position = cardId === 3 ? 'left' : 'right';
      else if (visualActive === 3) position = cardId === 1 ? 'left' : 'right';
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

  // Custom Gradient
  const hedwigGradient = 'linear-gradient(to right, #4DA1FF, #1E50FF)';

  return (
    <section className="relative w-full min-h-[90vh] bg-[#050B14] flex flex-col items-center pt-28 pb-10 overflow-hidden text-white font-sans z-0">
      
      <style dangerouslySetInnerHTML={{__html: `
        .bg-tech-grid {
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
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
        .delay-txt-1 { animation-delay: 0.1s; }
        .delay-txt-2 { animation-delay: 0.2s; }
        .delay-txt-3 { animation-delay: 0.3s; }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        @keyframes cardEntrance {
          from { opacity: 0; transform: scale(0.9) translateY(40px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .card-enter-anim { animation: cardEntrance 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      {/* Background Elements */}
      <div className="absolute inset-0 bg-tech-grid z-[-2]" style={{ transform: `translateY(${scrollY * 0.3}px)` }}></div>
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#2C64FF] opacity-[0.25] blur-[150px] rounded-full pointer-events-none z-[-2] transition-transform duration-500" style={{ transform: `translate(-50%, ${scrollY * 0.05}px)` }}></div>
      
      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none z-[-1] max-w-7xl mx-auto hidden sm:block" style={{ opacity: 1 - scatterProgress }}>
        <Plus className="absolute top-[15%] left-[10%] text-white/20 floating-icon" size={24} style={{ animationDelay: '0s', animationDuration: '7s' }} />
        <Plus className="absolute top-[35%] right-[15%] text-white/20 floating-icon" size={32} style={{ animationDelay: '1.5s', animationDuration: '8s' }} />
        <Plus className="absolute bottom-[40%] left-[20%] text-[#4DA1FF]/40 floating-icon" size={20} style={{ animationDelay: '3s', animationDuration: '6s' }} />
        <Plus className="absolute top-[25%] left-[80%] text-white/20 floating-icon" size={16} style={{ animationDelay: '0.5s', animationDuration: '9s' }} />
      </div>

      {/* --- TOP SECTION (Badge & Headings) --- */}
      <div className="flex flex-col items-center text-center px-4 mb-8 z-10" style={{ opacity: 1 - (scatterProgress * 2) }}>
        
        <div className="anim-fade-up flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#0F172A]/50 backdrop-blur-md mb-6 transition-colors shadow-[0_0_15px_-3px_rgba(77,161,255,0.3)]">
          <div className="p-1.5 rounded-full flex items-center justify-center shadow-sm" style={{ background: hedwigGradient }}>
            <Wallet size={12} className="text-white" />
          </div>
          <span className="text-[#4DA1FF] text-xs font-bold tracking-widest uppercase pr-2">NovaPay Network</span>
        </div>

        <h1 className="anim-fade-up delay-txt-1 text-[2.5rem] md:text-5xl lg:text-[4rem] font-bold tracking-tight leading-[1.1] mb-5 max-w-3xl">
          Your Gateway to Digital<br />
          <span className="text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(77,161,255,0.4)]" style={{ backgroundImage: hedwigGradient }}>
            Finance Innovation
          </span>
        </h1>

        <p className="anim-fade-up delay-txt-2 text-[#64748B] text-sm md:text-base max-w-xl mb-8">
          Take full control of your digital wallet. Seamless transactions, live analytics, and modern bank-grade security built directly into your pocket.
        </p>

        <div className="anim-fade-up delay-txt-3 flex items-center justify-center gap-4">
          
          {/* UPDATED: Glassy Gradient Button with Soft Shadow */}
          <button className="group relative flex items-center justify-center gap-2 px-8 py-3.5 rounded-full overflow-hidden border border-white/10 shadow-sm hover:shadow-[0_8px_25px_-5px_rgba(77,161,255,0.25)] transition-all duration-300">
            {/* Button Gradient Background (Brand Colors) */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#4DA1FF] to-[#1E50FF] transition-transform duration-500 ease-out group-hover:scale-[1.05]"></div>
            
            {/* Button Inner Shine */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent opacity-40 rounded-t-full pointer-events-none"></div>

            <span className="relative text-white text-sm font-semibold tracking-wide drop-shadow-sm">Get Started</span>
            <ArrowUpRight 
              size={16} 
              strokeWidth={2.5} 
              className="relative text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" 
            />
          </button>

          {/* Secondary Glassy Button */}
          <button className="flex items-center justify-center gap-3 px-6 py-3.5 rounded-full border border-[#4DA1FF]/20 bg-[#0F172A]/60 hover:bg-[#0F172A]/80 backdrop-blur-md transition-all group text-[#64748B] hover:text-[#4DA1FF] shadow-sm">
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#4DA1FF]/10 text-[#4DA1FF] group-hover:scale-110 transition-transform">
              <Play size={12} fill="currentColor" />
            </div>
            <span className="text-sm font-semibold">Watch Demo</span>
          </button>
        </div>
      </div>

      {/* --- CENTERPIECE: CARDS & WIDGETS SECTION --- */}
      <div className="relative w-full max-w-6xl h-[320px] md:h-[400px] flex items-center justify-center z-20 card-enter-anim">
        
        {/* Text Widgets */}
        <div className="absolute left-[2%] lg:left-[5%] top-[5%] flex items-center gap-4 transition-opacity duration-500 z-50 hidden md:flex" style={{ opacity: 1 - (scatterProgress * 2) }}>
          <div className="text-right">
            <h4 className="font-bold text-sm text-white drop-shadow-lg">Excellence Beyond</h4>
            <p className="text-[11px] text-[#4DA1FF] mt-0.5">Top tier features.</p>
          </div>
          <div className="relative w-12 h-12 rounded-2xl border border-[#4DA1FF]/20 bg-[#0F172A]/70 flex items-center justify-center text-[#4DA1FF] backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(77,161,255,0.3)]">
            <ThumbsUp size={18} />
          </div>
        </div>

        <div className="absolute left-[5%] lg:left-[10%] bottom-[10%] flex items-center gap-4 transition-opacity duration-500 delay-100 z-50 hidden md:flex" style={{ opacity: 1 - (scatterProgress * 2) }}>
          <div className="text-right">
            <h4 className="font-bold text-sm text-white drop-shadow-lg">Financial Superiority</h4>
            <p className="text-[11px] text-[#4DA1FF] mt-0.5">Grow your wealth.</p>
          </div>
          <div className="relative w-12 h-12 rounded-2xl border border-[#4DA1FF]/20 bg-[#0F172A]/70 flex items-center justify-center text-[#4DA1FF] backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(77,161,255,0.3)]">
            <LineChart size={18} />
          </div>
        </div>

        <div className="absolute right-[2%] lg:right-[5%] top-[5%] flex items-center gap-4 transition-opacity duration-500 delay-200 z-50 hidden md:flex" style={{ opacity: 1 - (scatterProgress * 2) }}>
          <div className="relative w-12 h-12 rounded-2xl border border-[#4DA1FF]/20 bg-[#0F172A]/70 flex items-center justify-center text-[#4DA1FF] backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(77,161,255,0.3)]">
            <ShieldCheck size={18} />
          </div>
          <div className="text-left">
            <h4 className="font-bold text-sm text-white drop-shadow-lg">Perfected Finance</h4>
            <p className="text-[11px] text-[#4DA1FF] mt-0.5">Bank grade security.</p>
          </div>
        </div>

        <div className="absolute right-[5%] lg:right-[10%] bottom-[10%] flex items-center gap-4 transition-opacity duration-500 delay-300 z-50 hidden md:flex" style={{ opacity: 1 - (scatterProgress * 2) }}>
          <div className="relative w-12 h-12 rounded-2xl border border-[#4DA1FF]/20 bg-[#0F172A]/70 flex items-center justify-center text-[#4DA1FF] backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(77,161,255,0.3)]">
            <Star size={18} />
          </div>
          <div className="text-left">
            <h4 className="font-bold text-sm text-white drop-shadow-lg">Superior Technology</h4>
            <p className="text-[11px] text-[#4DA1FF] mt-0.5">Modern web standards.</p>
          </div>
        </div>

        {/* --- 3 ANIMATING CARDS CONTAINER --- */}
        <div className="relative w-[300px] h-[200px] md:w-[360px] md:h-[230px] flex items-center justify-center pointer-events-auto">
          
          {/* CARD 2: Secondary Dark Glass Card (Left) */}
          <div
            onClick={() => setActiveCard(2)}
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
            className="absolute cursor-pointer"
            style={getCardStyle(2)}
          >
            <div className={`w-[260px] h-[160px] md:w-[300px] md:h-[190px] bg-[#0F172A]/90 rounded-2xl shadow-[0_30px_50px_rgba(0,0,0,0.6)] border border-[#4DA1FF]/20 p-5 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 ${activeCard === 2 ? 'animate-gentle-float shadow-[0_40px_70px_rgba(44,100,255,0.2)]' : 'hover:-translate-y-2'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#4DA1FF]/10 to-transparent opacity-50 pointer-events-none rounded-2xl"></div>
              <div className="flex justify-between items-start opacity-90 z-10">
                <span className="font-bold text-lg tracking-tighter text-white">NovaPay Base</span>
                <Wifi size={20} className="text-[#4DA1FF]/80 rotate-90" />
              </div>
              <div className="opacity-90 z-10">
                <p className="font-mono tracking-widest text-sm mb-2 text-white/80">**** **** **** 1245</p>
                <div className="w-8 h-5 bg-[#4DA1FF]/30 backdrop-blur-sm rounded-[3px] border border-[#4DA1FF]/20"></div>
              </div>
            </div>
          </div>

          {/* CARD 3: Darker Glass Card (Right) */}
          <div
            onClick={() => setActiveCard(3)}
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
            className="absolute cursor-pointer"
            style={getCardStyle(3)}
          >
            <div className={`w-[260px] h-[160px] md:w-[300px] md:h-[190px] bg-[#050B14]/90 rounded-2xl shadow-[0_30px_50px_rgba(0,0,0,0.8)] border border-[#1E293B] p-0 flex flex-col overflow-hidden transition-all duration-300 backdrop-blur-xl ${activeCard === 3 ? 'animate-gentle-float shadow-[0_40px_70px_rgba(0,0,0,0.9)]' : 'hover:-translate-y-2 hover:border-[#4DA1FF]/30'}`}>
              <div className="w-full h-10 md:h-12 bg-[#0F172A] mt-6 opacity-90 shadow-inner"></div>
                <div className="w-[80%] h-8 md:h-10 bg-[#0F172A]/80 mx-auto mt-4 rounded flex items-center justify-between px-3 border border-[#1E50FF]/30 backdrop-blur-sm">
                   <div className="flex-1 opacity-50">
                      <svg viewBox="0 0 100 20" className="w-16 md:w-20 h-5">
                         <path d="M5,15 Q20,0 35,15 T65,5 T95,15" fill="none" stroke="#4DA1FF" strokeWidth="2" />
                      </svg>
                   </div>
                   <div className="px-2 py-1 text-[10px] md:text-xs text-white font-mono rounded-sm" style={{ background: hedwigGradient }}>892</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#4DA1FF]/5 to-transparent mix-blend-overlay pointer-events-none"></div>
            </div>
          </div>

          {/* --- CARD 1: MAIN HEDWIG GRADIENT GLASS CARD --- */}
          <div
            onClick={() => setActiveCard(1)}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
            className="absolute cursor-pointer"
            style={getCardStyle(1)}
          >
            <div className={`w-[280px] h-[175px] md:w-[340px] md:h-[215px] rounded-2xl border border-[#4DA1FF]/30 p-5 md:p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 backdrop-blur-2xl ${activeCard === 1 ? 'animate-gentle-float shadow-[0_30px_80px_rgba(77,161,255,0.5)]' : 'shadow-[0_30px_50px_rgba(0,0,0,0.6)] hover:-translate-y-2'}`}
                 style={{ background: `linear-gradient(115deg, rgba(77, 161, 255, 0.9) 0%, rgba(30, 80, 255, 0.9) 100%)` }}>
              
              {/* Glassy Overlays */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-30 pointer-events-none"></div>
              <div className="absolute inset-0 bg-[#0F172A] opacity-10 mix-blend-overlay pointer-events-none"></div>
              {activeCard === 1 && <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite_linear] bg-gradient-to-r from-transparent via-white/25 to-transparent z-0 pointer-events-none"></div>}
              
              {/* Top Section: Chip, NFC, Logo */}
              <div className="flex justify-between items-start z-10 relative">
                <div className="flex items-center gap-3 md:gap-4">
                  {/* EMV Silver Chip */}
                  <div className="w-10 h-7 md:w-12 md:h-8 bg-gradient-to-br from-[#E2E8F0]/90 to-[#94A3B8]/90 rounded-[6px] border border-white/40 shadow-sm flex flex-col justify-evenly py-1 px-2 backdrop-blur-sm">
                    <div className="w-full h-[1px] bg-slate-500/50"></div>
                    <div className="w-full h-[1px] bg-slate-500/50"></div>
                  </div>
                  {/* NFC Icon */}
                  <Wifi size={26} className="text-white/90 rotate-90 drop-shadow-sm" />
                </div>
                
                {/* Logo Placeholder */}
                <div className="bg-white/90 backdrop-blur-sm p-1.5 md:p-2 rounded-full shadow-sm text-[#1E50FF]">
                   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
                      <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4"></path>
                   </svg>
                </div>
              </div>

              {/* Bottom Section: Card Numbers & Exp Date */}
              <div className="z-10 relative mt-auto w-full text-shadow-sm">
                <div className="font-mono text-[1.3rem] md:text-[1.6rem] tracking-[0.1em] md:tracking-[0.15em] text-white drop-shadow-md leading-tight flex items-center flex-wrap gap-x-3 md:gap-x-4">
                  <span>5235</span>
                  <span>4200</span>
                  <span>2432</span>
                  <br className="hidden sm:block" />
                  <span>222</span>
                </div>
                
                <div className="absolute -bottom-1 md:bottom-0 right-0">
                  <span className="text-[9px] md:text-[10px] text-white/90 tracking-widest font-bold uppercase drop-shadow-sm">Exp 09/24</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;