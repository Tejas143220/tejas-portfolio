import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaPython, FaPhp,
  FaGithub, FaGitlab, FaDocker, FaDatabase, FaCode, FaServer, FaTools, FaNetworkWired, FaCogs, FaSearch
} from 'react-icons/fa';
import {
  SiTailwindcss, SiTypescript, SiNextdotjs, SiExpress, SiBootstrap, SiFastapi,
  SiMongodb, SiPostgresql, SiMysql, SiRedis, SiPostman, SiVercel, SiFramer, SiGraphql
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';
import { skillsCategories } from '../data/portfolioData';
import TiltCard from './TiltCard';

// Map icon string names to actual react-icons components
const iconMap = {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaPython, FaPhp,
  FaGithub, FaGitlab, FaDocker, FaDatabase, FaCode, FaServer, FaTools, FaNetworkWired, FaCogs,
  SiTailwindcss, SiTypescript, SiNextdotjs, SiExpress, SiBootstrap, SiFastapi,
  SiMongodb, SiPostgresql, SiMysql, SiRedis, SiPostman, SiVercel, SiFramer, SiGraphql,
  SiVisualstudiocode: VscCode,
  VscCode
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = skillsCategories
    .filter(cat => activeTab === 'all' || cat.id === activeTab)
    .map(cat => {
      if (!searchQuery.trim()) return cat;
      const matchingSkills = cat.skills.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.level.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return { ...cat, skills: matchingSkills };
    })
    .filter(cat => cat.skills.length > 0);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background Radial Light */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaCode className="w-3.5 h-3.5" />
            <span>Tech Stack & Tools</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-slate-400 max-w-xl text-center mt-3 text-base sm:text-lg">
            A comprehensive overview of my technical capabilities across Python development, FastAPI, front-end frameworks, PostgreSQL databases, and ERP tools.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full mt-4" />
        </div>

        {/* Editorial Mobile Skills Marquee Block (Visible on Mobile) */}
        <div className="block md:hidden bg-slate-950/80 p-6 rounded-3xl border border-slate-800 my-8 text-center space-y-4 font-mono">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block text-left border-b border-slate-800/80 pb-2">
            SKILLS ▸
          </span>
          <div className="text-xl xs:text-2xl font-black text-slate-200 uppercase leading-snug tracking-tight">
            PYTHON <span className="text-sky-400">—</span> FASTAPI & REST APIs <span className="text-sky-400">—</span> ODOO 16 ERP <span className="text-sky-400">—</span> REACT.JS & NEXT.JS <span className="text-sky-400">—</span> POSTGRESQL <span className="text-sky-400">—</span> SYSTEM ARCHITECTURE
          </div>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills (e.g. FastAPI, PostgreSQL, React)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition-colors text-sm shadow-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                : 'glass-card text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            All Skills
          </button>
          {skillsCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === cat.id
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                  : 'glass-card text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Categories Grid with 3D Tilt */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            No matching skills found for "{searchQuery}".
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCategories.map((category, catIdx) => (
              <TiltCard key={category.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                  className="glass-panel p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-800 relative overflow-hidden h-full"
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-lg sm:text-xl shrink-0">
                      {category.id === 'languages' && <FaCode />}
                      {category.id === 'frontend' && <FaReact />}
                      {category.id === 'backend' && <FaServer />}
                      {category.id === 'databases' && <FaDatabase />}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-100 font-heading">
                        {category.category}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-400">{category.description}</p>
                    </div>
                  </div>

                  {/* Skills Badges Grid with Liquid Laser Progress Rings */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    {category.skills.map((skill) => {
                      const IconComp = iconMap[skill.icon] || FaCode;
                      const percent = skill.level === 'Advanced' ? 92 : 82;
                      const strokeDash = (percent / 100) * 113; // circumference 2*pi*18 ~= 113

                      return (
                        <motion.div
                          key={skill.name}
                          whileHover={{ scale: 1.03, y: -2 }}
                          className="glass-card p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 flex items-center justify-between gap-2.5 transition-colors group"
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <div className="text-cyan-400 group-hover:text-cyan-300 text-lg sm:text-xl shrink-0 transition-colors p-1.5 sm:p-2 bg-slate-900 rounded-xl border border-slate-800">
                              <IconComp />
                            </div>
                            <div className="truncate">
                              <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white block truncate">
                                {skill.name}
                              </span>
                              <span className="text-[9px] sm:text-[10px] text-cyan-400 uppercase tracking-wider block font-mono">
                                {skill.level}
                              </span>
                            </div>
                          </div>

                          {/* SVG Liquid Laser Progress Ring */}
                          <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 40 40">
                              <circle
                                cx="20"
                                cy="20"
                                r="18"
                                stroke="#1e293b"
                                strokeWidth="3.5"
                                fill="transparent"
                              />
                              <motion.circle
                                cx="20"
                                cy="20"
                                r="18"
                                stroke="url(#cyanGradient)"
                                strokeWidth="3.5"
                                fill="transparent"
                                strokeDasharray="113"
                                initial={{ strokeDashoffset: 113 }}
                                whileInView={{ strokeDashoffset: 113 - strokeDash }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: 'easeOut' }}
                                strokeLinecap="round"
                              />
                              <defs>
                                <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#22d3ee" />
                                  <stop offset="100%" stopColor="#818cf8" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <span className="absolute text-[9px] font-mono font-bold text-slate-300">
                              {percent}%
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}


