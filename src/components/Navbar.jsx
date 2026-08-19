import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes, FaFilePdf,
  FaPalette
} from 'react-icons/fa';
import { personalData } from '../data/portfolioData';
import LogoT from './LogoT';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const themes = [
  { id: 'pitchblack', name: 'Pitch Black Editorial', bg: 'bg-white', border: 'border-white' },
  { id: 'charcoal', name: 'Deep Charcoal', bg: 'bg-zinc-400', border: 'border-zinc-400' },
  { id: 'obsidian-ice', name: 'Obsidian Ice', bg: 'bg-sky-400', border: 'border-sky-400' },
  { id: 'emerald-mono', name: 'Monochrome Emerald', bg: 'bg-emerald-400', border: 'border-emerald-400' },
];

export default function Navbar({ onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentTheme, setCurrentTheme] = useState('pitchblack');
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeTheme = (themeId) => {
    setCurrentTheme(themeId);
    if (themeId === 'pitchblack') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeId);
    }
    setThemeMenuOpen(false);
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      setTimeout(() => {
        const top = elem.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: 'smooth' });
        setActiveSection(targetId);
      }, 50);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-cyan-950/10'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <LogoT className="w-10 h-10" />
            <span className="text-xl font-bold font-heading text-slate-100 group-hover:text-cyan-400 transition-colors">
              {personalData.shortName} <span className="text-cyan-400">Thakare</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-slate-800">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3.5 py-1.5 text-xs lg:text-sm font-medium transition-colors rounded-full ${
                    isActive ? 'text-cyan-400' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-cyan-500/10 rounded-full border border-cyan-500/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Action Buttons: Theme Selector & CV Preview */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Selector Palette */}
            <div className="relative">
              <button
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className="p-2 text-slate-400 hover:text-cyan-400 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 rounded-xl transition-all cursor-pointer"
                title="Change Theme Accent Color"
                aria-label="Theme Switcher"
              >
                <FaPalette className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {themeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 8 }}
                    className="absolute right-0 mt-2 w-44 glass-panel bg-slate-950/95 border border-slate-800 rounded-2xl p-2 shadow-2xl z-50 space-y-1"
                  >
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-2 py-1 block border-b border-slate-800">
                      Accent Theme
                    </span>
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => changeTheme(t.id)}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                          currentTheme === t.id
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-full ${t.bg}`} />
                        <span>{t.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resume Preview Modal Trigger */}
            <button
              onClick={onOpenResume}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-xl shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <FaFilePdf className="w-3.5 h-3.5" />
              <span>Preview CV</span>
            </button>
          </div>

          {/* Mobile Action Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-400 border border-cyan-500/30 rounded-lg bg-cyan-500/10 cursor-pointer"
            >
              <FaFilePdf className="w-3 h-3" />
              <span>CV</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-b border-slate-800 mt-2 px-4 py-6"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    activeSection === link.href.substring(1)
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}

              {/* Mobile Drawer Action Buttons */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenResume) onOpenResume();
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <FaFilePdf className="w-4 h-4" />
                  <span>Preview CV / Resume</span>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-around">
                <a
                  href={personalData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-sky-400 text-sm"
                >
                  <FaGithub className="w-5 h-5" /> GitHub
                </a>
                <a
                  href={personalData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-sky-400 text-sm"
                >
                  <FaLinkedin className="w-5 h-5" /> LinkedIn
                </a>
                <a
                  href={`mailto:${personalData.email}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-sky-400 text-sm"
                >
                  <FaEnvelope className="w-5 h-5" /> Email
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
