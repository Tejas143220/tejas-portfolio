import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGithub, FaExternalLinkAlt, FaLayerGroup } from 'react-icons/fa';
import SystemArchitectureBlueprint from './SystemArchitectureBlueprint';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

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
          className="relative w-full max-w-4xl glass-panel bg-slate-900/95 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white bg-slate-950/60 hover:bg-slate-800 rounded-full border border-slate-700 transition-colors cursor-pointer"
            aria-label="Close Project Modal"
          >
            <FaTimes className="w-5 h-5" />
          </button>

          {/* Project Image Banner */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            
            <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 text-xs font-semibold text-cyan-300 bg-cyan-500/20 border border-cyan-500/40 rounded-full">
                {project.category}
              </span>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-3">
              {project.title}
            </h3>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              {project.detailedDescription}
            </p>

            {/* Tech Stack Badges */}
            <div className="mb-6">
              <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3 flex items-center gap-2">
                <FaLayerGroup className="text-cyan-400" /> Key Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-slate-800/90 border border-slate-700 rounded-xl"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive System Architecture Flow Blueprint */}
            <SystemArchitectureBlueprint />

            {/* Modal Action Footer Links */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-4">
              {project.liveUrl && project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-lg shadow-cyan-500/20 transition-all text-sm"
                >
                  <FaExternalLinkAlt className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-200 glass-card hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/40 transition-all text-sm"
                >
                  <FaGithub className="w-4 h-4 text-cyan-400" />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
