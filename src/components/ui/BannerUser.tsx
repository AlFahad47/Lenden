 "use client";

  import React, { useState, useEffect } from "react";
  import { Plus } from "lucide-react";

  const BannerUser: React.FC = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
      const handleScroll = () =>
        requestAnimationFrame(() => setScrollY(window.scrollY));
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
      <section className="relative w-full min-h-[88vh] bg-[#f0f7ff] dark:bg-[#050B14] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden font-sans">

        <style dangerouslySetInnerHTML={{
          __html: `
            .bg-user-grid {
              background-image:
                linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px);
              background-size: 50px 50px;
            }
            .dark .bg-user-grid {
              background-image:
                linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px);
            }
            @keyframes iconFloat {
              0%, 100% { transform: translateY(0px) scale(1); opacity: 0.25; }
              50% { transform: translateY(-20px) scale(1.08); opacity: 0.5; }
            }
            .icon-float { animation: iconFloat 7s ease-in-out infinite; }
          `
        }} />

        {/* Background grid */}
        <div
          className="absolute inset-0 bg-user-grid z-[-2]"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />

        {/* Blue glow blob */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] dark:bg-[#1E50FF] opacity-[0.18] blur-[140px] rounded-full pointer-events-none z-[-1]"
  />

        {/* Floating plus icons */}
        <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
          <Plus className="absolute top-[18%] left-[8%] text-[#4DA1FF]/20 icon-float" size={22} style={{ animationDelay: "0s", animationDuration: "8s" }} />
          <Plus className="absolute top-[30%] right-[10%] text-[#4DA1FF]/20 icon-float" size={30} style={{ animationDelay: "2s", animationDuration: "9s" }} />
          <Plus className="absolute bottom-[35%] left-[18%] text-[#4DA1FF]/15 icon-float" size={18} style={{ animationDelay: "4s", animationDuration: "7s" }} />
          <Plus className="absolute top-[22%] right-[25%] text-[#4DA1FF]/15 icon-float" size={14} style={{ animationDelay: "1s", animationDuration: "10s" }} />
        </div>

        {/* Main content area — to be filled */}
        <div className="w-11/12 mx-auto z-10">
          <p className="text-[#4DA1FF] font-bold">BannerUser — loading...</p>
        </div>

      </section>
    );
  };

  export default BannerUser;
