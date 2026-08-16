import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaFileDownload, FaExternalLinkAlt, FaFilePdf } from 'react-icons/fa';
import { personalData } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 my-6 flex flex-col h-[85vh]"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <FaFilePdf className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-heading">
                  Tejas Thakare — Resume Preview
                </h3>
                <span className="text-xs text-slate-400">TEJAS_THAKARE_R.pdf</span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={personalData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-800 hover:border-sky-400 rounded-xl transition-all"
                title="Open PDF in new browser tab"
              >
                <FaExternalLinkAlt className="w-3.5 h-3.5 text-sky-400" />
                <span>Open PDF</span>
              </a>

              <a
                href={personalData.resumeUrl}
                download="TEJAS_THAKARE_R.pdf"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 rounded-xl shadow-md transition-all font-mono"
              >
                <FaFileDownload /> Download
              </a>

              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Embedded Viewer Body */}
          <div className="flex-1 bg-slate-950 p-2 sm:p-4 overflow-hidden relative flex flex-col">
            <iframe
              src={`${personalData.resumeUrl}#toolbar=0`}
              title="Resume Preview"
              className="w-full flex-1 rounded-2xl border border-slate-800 bg-white"
            />
          </div>

          {/* Footer CTA Mobile */}
          <div className="sm:hidden p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <a
              href={personalData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 inline-flex items-center justify-center gap-2 text-xs font-bold text-slate-200 bg-slate-900 border border-slate-800 rounded-xl"
            >
              <FaExternalLinkAlt /> Open PDF Tab
            </a>
            <a
              href={personalData.resumeUrl}
              download="TEJAS_THAKARE_R.pdf"
              className="flex-1 py-3 inline-flex items-center justify-center gap-2 text-xs font-bold text-slate-950 bg-sky-400 rounded-xl shadow-lg"
            >
              <FaFileDownload /> Download PDF
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
