"use client";
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Wallet, Receipt, Globe2, ArrowRightLeft, Building2, CreditCard, Smartphone } from 'lucide-react';

const servicesData = [
  { id: 0, title: 'Cash In', icon: Wallet },
  { id: 1, title: 'Bill Pay', icon: Receipt },
  { id: 2, title: 'Remittance', icon: Globe2 },
  { id: 3, title: 'Transfer Money', icon: ArrowRightLeft },
  { id: 4, title: 'Nova Islamic', icon: Building2 },
  { id: 5, title: 'Cash Out', icon: CreditCard },
  { id: 6, title: 'Mobile Recharge', icon: Smartphone },
];

const KeyFeatures: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const total = servicesData.length;

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % total);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);

  // Position and size calculation logic
  const getItemStyles = (index: number) => {
    let diff = (index - activeIndex + total) % total;
    if (diff > Math.floor(total / 2)) diff -= total;

    const isCenter = diff === 0;

    // Spacing between items to prevent large icon overlap
    const spacingX = 'max(110px, min(18vw, 240px))';
    
    const translateX = `calc(-50% + calc(${spacingX} * ${diff}))`;

    // Center item is 100% scale, sides are smaller (80%)
    const scale = isCenter ? 1 : 0.8;

    let opacity = 1;
    if (Math.abs(diff) >= 3) opacity = 0; 

    return {
      transform: `translate(${translateX}, -50%) scale(${scale})`,
      opacity: opacity,
      zIndex: isCenter ? 20 : 10,
    };
  };

  return (
    <section className="w-full mt-[-12%] bg-gray-50 dark:bg-[#0A0E17] py-16 md:py-20 overflow-hidden select-none border-y border-gray-200 dark:border-gray-800/60 transition-colors duration-300">
      
      {/* Custom Gradient Definition for Lucide Icons */}
      <svg width="0" height="0" className="absolute">
        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="#60A5FA" offset="0%" />   {/* Tailwind blue-400 */}
          <stop stopColor="#2563EB" offset="100%" /> {/* Tailwind blue-600 */}
        </linearGradient>
      </svg>

      <div className="max-w-[1400px] mx-auto px-2 md:px-4 relative flex flex-col items-center">
        
        {/* --- Main Slider Area --- */}
        <div className="relative w-full h-[280px] md:h-[340px] flex items-center justify-between">
          
          {/* Left Arrow */}
          <button 
            onClick={handlePrev} 
            className="z-30 p-3 md:p-4 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-[#121928] rounded-full transition-all active:scale-95 hidden sm:block shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
          >
            <ArrowLeft strokeWidth={2} size={32} />
          </button>

          <div className="relative flex-1 h-full overflow-hidden mx-2 sm:mx-8">
            
            {/* --- FIXED CENTER CIRCLE --- */}
            {/* Background Glow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-blue-500/15 dark:bg-blue-500/20 blur-[40px] rounded-full z-0 pointer-events-none transition-colors duration-300"></div>
            
            {/* Main Center Circle */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] md:w-[230px] md:h-[230px] bg-white dark:bg-[#121928] rounded-full shadow-[0_15px_40px_rgba(15,23,42,0.08)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.4)] border-[3px] border-white dark:border-[#121928] z-10 pointer-events-none transition-all duration-300"></div>

            {/* --- SLIDING ITEMS --- */}
            {servicesData.map((service, index) => {
              const isCenter = index === activeIndex;
              const Icon = service.icon;
              
              return (
                <div
                  key={service.id}
                  onClick={() => setActiveIndex(index)}
                  className="absolute left-1/2 top-1/2 flex flex-col items-center justify-center cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] w-[160px] md:w-[200px]"
                  style={getItemStyles(index)}
                >
                  {/* Icon */}
                  <div className={`mb-4 md:mb-5 transition-all duration-500 flex items-center justify-center ${
                    isCenter 
                      ? 'scale-110 drop-shadow-[0_8px_16px_rgba(37,99,235,0.3)] dark:drop-shadow-[0_8px_16px_rgba(96,165,250,0.2)]' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    <Icon 
                      size={isCenter ? 64 : 52} 
                      strokeWidth={isCenter ? 1.5 : 1.5} 
                      style={isCenter ? { stroke: 'url(#iconGradient)' } : {}}
                    />
                  </div>
                  
                  {/* Text */}
                  <span 
                    className={`text-center transition-all duration-300 leading-tight ${
                      isCenter 
                        ? 'text-[17px] md:text-[20px] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 drop-shadow-sm' 
                        : 'text-[15px] md:text-[17px] font-bold text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {service.title}
                  </span>
                </div>
              );
            })}

          </div>

          {/* Right Arrow */}
          <button 
            onClick={handleNext} 
            className="z-30 p-3 md:p-4 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-[#121928] rounded-full transition-all active:scale-95 hidden sm:block shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
          >
            <ArrowRight strokeWidth={2} size={32} />
          </button>

        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;