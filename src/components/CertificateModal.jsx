import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaAward, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

export default function CertificateModal({ cert, onClose }) {
  if (!cert) return null;

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
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg glass-panel bg-slate-900/95 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-950/60 rounded-full border border-slate-800 transition-colors cursor-pointer"
          >
            <FaTimes className="w-4 h-4" />
          </button>

          {/* Certificate Header Badge */}
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-3xl mb-6">
            <FaAward />
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <FaCalendarAlt />
            <span>Issued: {cert.date || '2023'}</span>
          </div>

          <h3 className="text-2xl font-extrabold text-white font-heading mb-2">
            {cert.title}
          </h3>

          <h4 className="text-sm font-semibold text-cyan-300 mb-4">
            {cert.issuer}
          </h4>

          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            {cert.description || 'Verified course completion demonstrating core mastery and hands-on practical application.'}
          </p>

          {/* Skills Breakdown */}
          {cert.skills && cert.skills.length > 0 && (
            <div className="mb-6 pt-4 border-t border-slate-800">
              <h5 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
                Key Competencies Certified:
              </h5>
              <div className="flex flex-wrap gap-2">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-lg flex items-center gap-1.5"
                  >
                    <FaCheckCircle className="text-cyan-400 w-3 h-3" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-xs transition-all cursor-pointer"
            >
              Done Viewing
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
