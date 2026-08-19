import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaFileDownload, FaExternalLinkAlt, FaFilePdf, FaArrowLeft } from 'react-icons/fa';
import { personalData } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    // Push a dummy history state so mobile back button closes the modal instead of exiting the website
    window.history.pushState({ modal: 'resume' }, '');

    const handlePopState = () => {
      onClose();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClose = () => {
    // If the modal was opened with history state, go back cleanly or just trigger onClose
    if (window.history.state && window.history.state.modal === 'resume') {
      window.history.back();
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-4 sm:my-6 flex flex-col h-[90vh] sm:h-[85vh]"
        >
          {/* Header */}
          <div className="p-3.5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              {/* Mobile Quick Back Button */}
              <button
                onClick={handleClose}
                className="flex sm:hidden p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl cursor-pointer"
                title="Back to Website"
                aria-label="Back to Website"
              >
                <FaArrowLeft className="w-4 h-4 text-sky-400" />
              </button>

              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <FaFilePdf className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="truncate">
                <h3 className="text-sm sm:text-lg font-bold text-white font-heading truncate">
                  Tejas Thakare — Resume
                </h3>
                <span className="text-[10px] sm:text-xs text-slate-400 block truncate font-mono">TEJAS_THAKARE_R.pdf</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={personalData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-800 hover:border-sky-400 rounded-xl transition-all"
                title="Open PDF in new browser tab"
              >
                <FaExternalLinkAlt className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">Open PDF Tab</span>
                <span className="sm:hidden">PDF</span>
              </a>

              <a
                href={personalData.resumeUrl}
                download="TEJAS_THAKARE_R.pdf"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 rounded-xl shadow-md transition-all font-mono"
              >
                <FaFileDownload /> Download
              </a>

              <button
                onClick={handleClose}
                className="hidden sm:flex p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Embedded Viewer Body */}
          <div className="flex-1 bg-slate-950 p-1.5 sm:p-4 overflow-hidden relative flex flex-col">
            <iframe
              src={`${personalData.resumeUrl}#toolbar=0`}
              title="Resume Preview"
              className="w-full flex-1 rounded-xl sm:rounded-2xl border border-slate-800 bg-white"
            />
          </div>

          {/* Mobile Footer Actions Bar */}
          <div className="sm:hidden p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <button
              onClick={handleClose}
              className="flex-1 py-2.5 inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 rounded-xl cursor-pointer"
            >
              <FaArrowLeft className="w-3.5 h-3.5 text-sky-400" /> Back to Website
            </button>

            <a
              href={personalData.resumeUrl}
              download="TEJAS_THAKARE_R.pdf"
              className="flex-1 py-2.5 inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl shadow-lg"
            >
              <FaFileDownload className="w-3.5 h-3.5" /> Download PDF
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
