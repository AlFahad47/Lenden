"use client";
import React, { useState } from 'react';
import { Chrome, Facebook, Linkedin } from 'lucide-react';
import Link from 'next/link';

const PandaLogin: React.FC = () => {
  const [activeField, setActiveField] = useState<'none' | 'username' | 'password'>('none');

  // Exact JavaScript animations converted to React inline styles
  const eyeLeftStyle = activeField === 'username' 
    ? { left: '0.75em', top: '1.12em', transform: 'rotate(20deg)' } 
    : { left: '0.6em', top: '0.6em', transform: 'rotate(20deg)' };

  const eyeRightStyle = activeField === 'username' 
    ? { right: '0.75em', top: '1.12em', transform: 'rotate(-20deg)' } 
    : { right: '0.6em', top: '0.6em', transform: 'rotate(-20deg)' };

  const leftHandStyle = activeField === 'password'
    ? { height: '6.56em', top: '3.87em', left: '11.75em', transform: 'rotate(-155deg)' }
    : { height: '2.81em', top: '8.4em', left: '7.5em', transform: 'rotate(0deg)' };

  const rightHandStyle = activeField === 'password'
    ? { height: '6.56em', top: '3.87em', right: '11.75em', transform: 'rotate(155deg)' }
    : { height: '2.81em', top: '8.4em', right: '7.5em', transform: 'rotate(0deg)' };

  return (
    // Outer Wrapper with hidden overflow for full screen background
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden selection:bg-[#e6ffa1] selection:text-[#19524c]">
      
      {/* 1. Local Video Background (Directly from public folder) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden -z-20 bg-[#0d2b28]">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          {/* Note: Ensure the file extension is correct (.mp4, .webm etc.). Assuming .mp4 here */}
          <source src="/loginpagebgvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* 2. Adjusted Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-[#19524c]/60 backdrop-blur-[3px] -z-10"></div>

      {/* 3. Panda & Form Container */}
      <div className="relative w-[31.25em] h-[45em] text-[12px] sm:text-[14px] md:text-[16px] mt-16">
        
        {/* --- PANDA FACE --- */}
        <div className="absolute top-[1.75em] left-[10.75em] bg-[#0d2b28] h-[2.5em] w-[2.81em] border-[0.18em] border-[#081a18] rounded-[2.5em_2.5em_0_0] rotate-[-38deg] z-10"></div>
        <div className="absolute top-[1.75em] right-[10.75em] bg-[#0d2b28] h-[2.5em] w-[2.81em] border-[0.18em] border-[#081a18] rounded-[2.5em_2.5em_0_0] rotate-[38deg] z-10"></div>
        
        <div className="absolute top-[2em] left-0 right-0 mx-auto h-[7.5em] w-[8.4em] bg-white border-[0.18em] border-[#081a18] rounded-[7.5em_7.5em_5.62em_5.62em] z-20 shadow-sm">
          <div className="absolute top-[4em] left-[1em] bg-[#e6ffa1] h-[1em] w-[1.37em] rounded-full rotate-[25deg] opacity-80"></div>
          <div className="absolute top-[4em] right-[1em] bg-[#e6ffa1] h-[1em] w-[1.37em] rounded-full rotate-[-25deg] opacity-80"></div>
          
          <div className="absolute top-[2.18em] left-[1.37em] bg-[#0d2b28] h-[2.18em] w-[2em] rounded-[2em] rotate-[-20deg]">
            <div className="absolute h-[0.6em] w-[0.6em] bg-white rounded-full transition-all duration-[400ms] ease-out" style={eyeLeftStyle}></div>
          </div>
          <div className="absolute top-[2.18em] right-[1.37em] bg-[#0d2b28] h-[2.18em] w-[2em] rounded-[2em] rotate-[20deg]">
            <div className="absolute h-[0.6em] w-[0.6em] bg-white rounded-full transition-all duration-[400ms] ease-out" style={eyeRightStyle}></div>
          </div>

          <div className="absolute top-[4.37em] left-0 right-0 mx-auto h-[1em] w-[1em] bg-[#0d2b28] rounded-[1.2em_0_0_0.25em] rotate-[45deg]">
            <div className="absolute top-[0.75em] left-[1em] bg-[#0d2b28] h-[0.6em] w-[0.1em] rotate-[-45deg]"></div>
          </div>

          <div className="absolute top-[5.31em] left-[3.12em] h-[0.75em] w-[0.93em] bg-transparent rounded-full" style={{ boxShadow: '0 0.18em #0d2b28' }}>
            <div className="absolute left-[0.87em] top-0 h-[0.75em] w-[0.93em] bg-transparent rounded-full" style={{ boxShadow: '0 0.18em #0d2b28' }}></div>
          </div>
        </div>

        {/* --- FORM SECTION --- */}
        <form 
          onSubmit={(e) => e.preventDefault()}
          className="absolute top-[9.35em] left-1/2 -translate-x-1/2 w-[25em] h-[32em] bg-white px-[2.5em] py-[2em] flex flex-col rounded-[1em] z-10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-slate-100"
        >
          <div className="text-center w-full mt-2">
            <h2 className="text-[1.8em] font-extrabold text-[#19524c] tracking-tight">Sign in to Account</h2>
            <div className="w-[3em] h-[0.2em] bg-[#19524c] mx-auto mt-2 mb-4 rounded-full"></div>
            
            <div className="flex justify-center gap-4 mb-4">
              <button type="button" className="p-2.5 rounded-full border border-slate-300 hover:border-[#19524c] hover:bg-slate-50 transition-colors group">
                <Facebook size={18} className="text-slate-600 group-hover:text-[#19524c]" />
              </button>
              <button type="button" className="p-2.5 rounded-full border border-slate-300 hover:border-[#19524c] hover:bg-slate-50 transition-colors group">
                <Chrome size={18} className="text-slate-600 group-hover:text-[#19524c]" />
              </button>
              <button type="button" className="p-2.5 rounded-full border border-slate-300 hover:border-[#19524c] hover:bg-slate-50 transition-colors group">
                <Linkedin size={18} className="text-slate-600 group-hover:text-[#19524c]" />
              </button>
            </div>
            <p className="text-[0.8em] font-medium text-slate-500 mb-6">Don't have an account? <Link href="/register" className="text-[#19524c] font-bold hover:underline">Sign up</Link></p>
          </div>

          <div className="flex-1 w-full px-2">
            <div className="relative mb-[1.5em]">
              <label htmlFor="username" className="absolute -top-[0.6em] left-[1em] bg-white px-1 text-[0.7em] font-bold text-[#19524c]">Email</label>
              <input 
                type="text" 
                id="username" 
                placeholder="example@email.com" 
                onFocus={() => setActiveField('username')}
                onBlur={() => setActiveField('none')}
                className="text-[0.9em] font-medium text-slate-800 p-[1em] border border-slate-300 rounded-[0.5em] bg-transparent focus:border-[#19524c] outline-none transition-colors w-full"
              />
            </div>
            
            <div className="relative mb-[1.5em]">
              <label htmlFor="password" className="absolute -top-[0.6em] left-[1em] bg-white px-1 text-[0.7em] font-bold text-[#19524c]">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="••••••••" 
                onFocus={() => setActiveField('password')}
                onBlur={() => setActiveField('none')}
                className="text-[0.9em] font-medium text-slate-800 p-[1em] border border-slate-300 rounded-[0.5em] bg-transparent focus:border-[#19524c] outline-none transition-colors w-full tracking-widest"
              />
            </div>

            <div className="flex items-center justify-between mb-6 px-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-[1.1em] h-[1.1em] rounded border-slate-300 text-[#19524c] focus:ring-[#19524c]" />
                <span className="text-[0.8em] font-bold text-slate-500">Remember me</span>
              </label>
              <Link href="#" className="text-[0.8em] font-bold text-slate-500 hover:text-[#19524c] transition-colors">
                Forgot Password?
              </Link>
            </div>
            
            <button 
              type="button"
              className="text-[0.95em] py-[1em] rounded-[2em] border-none outline-none bg-[#19524c] text-white font-bold tracking-[0.05em] cursor-pointer transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_5px_15px_rgba(25,82,76,0.3)] w-full"
            >
              Sign In
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-[0.7em] font-medium text-slate-400">
              <Link href="#" className="hover:text-[#19524c]">Privacy Policy</Link>
              <span className="mx-2">•</span>
              <Link href="#" className="hover:text-[#19524c]">Terms & Conditions</Link>
            </p>
          </div>
        </form>
        
        {/* --- PANDA HANDS & PAWS --- */}

        <div className="absolute bg-[#0d2b28] w-[2.5em] border-[0.18em] border-[#081a18] rounded-[0.6em_0.6em_2.18em_2.18em] z-40 transition-all duration-[600ms] ease-in-out shadow-sm" style={leftHandStyle}></div>
        <div className="absolute bg-[#0d2b28] w-[2.5em] border-[0.18em] border-[#081a18] rounded-[0.6em_0.6em_2.18em_2.18em] z-40 transition-all duration-[600ms] ease-in-out shadow-sm" style={rightHandStyle}></div>
        
        <div className="absolute top-[39.81em] left-[9.5em] bg-[#0d2b28] h-[3.12em] w-[3.12em] border-[0.18em] border-[#081a18] rounded-[2.5em_2.5em_1.2em_1.2em] z-20 shadow-md">
          <div className="absolute top-[1.12em] left-[0.55em] bg-[#e6ffa1] h-[1.37em] w-[1.75em] rounded-[1.56em_1.56em_0.6em_0.6em]"></div>
          <div className="absolute top-[0.31em] left-[1.12em] bg-[#e6ffa1] h-[0.5em] w-[0.5em] rounded-full shadow-[0.87em_0.37em_#e6ffa1,-0.87em_0.37em_#e6ffa1]"></div>
        </div>
        <div className="absolute top-[39.81em] right-[9.5em] bg-[#0d2b28] h-[3.12em] w-[3.12em] border-[0.18em] border-[#081a18] rounded-[2.5em_2.5em_1.2em_1.2em] z-20 shadow-md">
          <div className="absolute top-[1.12em] left-[0.55em] bg-[#e6ffa1] h-[1.37em] w-[1.75em] rounded-[1.56em_1.56em_0.6em_0.6em]"></div>
          <div className="absolute top-[0.31em] left-[1.12em] bg-[#e6ffa1] h-[0.5em] w-[0.5em] rounded-full shadow-[0.87em_0.37em_#e6ffa1,-0.87em_0.37em_#e6ffa1]"></div>
        </div>
        
      </div>
    </div>
  );
};

export default PandaLogin;