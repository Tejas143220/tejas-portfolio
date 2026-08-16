import React from 'react';

export default function LogoT({ className = "w-10 h-10" }) {
  return (
    <div className={`relative flex items-center justify-center group ${className}`}>
      {/* Outer Glow Halo */}
      <div className="absolute inset-0 rounded-xl bg-cyan-500/30 blur-md group-hover:bg-cyan-400/50 transition-all duration-500" />
      
      {/* Main Logo Container */}
      <div className="relative w-full h-full rounded-xl bg-slate-950 border border-cyan-500/40 p-2 flex items-center justify-center shadow-xl group-hover:border-cyan-400 transition-colors">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="tGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Futuristic 'T' Crossbar */}
          <path
            d="M 12 22 H 88 C 91 22, 93 24, 93 27 V 34 C 93 37, 91 39, 88 39 H 12 C 9 39, 7 37, 7 34 V 27 C 7 24, 9 22, 12 22 Z"
            fill="url(#tGradient)"
            filter="url(#neonGlow)"
          />

          {/* Futuristic 'T' Vertical Stem */}
          <path
            d="M 38 39 H 62 V 77 C 62 82, 58 86, 53 86 H 47 C 42 86, 38 82, 38 77 V 39 Z"
            fill="url(#tGradient)"
            filter="url(#neonGlow)"
          />

          {/* Center Tech Circuit Dot */}
          <circle cx="50" cy="30.5" r="4" fill="#ffffff" />
        </svg>
      </div>
    </div>
  );
}
