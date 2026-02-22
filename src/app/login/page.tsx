"use client";
import React, { useState } from 'react';

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
    // Outer Wrapper - Takes full space between your Nav and Footer
    <div className="w-full flex items-center justify-center py-20 bg-[#19524c] min-h-[80vh]">
      
      {/* Panda Container (Scales with font-size just like original em) */}
      <div className="relative w-[31.25em] h-[31.25em] text-[12px] sm:text-[14px] md:text-[16px]">
        
        {/* Form Container */}
        <form 
          onSubmit={(e) => e.preventDefault()}
          className="absolute top-[calc(50%+3.1em)] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[23.75em] h-[18.75em] bg-white px-[3.1em] py-0 flex flex-col justify-center rounded-[0.5em] z-[1] shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
        >
          <label htmlFor="username" className="block mb-[0.2em] font-bold text-[#19524c]">Username:</label>
          <input 
            type="text" 
            id="username" 
            placeholder="Username here.." 
            onFocus={() => setActiveField('username')}
            onBlur={() => setActiveField('none')}
            className="text-[0.95em] font-medium text-[#0d2b28] p-[0.3em] border-none outline-none border-b-[0.12em] border-[#19524c] bg-transparent focus:border-[#e6ffa1] mb-[0.9em] transition-colors w-full"
          />
          
          <label htmlFor="password" className="block mb-[0.2em] font-bold text-[#19524c]">Password:</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Password here.." 
            onFocus={() => setActiveField('password')}
            onBlur={() => setActiveField('none')}
            className="text-[0.95em] font-medium text-[#0d2b28] p-[0.3em] border-none outline-none border-b-[0.12em] border-[#19524c] bg-transparent focus:border-[#e6ffa1] mb-[0.9em] transition-colors w-full"
          />
          
          <button 
            type="button"
            className="text-[0.95em] py-[0.8em] rounded-[2em] border-none outline-none bg-[#e6ffa1] text-[#19524c] uppercase font-extrabold tracking-[0.15em] mt-[0.8em] cursor-pointer transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_5px_15px_rgba(230,255,161,0.4)] w-full"
          >
            Login
          </button>
        </form>

        {/* --- PANDA DRAWING (100% Tailwind CSS) --- */}
        
        {/* Ears */}
        <div className="absolute top-[1.75em] left-[10.75em] bg-[#0d2b28] h-[2.5em] w-[2.81em] border-[0.18em] border-[#081a18] rounded-[2.5em_2.5em_0_0] rotate-[-38deg] z-[2]"></div>
        <div className="absolute top-[1.75em] right-[10.75em] bg-[#0d2b28] h-[2.5em] w-[2.81em] border-[0.18em] border-[#081a18] rounded-[2.5em_2.5em_0_0] rotate-[38deg] z-[2]"></div>
        
        {/* Face */}
        <div className="absolute top-[2em] left-0 right-0 mx-auto h-[7.5em] w-[8.4em] bg-white border-[0.18em] border-[#081a18] rounded-[7.5em_7.5em_5.62em_5.62em] z-[2]">
          
          {/* Blush */}
          <div className="absolute top-[4em] left-[1em] bg-[#e6ffa1] h-[1em] w-[1.37em] rounded-full rotate-[25deg] opacity-80"></div>
          <div className="absolute top-[4em] right-[1em] bg-[#e6ffa1] h-[1em] w-[1.37em] rounded-full rotate-[-25deg] opacity-80"></div>
          
          {/* Eyes */}
          <div className="absolute top-[2.18em] left-[1.37em] bg-[#0d2b28] h-[2.18em] w-[2em] rounded-[2em] rotate-[-20deg]">
            <div className="absolute h-[0.6em] w-[0.6em] bg-white rounded-full transition-all duration-[400ms] ease-out" style={eyeLeftStyle}></div>
          </div>
          <div className="absolute top-[2.18em] right-[1.37em] bg-[#0d2b28] h-[2.18em] w-[2em] rounded-[2em] rotate-[20deg]">
            <div className="absolute h-[0.6em] w-[0.6em] bg-white rounded-full transition-all duration-[400ms] ease-out" style={eyeRightStyle}></div>
          </div>

          {/* Nose */}
          <div className="absolute top-[4.37em] left-0 right-0 mx-auto h-[1em] w-[1em] bg-[#0d2b28] rounded-[1.2em_0_0_0.25em] rotate-[45deg]">
            <div className="absolute top-[0.75em] left-[1em] bg-[#0d2b28] h-[0.6em] w-[0.1em] rotate-[-45deg]"></div>
          </div>

          {/* Mouth */}
          <div className="absolute top-[5.31em] left-[3.12em] h-[0.75em] w-[0.93em] bg-transparent rounded-full" style={{ boxShadow: '0 0.18em #0d2b28' }}>
            <div className="absolute left-[0.87em] top-0 h-[0.75em] w-[0.93em] bg-transparent rounded-full" style={{ boxShadow: '0 0.18em #0d2b28' }}></div>
          </div>
        </div>
        
        {/* Hands */}
        <div className="absolute bg-[#0d2b28] w-[2.5em] border-[0.18em] border-[#081a18] rounded-[0.6em_0.6em_2.18em_2.18em] z-[3] transition-all duration-1000 ease-in-out" style={leftHandStyle}></div>
        <div className="absolute bg-[#0d2b28] w-[2.5em] border-[0.18em] border-[#081a18] rounded-[0.6em_0.6em_2.18em_2.18em] z-[3] transition-all duration-1000 ease-in-out" style={rightHandStyle}></div>
        
        {/* Paws */}
        <div className="absolute top-[26.56em] left-[10em] bg-[#0d2b28] h-[3.12em] w-[3.12em] border-[0.18em] border-[#081a18] rounded-[2.5em_2.5em_1.2em_1.2em] z-[2]">
          <div className="absolute top-[1.12em] left-[0.55em] bg-[#e6ffa1] h-[1.37em] w-[1.75em] rounded-[1.56em_1.56em_0.6em_0.6em]"></div>
          <div className="absolute top-[0.31em] left-[1.12em] bg-[#e6ffa1] h-[0.5em] w-[0.5em] rounded-full" style={{ boxShadow: '0.87em 0.37em #e6ffa1, -0.87em 0.37em #e6ffa1' }}></div>
        </div>
        <div className="absolute top-[26.56em] right-[10em] bg-[#0d2b28] h-[3.12em] w-[3.12em] border-[0.18em] border-[#081a18] rounded-[2.5em_2.5em_1.2em_1.2em] z-[2]">
          <div className="absolute top-[1.12em] left-[0.55em] bg-[#e6ffa1] h-[1.37em] w-[1.75em] rounded-[1.56em_1.56em_0.6em_0.6em]"></div>
          <div className="absolute top-[0.31em] left-[1.12em] bg-[#e6ffa1] h-[0.5em] w-[0.5em] rounded-full" style={{ boxShadow: '0.87em 0.37em #e6ffa1, -0.87em 0.37em #e6ffa1' }}></div>
        </div>
        
      </div>
    </div>
  );
};

export default PandaLogin;