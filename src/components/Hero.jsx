import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload, FaArrowRight, FaCode, FaServer, FaDatabase, FaTerminal, FaFilePdf, FaProjectDiagram, FaNetworkWired } from 'react-icons/fa';
import { personalData } from '../data/portfolioData';
import DeveloperIDCard from './DeveloperIDCard';
import { soundFx } from '../utils/SoundEffects';

const roles = [
  "Python & Full Stack Developer",
  "FastAPI & REST API Specialist",
  "ERP Systems Engineer (Odoo 16)",
  "Postgraduate Computer Scientist"
];

export default function Hero({ onOpenResume, onOpenTerminal, onOpenSandbox, onOpenApiWorkbench }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const updateSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        if (displayedText.length - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, updateSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-black">
      {/* Refined Pitch-Black Ambient Radial Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-white/4 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-zinc-400/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* ================= EDITORIAL AWWWARDS MOBILE HERO VIEW (Visible on Mobile) ================= */}
        <div className="block md:hidden text-left space-y-6 pt-4">
          
          {/* Top Metadata Line */}
          <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-slate-400 uppercase border-b border-slate-800/80 pb-3">
            <span>PYTHON & WEB DEVELOPER</span>
            <span>BASED IN NASHIK, INDIA</span>
          </div>

          {/* Justified Narrative Snippet */}
          <p className="text-xs text-slate-300 uppercase tracking-wider leading-relaxed text-justify border-b border-slate-800/80 pb-5 font-mono">
            MOTIVATED COMPUTER SCIENCE POSTGRADUATE SKILLED IN PYTHON DEVELOPMENT, ENTERPRISE ERP SYSTEMS (ODOO 16 & FLY ASH BRICKS ERP), FASTAPI REST APIs, REACT.JS, NEXT.JS, AND POSTGRESQL DATABASE MANAGEMENT.
          </p>

          {/* Giant Editorial Title */}
          <div className="py-2">
            <h1 className="text-4xl xs:text-5xl font-black tracking-tighter text-slate-100 uppercase font-heading leading-tight">
              TEJAS THAKARE <span className="text-gradient font-black">. PYTHON & WEB DEVELOPER .</span>
            </h1>
          </div>

          {/* Editorial Social Text Bar */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-300 font-semibold border-t border-b border-slate-800/80 py-3">
            <a href={personalData.github} target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors">GitHub</a>
            <a href={personalData.linkedin} target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors">LinkedIn</a>
            <a href={`mailto:${personalData.email}`} className="hover:text-sky-400 transition-colors">Email</a>
            <button onClick={onOpenResume} className="hover:text-sky-400 transition-colors cursor-pointer">Resume</button>
          </div>

          {/* Mobile Action Buttons Bar */}
          <div className="pt-2">
            <button
              onClick={() => onOpenResume && onOpenResume()}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-black text-xs font-mono flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              <FaFilePdf className="w-4 h-4" />
              <span>Preview Resume</span>
            </button>
          </div>

          {/* Embedded Developer Pass Card Frame */}
          <div className="pt-4">
            <div className="glass-panel p-2 sm:p-4 rounded-3xl border border-slate-800/80 shadow-2xl bg-slate-950/80 backdrop-blur-xl">
              <DeveloperIDCard />
            </div>
          </div>

        </div>

        {/* ================= DESKTOP HERO VIEW (Visible on MD screens and above) ================= */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Executive Status Chip */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-sky-400 text-[11px] sm:text-xs font-semibold mb-6 backdrop-blur-md max-w-full shadow-lg shadow-sky-950/20">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              <span className="truncate text-slate-200">M.Sc. CS Postgraduate <span className="text-slate-500">|</span> Open for Python & Web Developer Roles</span>
            </div>

            {/* Main Greeting */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-3 leading-[1.12]">
              Hi, I am{' '}
              <span className="text-gradient">
                Tejas Thakare
              </span>
            </h1>

            {/* Subtitle / Animated Typewriter Role */}
            <h2 className="text-base sm:text-2xl font-semibold text-sky-400 mb-6 h-9 sm:h-10 flex items-center font-mono">
              <span>{displayedText}</span>
              <span className="w-1.5 sm:w-2 h-5 sm:h-6 bg-sky-400 ml-1 animate-pulse" />
            </h2>

            {/* Bio Summary */}
            <p className="text-sm sm:text-lg text-slate-400 mb-8 max-w-2xl leading-relaxed">
              Motivated Computer Science postgraduate with hands-on experience in Python development, enterprise ERP systems (Odoo 16 & Fly Ash Bricks ERP), FastAPI REST backend services, React.js, Next.js, and PostgreSQL database management.
            </p>

            {/* Call To Action (CTA) Buttons */}
            <div className="flex flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-8 w-full sm:w-auto">
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 shadow-xl shadow-sky-500/20 hover:shadow-sky-500/30 transition-all text-sm sm:text-base text-center cursor-pointer"
              >
                <span>View Enterprise Work</span>
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>



              <button
                onClick={() => {
                  onOpenResume();
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 rounded-xl font-semibold text-slate-200 glass-card hover:bg-slate-800/80 hover:text-white border border-slate-800 hover:border-sky-500/40 transition-all text-xs sm:text-sm text-center cursor-pointer"
              >
                <FaFilePdf className="w-4 h-4 text-sky-400" />
                <span>Preview Resume</span>
              </button>

              <button
                onClick={() => {
                  onOpenSandbox && onOpenSandbox();
                }}
                className="px-4 py-3 sm:py-3.5 rounded-xl font-medium text-slate-400 hover:text-sky-300 bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-center gap-2 text-xs text-center cursor-pointer"
                title="Launch Anti-Gravity Tech Sandbox"
              >
                <FaProjectDiagram />
                <span>Physics Sandbox</span>
              </button>
            </div>

            {/* Social Icons Bar */}
            <div className="flex items-center gap-4 sm:gap-6 pt-6 border-t border-slate-800/80 w-full">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold font-mono">Connect:</span>
              <div className="flex items-center gap-3">
                <a
                  href={personalData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-slate-400 hover:text-sky-400 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/30 rounded-xl transition-all hover:scale-105"
                  aria-label="GitHub Profile"
                >
                  <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href={personalData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-slate-400 hover:text-sky-400 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/30 rounded-xl transition-all hover:scale-105"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href={`mailto:${personalData.email}`}
                  className="p-2.5 text-slate-400 hover:text-sky-400 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/30 rounded-xl transition-all hover:scale-105"
                  aria-label="Email Me"
                >
                  <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Visual Column: Holographic 3D Developer ID Card Flip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            <DeveloperIDCard />
          </motion.div>

        </div>
      </div>
    </section>
  );
}


