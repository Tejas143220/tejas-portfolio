import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt, FaAward, FaBuilding } from 'react-icons/fa';
import { educationData } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden bg-black">
      {/* Background Radial Light */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-white/4 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaGraduationCap className="w-4 h-4" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            My <span className="text-gradient">Education</span>
          </h2>
          <p className="text-slate-400 max-w-xl text-center mt-3 text-base sm:text-lg">
            Strong academic foundation in Computer Science & Engineering with distinction across school and university programs.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mt-4" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/40 shadow-xl flex flex-col justify-between relative group"
            >
              <div>
                {/* Degree Header */}
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xl mb-6 group-hover:scale-110 transition-transform">
                  <FaGraduationCap />
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                  <FaCalendarAlt />
                  <span>{edu.duration}</span>
                </div>

                <h3 className="text-xl font-bold text-white font-heading mb-3 line-clamp-2">
                  {edu.degree}
                </h3>

                <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2 mb-4">
                  <FaBuilding className="text-slate-500 shrink-0" />
                  <span className="truncate">{edu.institution}</span>
                </h4>

                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {edu.details}
                </p>
              </div>

              {/* Grade Badge Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Result:</span>
                <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                  <FaAward className="text-cyan-400" />
                  {edu.grade}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
