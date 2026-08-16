import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaUser, FaCode, FaFolderOpen, FaFilePdf } from 'react-icons/fa';

const mobileNavItems = [
  { id: 'home', label: 'Home', icon: FaHome, type: 'scroll' },
  { id: 'about', label: 'About', icon: FaUser, type: 'scroll' },
  { id: 'skills', label: 'Skills', icon: FaCode, type: 'scroll' },
  { id: 'projects', label: 'Projects', icon: FaFolderOpen, type: 'scroll' },
  { id: 'resume', label: 'CV', icon: FaFilePdf, type: 'action' },
];

export default function MobileBottomDock({ onOpenResume, onOpenSandbox }) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const elem = document.getElementById(sections[i]);
        if (elem && elem.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, item) => {
    e.preventDefault();
    if (item.type === 'action') {
      if (item.id === 'resume' && onOpenResume) onOpenResume();
      if (item.id === 'sandbox' && onOpenSandbox) onOpenSandbox();
    } else {
      const elem = document.getElementById(item.id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 md:hidden w-[95%] max-w-sm pointer-events-auto select-none">
      {/* Floating Cyber Glass Dock */}
      <div className="bg-slate-950/95 backdrop-blur-xl border border-zinc-800 rounded-2xl p-1.5 shadow-2xl shadow-black flex items-center justify-around relative overflow-hidden font-mono">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-zinc-500/5 to-white/5 pointer-events-none" />

        {mobileNavItems.map((item) => {
          const IconComp = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={(e) => handleNavClick(e, item)}
              className="relative p-2 rounded-xl flex flex-col items-center justify-center transition-all group cursor-pointer"
            >
              {/* Active Indicator Backdrop */}
              {isActive && item.type === 'scroll' && (
                <motion.div
                  layoutId="mobileActiveDock"
                  className="absolute inset-0 bg-white/10 rounded-xl border border-white/20"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              <IconComp
                className={`w-4 h-4 relative z-10 transition-transform group-hover:scale-110 ${
                  isActive && item.type === 'scroll' ? 'text-white font-bold' : 'text-slate-400 group-hover:text-slate-200'
                }`}
              />

              <span
                className={`text-[9px] font-mono font-medium mt-0.5 relative z-10 transition-colors ${
                  isActive && item.type === 'scroll' ? 'text-white font-bold' : 'text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
