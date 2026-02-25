"use client";
import React, { useState } from 'react';
import { Chrome, Facebook, Linkedin, Eye, EyeOff, Shield, Unlock, Lock } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

const PandaRegister: React.FC = () => {
  const [activeField, setActiveField] = useState<'none' | 'text' | 'password'>('none');
  const [showPassword, setShowPassword] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  // Password strength calculation
  const calculateStrength = (pass: string) => {
    let score = 0;
    if (!pass) return 0;
    if (pass.length > 5) score += 1;
    if (pass.length > 7) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return Math.min(4, score);
  };

  const strength = calculateStrength(passwordInput);

  // --- CREATIVE PROFESSIONAL REGISTRATION HANDLER ---
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if(!nameInput || !emailInput || !passwordInput) {
        // ❌ Validation Error
        toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-sm w-full bg-[#0d2b28]/95 backdrop-blur-xl border border-red-500/30 rounded-[1.2rem] p-4 flex items-center gap-5 shadow-2xl`}>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 border border-red-500/50">
                <Lock className="text-red-400" size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[1em] font-black text-red-400 tracking-widest uppercase text-xs">Validation Failed</p>
                <p className="text-[0.8em] font-medium text-slate-400 mt-0.5">সবগুলো ঘর পূরণ করতে হবে!</p>
              </div>
            </div>
        ));
      return;
    }

    // 1. Radar Scan Loading Toast
    const toastId = toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-sm w-full bg-[#0d2b28]/90 backdrop-blur-xl border border-[#19524c] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[1.2rem] pointer-events-auto p-4 flex items-center gap-5 relative overflow-hidden`}>
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#e6ffa1] to-transparent animate-[pulse_1.5s_ease-in-out_infinite]"></div>
        
        <div className="relative flex items-center justify-center w-12 h-12">
          <div className="absolute inset-0 border-[3px] border-transparent border-t-[#e6ffa1] border-r-[#e6ffa1] rounded-full animate-spin"></div>
          <Shield className="text-[#e6ffa1]" size={18} />
        </div>

        <div className="flex-1">
          <p className="text-[0.9em] font-black text-[#e6ffa1] tracking-widest uppercase">Processing</p>
          <p className="text-[0.75em] font-medium text-slate-400 mt-0.5">Creating secure account...</p>
        </div>
      </div>
    ), { duration: Infinity });

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: nameInput, 
          email: emailInput, 
          password: passwordInput 
        })
      });

      const data = await res.json();
      toast.dismiss(toastId);

      if(res.ok) {
         // 2. Success: Identity Created (Access Granted ভাইব)
         toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-sm w-full bg-[#0d2b28]/95 backdrop-blur-xl border border-[#e6ffa1]/40 shadow-[0_0_40px_-10px_rgba(230,255,161,0.3)] rounded-[1.2rem] pointer-events-auto overflow-hidden relative p-4 flex items-center gap-5`}>
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#19524c] border border-[#e6ffa1]/50">
                <div className="absolute inset-0 bg-[#e6ffa1] animate-ping opacity-20 rounded-full"></div>
                <Unlock className="text-[#e6ffa1]" size={22} />
              </div>
    
              <div className="flex-1 z-10">
                <p className="text-[1em] font-black text-[#e6ffa1] tracking-widest uppercase">Identity Created</p>
                <p className="text-[0.75em] font-medium text-slate-400 mt-0.5">NovaPay একাউন্ট সফলভাবে তৈরি হয়েছে।</p>
              </div>
            </div>
         ));
         
      } else {
         // 3. Error Case
         toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-sm w-full bg-[#0d2b28]/95 backdrop-blur-xl border border-red-500/30 rounded-[1.2rem] p-4 flex items-center gap-5 shadow-2xl`}>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 border border-red-500/50">
                <Lock className="text-red-400 animate-pulse" size={22} />
              </div>
              <div className="flex-1">
                <p className="text-[0.9em] font-black text-red-400 tracking-widest uppercase">Request Denied</p>
                <p className="text-[0.75em] font-medium text-slate-400 mt-0.5">{data.message || "একাউন্ট তৈরি করা যায়নি!"}</p>
              </div>
            </div>
         ));
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("সার্ভারে কোনো সমস্যা হয়েছে!");
    }
  };

  // Exact JavaScript animations converted to React inline styles
  const eyeLeftStyle = activeField === 'text' 
    ? { left: '0.75em', top: '1.12em', transform: 'rotate(20deg)' } 
    : { left: '0.6em', top: '0.6em', transform: 'rotate(20deg)' };

  const eyeRightStyle = activeField === 'text' 
    ? { right: '0.75em', top: '1.12em', transform: 'rotate(-20deg)' } 
    : { right: '0.6em', top: '0.6em', transform: 'rotate(-20deg)' };

  const leftHandStyle = activeField === 'password' && !showPassword
    ? { height: '6.56em', top: '3.87em', left: '11.75em', transform: 'rotate(-155deg)' }
    : { height: '2.81em', top: '8.4em', left: '7.5em', transform: 'rotate(0deg)' };

  const rightHandStyle = activeField === 'password' && !showPassword
    ? { height: '6.56em', top: '3.87em', right: '11.75em', transform: 'rotate(155deg)' }
    : { height: '2.81em', top: '8.4em', right: '7.5em', transform: 'rotate(0deg)' };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden selection:bg-[#e6ffa1] selection:text-[#19524c] py-10">
      
      {/* Local Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden -z-20 bg-[#0d2b28]">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none">
          <source src="/loginpagebgvideo.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 bg-[#19524c]/60 backdrop-blur-[3px] -z-10"></div>

      <div className="relative w-[31.25em] h-[48em] text-[12px] sm:text-[14px] md:text-[16px] mt-16">
        
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

        <form onSubmit={handleRegister} className="absolute top-[9.35em] left-1/2 -translate-x-1/2 w-[25em] h-[35em] bg-white px-[2.5em] py-[2em] flex flex-col rounded-[1em] z-10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-slate-100">
          <div className="text-center w-full mt-1">
            <h2 className="text-[1.8em] font-extrabold text-[#19524c] tracking-tight">Create Account</h2>
            <div className="w-[3em] h-[0.2em] bg-[#19524c] mx-auto mt-2 mb-3 rounded-full"></div>
            
            <div className="flex justify-center gap-4 mb-3">
              <button type="button" className="p-2 rounded-full border border-slate-300 hover:border-[#19524c] hover:bg-slate-50 transition-colors group">
                <Facebook size={16} className="text-slate-600 group-hover:text-[#19524c]" />
              </button>
              <button type="button" className="p-2 rounded-full border border-slate-300 hover:border-[#19524c] hover:bg-slate-50 transition-colors group">
                <Chrome size={16} className="text-slate-600 group-hover:text-[#19524c]" />
              </button>
              <button type="button" className="p-2 rounded-full border border-slate-300 hover:border-[#19524c] hover:bg-slate-50 transition-colors group">
                <Linkedin size={16} className="text-slate-600 group-hover:text-[#19524c]" />
              </button>
            </div>
            
            <p className="text-[0.8em] font-medium text-slate-500 mb-4">
              Already have an account? <Link href="/login" className="text-[#19524c] font-bold hover:underline">Log in</Link>
            </p>
          </div>

          <div className="flex-1 w-full px-2">
            <div className="relative mb-[1.2em]">
              <label htmlFor="name" className="absolute -top-[0.6em] left-[1em] bg-white px-1 text-[0.7em] font-bold text-[#19524c] z-10">Full Name</label>
              <input type="text" id="name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="John Doe" onFocus={() => setActiveField('text')} onBlur={() => setActiveField('none')} className="text-[0.85em] font-medium text-slate-800 p-[1em] w-full border border-slate-300 rounded-[0.5em] focus:border-[#19524c] outline-none transition-colors" />
            </div>

            <div className="relative mb-[1.2em]">
              <label htmlFor="email" className="absolute -top-[0.6em] left-[1em] bg-white px-1 text-[0.7em] font-bold text-[#19524c] z-10">Email</label>
              <input type="email" id="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="example@email.com" onFocus={() => setActiveField('text')} onBlur={() => setActiveField('none')} className="text-[0.85em] font-medium text-slate-800 p-[1em] w-full border border-slate-300 rounded-[0.5em] focus:border-[#19524c] outline-none transition-colors" />
            </div>
            
            <div className="relative mb-[1em]">
              <label htmlFor="password" className="absolute -top-[0.6em] left-[1em] bg-white px-1 text-[0.7em] font-bold text-[#19524c] z-10">Password</label>
              <div className="relative w-full border border-slate-300 rounded-[0.5em] focus-within:border-[#19524c] transition-colors bg-transparent">
                <input type={showPassword ? "text" : "password"} id="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="••••••••" onFocus={() => setActiveField('password')} onBlur={() => setActiveField('none')} className="text-[0.85em] font-medium text-slate-800 p-[1em] pr-[2.5em] w-full bg-transparent outline-none tracking-widest" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-[0.8em] top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#19524c] transition-colors z-10">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {activeField === 'password' && passwordInput.length > 0 && (
                <div className="absolute -bottom-[1.2em] left-0 w-full flex items-center justify-between px-1">
                  <div className="flex gap-1 w-full mr-2">
                    <div className={`h-1 flex-1 rounded-full ${strength >= 1 ? (strength === 1 ? 'bg-red-400' : strength === 2 ? 'bg-yellow-400' : strength >= 3 ? 'bg-green-500' : 'bg-slate-200') : 'bg-slate-200'}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${strength >= 2 ? (strength === 2 ? 'bg-yellow-400' : strength >= 3 ? 'bg-green-500' : 'bg-slate-200') : 'bg-slate-200'}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${strength >= 3 ? 'bg-green-500' : 'bg-slate-200'}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${strength >= 4 ? 'bg-green-600' : 'bg-slate-200'}`}></div>
                  </div>
                  <span className="text-[0.6em] font-bold whitespace-nowrap" style={{ color: strength <= 1 ? '#f87171' : strength === 2 ? '#facc15' : '#22c55e' }}>
                    {strength <= 1 ? 'Weak' : strength === 2 ? 'Fair' : strength === 3 ? 'Good' : 'Strong'}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center mb-5 px-1 mt-[1.2em]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-[1.1em] h-[1.1em] rounded border-slate-300 text-[#19524c] focus:ring-[#19524c]" />
                <span className="text-[0.75em] font-bold text-slate-500">I accept the <Link href="#" className="text-[#19524c] hover:underline">Terms & Conditions</Link></span>
              </label>
            </div>
            
            <button type="submit" className="text-[0.95em] py-[0.9em] rounded-[2em] border-none outline-none bg-[#19524c] text-white font-bold tracking-[0.05em] cursor-pointer transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_5px_15px_rgba(25,82,76,0.3)] w-full">
              Sign Up
            </button>
          </div>
        </form>
        
        <div className="absolute bg-[#0d2b28] w-[2.5em] border-[0.18em] border-[#081a18] rounded-[0.6em_0.6em_2.18em_2.18em] z-40 transition-all duration-[600ms] ease-in-out shadow-sm" style={leftHandStyle}></div>
        <div className="absolute bg-[#0d2b28] w-[2.5em] border-[0.18em] border-[#081a18] rounded-[0.6em_0.6em_2.18em_2.18em] z-40 transition-all duration-[600ms] ease-in-out shadow-sm" style={rightHandStyle}></div>
        
        <div className="absolute top-[42.81em] left-[9.5em] bg-[#0d2b28] h-[3.12em] w-[3.12em] border-[0.18em] border-[#081a18] rounded-[2.5em_2.5em_1.2em_1.2em] z-20 shadow-md">
          <div className="absolute top-[1.12em] left-[0.55em] bg-[#e6ffa1] h-[1.37em] w-[1.75em] rounded-[1.56em_1.56em_0.6em_0.6em]"></div>
          <div className="absolute top-[0.31em] left-[1.12em] bg-[#e6ffa1] h-[0.5em] w-[0.5em] rounded-full shadow-[0.87em_0.37em_#e6ffa1,-0.87em_0.37em_#e6ffa1]"></div>
        </div>
        <div className="absolute top-[42.81em] right-[9.5em] bg-[#0d2b28] h-[3.12em] w-[3.12em] border-[0.18em] border-[#081a18] rounded-[2.5em_2.5em_1.2em_1.2em] z-20 shadow-md">
          <div className="absolute top-[1.12em] left-[0.55em] bg-[#e6ffa1] h-[1.37em] w-[1.75em] rounded-[1.56em_1.56em_0.6em_0.6em]"></div>
          <div className="absolute top-[0.31em] left-[1.12em] bg-[#e6ffa1] h-[0.5em] w-[0.5em] rounded-full shadow-[0.87em_0.37em_#e6ffa1,-0.87em_0.37em_#e6ffa1]"></div>
        </div>
      </div>
    </div>
  );
};

export default PandaRegister;