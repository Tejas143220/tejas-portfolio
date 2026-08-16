import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter, FaArrowUp } from 'react-icons/fa';
import { personalData } from '../data/portfolioData';

import LogoT from './LogoT';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-black py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <LogoT className="w-9 h-9" />
            <div>
              <span className="text-lg font-bold text-white font-heading block">
                {personalData.name}
              </span>
              <span className="text-xs text-slate-400">
                {personalData.title}
              </span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-slate-400 hover:text-cyan-400 bg-slate-900 border border-slate-800 hover:border-cyan-500/30 rounded-xl transition-all"
              aria-label="GitHub"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href={personalData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-slate-400 hover:text-cyan-400 bg-slate-900 border border-slate-800 hover:border-cyan-500/30 rounded-xl transition-all"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personalData.email}`}
              className="p-2.5 text-slate-400 hover:text-cyan-400 bg-slate-900 border border-slate-800 hover:border-cyan-500/30 rounded-xl transition-all"
              aria-label="Email"
            >
              <FaEnvelope className="w-4 h-4" />
            </a>
            <a
              href={personalData.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-slate-400 hover:text-cyan-400 bg-slate-900 border border-slate-800 hover:border-cyan-500/30 rounded-xl transition-all"
              aria-label="Twitter"
            >
              <FaTwitter className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright & Back To Top */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500">
              © {new Date().getFullYear()} {personalData.name}. All rights reserved.
            </span>

            <button
              onClick={scrollToTop}
              className="p-2.5 bg-slate-900 hover:bg-cyan-500 text-slate-400 hover:text-slate-950 border border-slate-800 rounded-xl transition-all"
              aria-label="Back to top"
            >
              <FaArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
