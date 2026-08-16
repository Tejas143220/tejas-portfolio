import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronRight, FaChevronLeft, FaHome, FaUser, FaCode, FaBriefcase, FaGraduationCap, FaFolderOpen, FaEnvelope } from 'react-icons/fa';
import { soundFx } from '../utils/SoundEffects';

const dockItems = [
  { id: 'home', label: 'Home', icon: FaHome },
  { id: 'about', label: 'About', icon: FaUser },
  { id: 'skills', label: 'Skills', icon: FaCode },
  { id: 'experience', label: 'Experience', icon: FaBriefcase },
  { id: 'education', label: 'Education', icon: FaGraduationCap },
  { id: 'projects', label: 'Projects', icon: FaFolderOpen },
  { id: 'contact', label: 'Contact', icon: FaEnvelope },
];

export default function RightNavDock() {
  const [activeSection, setActiveSection] = useState('home');
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (let i = dockItems.length - 1; i >= 0; i--) {
        const elem = document.getElementById(dockItems[i].id);
        if (elem && elem.offsetTop <= scrollPos) {
          setActiveSection(dockItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3 pointer-events-auto">
      {/* Dock Container */}
      <motion.div
        animate={{ width: collapsed ? 44 : 'auto' }}
        className="glass-panel p-2 rounded-2xl border border-slate-800 shadow-2xl bg-slate-950/85 backdrop-blur-md flex flex-col items-center gap-3 relative overflow-hidden"
      >
        {/* Toggle Collapse Button */}
        <button
          onClick={() => {
            setCollapsed(!collapsed);
            soundFx.playClick();
          }}
          className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors border border-slate-800/80 mb-1"
          title={collapsed ? "Expand Quick Nav" : "Collapse Quick Nav"}
          aria-label="Toggle Navigation Dock"
        >
          {collapsed ? <FaChevronLeft className="w-3.5 h-3.5" /> : <FaChevronRight className="w-3.5 h-3.5" />}
        </button>

        {/* Section Indicators */}
        <div className="flex flex-col gap-3">
          {dockItems.map((item) => {
            const isActive = activeSection === item.id;
            const IconComp = item.icon;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => soundFx.playClick()}
                className="relative flex items-center group focus:outline-none"
              >
                {/* Hover Label Tooltip */}
                <AnimatePresence>
                  {!collapsed && (
                    <span className="absolute right-10 px-3 py-1 rounded-xl glass-panel bg-slate-950/95 border border-slate-800 text-xs font-semibold text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
                      {item.label}
                    </span>
                  )}
                </AnimatePresence>

                {/* Dot & Icon Container */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/30 scale-110'
                      : 'bg-slate-900/80 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 border border-slate-800/80'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                </div>
              </a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
