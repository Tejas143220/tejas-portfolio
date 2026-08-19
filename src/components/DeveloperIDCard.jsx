import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaQrcode, FaShieldAlt, FaClock, FaCheckCircle, FaExchangeAlt } from 'react-icons/fa';
import { personalData } from '../data/portfolioData';

export default function DeveloperIDCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [timeStr, setTimeStr] = useState('');
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    if (isFlipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX((-y / rect.height) * 18);
    setRotateY((x / rect.width) * 18);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="relative w-[280px] h-[280px] xs:w-72 xs:h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 perspective-1000 cursor-pointer group mx-auto"
      onClick={handleFlip}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Motion Container */}
      <motion.div
        animate={{
          rotateY: isFlipped ? 180 : rotateY,
          rotateX: isFlipped ? 0 : rotateX,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full relative rounded-3xl"
      >
        {/* ================= FRONT SIDE: Executive Engineering Identity Pass ================= */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className="absolute inset-0 w-full h-full rounded-3xl p-1 bg-gradient-to-br from-sky-400 via-slate-800 to-indigo-600 shadow-2xl shadow-sky-500/20 flex items-center justify-center overflow-hidden"
        >
          <div className="w-full h-full rounded-[23px] overflow-hidden bg-slate-950/95 relative flex flex-col justify-between p-5 select-none font-mono border border-slate-800/80">
            
            {/* Live Scrolling Code Matrix Overlay */}
            <div className="absolute inset-0 opacity-10 overflow-hidden text-[9px] text-sky-400 font-mono leading-none pointer-events-none select-none p-2 space-y-1">
              <motion.div
                animate={{ y: [0, -120] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                <div>def init_fastapi_app():</div>
                <div>  app = FastAPI(title="Tejas ERP Engine")</div>
                <div>  @app.get("/api/v1/health")</div>
                <div>  async def health(): return &#123;"status": "ONLINE"&#125;</div>
                <div>SELECT * FROM inventory WHERE status = 'RESERVED';</div>
                <div>class OdooERPModel(models.Model):</div>
                <div>  _name = 'flyash.brick.batch'</div>
                <div>def calculate_tonnes(units): return units * 0.0025</div>
              </motion.div>
            </div>

            {/* Ambient Background Matrix */}
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Subtle Laser Scan Line */}
            <motion.div
              animate={{ y: ['-100%', '350%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_12px_#38bdf8] z-20 opacity-75 pointer-events-none"
            />

            {/* Header Badge */}
            <div className="relative z-10 flex items-center justify-between border-b border-slate-800/90 pb-2.5">
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-sky-400 w-4 h-4" />
                <span className="text-[11px] font-bold tracking-wider text-slate-200 uppercase font-sans">
                  ENGINEERING PASS
                </span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-sky-400 font-semibold">
                VERIFIED // 2026
              </span>
            </div>

            {/* Center Monogram Avatar & Skills */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto">
              
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border border-slate-700/80 bg-slate-900/90 shadow-xl flex items-center justify-center group-hover:border-sky-400/80 transition-colors">
                
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-[-3px] rounded-2xl border border-dashed border-sky-500/30 pointer-events-none"
                />

                <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-sky-300 to-indigo-300 font-heading tracking-wider">
                  TT
                </div>
              </div>

              {/* Verified Tech Badges */}
              <div className="mt-3.5 flex flex-wrap justify-center gap-1.5 max-w-[250px] font-sans">
                <span className="px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-300 text-[10px] font-medium">
                  Python & FastAPI
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-indigo-300 text-[10px] font-medium">
                  Odoo 16 ERP
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-medium">
                  React & Next.js
                </span>
              </div>
            </div>

            {/* Tap to Flip Prompt */}
            <div className="relative z-10 glass-panel px-3 py-1.5 rounded-xl border border-slate-800 flex items-center justify-between text-[11px] text-slate-300 backdrop-blur-md">
              <span className="font-medium flex items-center gap-2 font-sans text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Tap to flip Executive ID
              </span>
              <FaExchangeAlt className="text-sky-400 group-hover:rotate-180 transition-transform duration-500" />
            </div>

          </div>
        </div>

        {/* ================= BACK SIDE: Executive Pass Credentials ================= */}
        <div
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className="absolute inset-0 w-full h-full rounded-3xl p-6 bg-slate-950/98 border border-sky-500/40 shadow-2xl shadow-sky-500/20 flex flex-col justify-between overflow-hidden font-mono text-left"
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-3 font-sans">
            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-sky-400 w-4 h-4" />
              <span className="text-xs font-bold tracking-wider text-slate-200 uppercase">
                EXECUTIVE CREDENTIALS
              </span>
            </div>
            <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 font-mono">
              ID-TT-2026
            </span>
          </div>

          {/* Details Body */}
          <div className="relative z-10 space-y-2.5 text-xs text-slate-300 my-auto">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Full Name</span>
              <span className="font-extrabold text-white text-base font-heading block">{personalData.name}</span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Security Level</span>
                <span className="text-cyan-400 font-semibold text-[11px] flex items-center gap-1">
                  <FaCheckCircle className="w-3 h-3 text-cyan-400" /> M.Sc. CS Postgraduate
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase block">Location Time (IST)</span>
                <span className="text-amber-400 font-mono font-bold flex items-center justify-end gap-1 text-[11px]">
                  <FaClock className="w-3 h-3" /> {timeStr || '19:20 IST'}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Availability Status</span>
              <span className="px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-semibold inline-block">
                🟢 Open to Software Engineer Roles
              </span>
            </div>
          </div>

          {/* Footer with QR Code */}
          <div className="relative z-10 pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400 text-[10px]">
              <FaQrcode className="w-7 h-7 text-cyan-400" />
              <div>
                <span className="block font-bold text-slate-300">Scan Profile</span>
                <span>{personalData.github.replace(/^https?:\/\//, '')}</span>
              </div>
            </div>

            <span className="text-[10px] text-cyan-400 underline">Tap to flip</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
