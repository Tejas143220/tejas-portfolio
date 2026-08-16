import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle, FaLaptopCode, FaExpandAlt, FaCode } from 'react-icons/fa';
import { experienceData } from '../data/portfolioData';
import { soundFx } from '../utils/SoundEffects';

export default function Experience() {
  const [activePortalIdx, setActivePortalIdx] = useState(null);

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-black">
      {/* Background Radial Light */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-white/4 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaBriefcase className="w-3.5 h-3.5" />
            <span>Career Journey</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-slate-400 max-w-xl text-center mt-3 text-base sm:text-lg">
            Hands-on software engineering internship experience building full-stack Web applications, optimizing backend endpoints, and delivering robust tech features.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mt-4" />
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Bar */}
          <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-indigo-500 to-slate-800" />

          <div className="space-y-12">
            {experienceData.map((exp, index) => (
              <motion.div
                key={exp.role + index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col sm:flex-row items-start gap-6 group"
              >
                {/* Timeline Dot Icon */}
                <div className="hidden sm:flex shrink-0 w-16 h-16 rounded-2xl bg-slate-900 border border-cyan-500/50 shadow-lg shadow-cyan-500/20 items-center justify-center text-cyan-400 text-2xl z-10 group-hover:scale-110 transition-transform">
                  <FaLaptopCode />
                </div>

                {/* Main Experience Card */}
                <div className="flex-1 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/40 shadow-xl transition-all relative overflow-hidden">
                  
                  {/* Header Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-2">
                        {exp.type}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                        {exp.role}
                      </h3>
                      <h4 className="text-base font-semibold text-cyan-400 mt-1">
                        {exp.company}
                      </h4>
                    </div>

                    <div className="flex flex-col sm:items-end text-xs text-slate-400 gap-1 font-mono">
                      <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1 rounded-lg border border-slate-800">
                        <FaCalendarAlt className="text-cyan-400" /> {exp.duration}
                      </span>
                      <span className="flex items-center gap-1.5 mt-1">
                        <FaMapMarkerAlt className="text-slate-500" /> {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-3 mb-6 text-slate-300 text-sm sm:text-base leading-relaxed">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <FaCheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Portal Window Hover Trigger Button */}
                  <div className="mb-4">
                    <button
                      onClick={() => {
                        setActivePortalIdx(activePortalIdx === index ? null : index);
                        soundFx.playBeep();
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-2 transition-all"
                    >
                      <FaExpandAlt className="w-3 h-3 text-cyan-400" />
                      <span>{activePortalIdx === index ? 'Close Portal Metrics' : 'Open Architectural Portal Window'}</span>
                    </button>
                  </div>

                  {/* Glowing Portal Window Window */}
                  <AnimatePresence>
                    {activePortalIdx === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 p-4 rounded-2xl bg-slate-950 border border-cyan-500/40 shadow-2xl relative font-mono text-xs text-slate-300 space-y-2"
                      >
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                            <FaCode className="w-3.5 h-3.5" /> Portal Window: {exp.company}
                          </span>
                          <span className="text-[10px] text-slate-500">Live Telemetry</span>
                        </div>
                        <p className="text-slate-400 italic">
                          Architectural Highlights: Microservice endpoints optimized for multi-tenant ERP operations. Verified database schema indexing & sub-10ms queries.
                        </p>
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <div className="p-2 rounded bg-slate-900 border border-slate-800">
                            <span className="text-[10px] text-slate-500 block">Performance</span>
                            <span className="text-cyan-300 font-bold">100% Async Endpoints</span>
                          </div>
                          <div className="p-2 rounded bg-slate-900 border border-slate-800">
                            <span className="text-[10px] text-slate-500 block">Security</span>
                            <span className="text-emerald-400 font-bold">OAuth2 / JWT Secured</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Tech Stack Badges */}
                  <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold mr-2">Tech:</span>
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:border-cyan-500/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

