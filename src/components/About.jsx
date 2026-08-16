import React from 'react';
import { motion } from 'framer-motion';
import { FaUserAstronaut, FaLightbulb, FaCertificate, FaLanguage, FaExternalLinkAlt } from 'react-icons/fa';
import { personalData } from '../data/portfolioData';
import StatsCounter from './StatsCounter';

export default function About({ onOpenCert }) {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-black">
      {/* Subtle Glow Background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-white/4 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaUserAstronaut className="w-3.5 h-3.5" />
            <span>Get To Know Me</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full mt-4" />
        </div>

        {/* Animated Stats Counter Block */}
        <StatsCounter />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
          
          {/* Left Column: Story & Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div className="glass-panel p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-slate-800 shadow-xl relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-4 flex items-center gap-2.5 font-heading">
                <FaLightbulb className="text-cyan-400 w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                <span>Engineered for Problem Solving</span>
              </h3>

              {personalData.aboutNarrative.map((paragraph, idx) => (
                <p key={idx} className="text-slate-300 text-sm sm:text-lg leading-relaxed mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}

              {/* Spoken Languages & Highlights */}
              <div className="mt-6 pt-5 border-t border-slate-800">
                <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3 flex items-center gap-2">
                  <FaLanguage className="text-cyan-400 w-4 h-4" /> Languages Spoken
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {personalData.spokenLanguages.map((lang) => (
                    <span
                      key={lang.language}
                      className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200"
                    >
                      <span className="text-cyan-400">{lang.language}</span> ({lang.proficiency})
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications Block */}
            <div className="glass-panel p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-800 shadow-xl">
              <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center justify-between font-heading">
                <div className="flex items-center gap-3">
                  <FaCertificate className="text-cyan-400 w-5 h-5" />
                  <span>Certifications</span>
                </div>
                <span className="text-xs text-cyan-400 font-normal">Click card to verify</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {personalData.certifications.map((cert) => (
                  <motion.button
                    key={cert.title}
                    whileHover={{ scale: 1.03, y: -2 }}
                    onClick={() => onOpenCert && onOpenCert(cert)}
                    className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors truncate">
                        {cert.title}
                      </span>
                      <FaExternalLinkAlt className="w-2.5 h-2.5 text-slate-500 group-hover:text-cyan-400 shrink-0" />
                    </div>
                    <span className="text-[11px] text-cyan-400 block">{cert.issuer}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Soft Skills & Core Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 grid grid-cols-1 gap-4"
          >
            {personalData.softSkills.map((skill, index) => (
              <motion.div
                key={skill.title}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-lg shrink-0">
                  0{index + 1}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-100 mb-1 font-heading">
                    {skill.title}
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {skill.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

