import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub, FaLinkedin, FaEnvelope, FaArrowRight,
  FaFilePdf
} from 'react-icons/fa';
import { personalData } from '../data/portfolioData';
import DeveloperIDCard from './DeveloperIDCard';

const roles = [
  "Python & Full Stack Developer",
  "FastAPI & REST API Specialist",
  "ERP Systems Engineer (Odoo 16)",
  "Postgraduate Computer Scientist"
];

export default function Hero({ onOpenResume }) {
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

  const scrollToProjects = (e) => {
    e.preventDefault();
    const elem = document.getElementById('projects');
    if (elem) {
      const top = elem.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden bg-black">
      {/* Refined Ambient Background Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-sky-500/10 rounded-full blur-[120px] sm:blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-4 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-indigo-500/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Main Hero Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Main Title */}
            <h1 className="text-3xl xs:text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-3 leading-[1.15]">
              Hi, I am{' '}
              <span className="text-gradient block sm:inline">
                Tejas Thakare
              </span>
            </h1>

            {/* Typewriter Subtitle */}
            <h2 className="text-sm xs:text-base sm:text-2xl font-semibold text-sky-400 mb-5 h-8 sm:h-10 flex items-center font-mono justify-center lg:justify-start">
              <span>{displayedText}</span>
              <span className="w-1.5 sm:w-2 h-4 sm:h-6 bg-sky-400 ml-1 animate-pulse" />
            </h2>

            {/* Narrative Summary */}
            <p className="text-xs sm:text-base text-slate-300 mb-7 max-w-xl sm:max-w-2xl leading-relaxed text-center lg:text-left">
              Motivated Computer Science postgraduate with hands-on expertise in Python development, enterprise ERP systems (Odoo 16 & Fly Ash Bricks ERP), FastAPI REST services, React.js, Next.js, and PostgreSQL database management.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-8">
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-lg shadow-cyan-500/25 transition-all text-sm text-center cursor-pointer active:scale-95"
              >
                <span>Explore Work</span>
                <FaArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onOpenResume}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-200 glass-card hover:bg-slate-800/80 hover:text-white border border-slate-800 hover:border-sky-500/40 transition-all text-sm text-center cursor-pointer active:scale-95"
              >
                <FaFilePdf className="w-4 h-4 text-sky-400" />
                <span>Preview Resume</span>
              </button>
            </div>

            {/* Social Links Bar */}
            <div className="flex items-center gap-4 pt-5 border-t border-slate-800/80 w-full justify-center lg:justify-start">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold font-mono">Connect:</span>
              <div className="flex items-center gap-3">
                <a
                  href={personalData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-slate-400 hover:text-sky-400 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/30 rounded-xl transition-all hover:scale-105"
                  aria-label="GitHub Profile"
                >
                  <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href={personalData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-slate-400 hover:text-sky-400 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/30 rounded-xl transition-all hover:scale-105"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href={`mailto:${personalData.email}`}
                  className="p-2.5 text-slate-400 hover:text-sky-400 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/30 rounded-xl transition-all hover:scale-105"
                  aria-label="Email Me"
                >
                  <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Visual Column: Holographic Developer Pass Card (Visible only on Desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="hidden lg:flex lg:col-span-5 justify-center items-center relative mt-4 lg:mt-0"
          >
            <DeveloperIDCard />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
