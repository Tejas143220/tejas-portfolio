import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaGithub, FaExternalLinkAlt, FaArrowRight, FaSearch } from 'react-icons/fa';
import { projectsData } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import TiltCard from './TiltCard';

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ['All', 'ERP Systems', 'Full Stack', 'Frontend'];

  const filteredProjects = projectsData.filter((p) => {
    const matchesCategory = selectedFilter === 'All' || p.category === selectedFilter;
    if (!searchQuery.trim()) return matchesCategory;

    const q = searchQuery.toLowerCase();
    const matchesQuery =
      p.title.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.detailedDescription.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesQuery;
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-black">
      {/* Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/4 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaLaptopCode className="w-4 h-4" />
            <span>Featured Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Academic & Personal <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-slate-400 max-w-xl text-center mt-3 text-base sm:text-lg">
            A selection of software applications I have built ranging from cloud data systems and analytics dashboards to full-stack MERN portals and WebSocket chat servers.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mt-4" />
        </div>

        {/* Live Search Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by title, tag, or framework..."
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

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                  : 'glass-card text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects CSS Grid with 3D Tilt */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            No matching projects found for "{searchQuery}".
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <TiltCard key={project.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-panel rounded-2xl sm:rounded-3xl border border-slate-800 hover:border-cyan-500/40 shadow-xl overflow-hidden flex flex-col justify-between group transition-all h-full"
                >
                  {/* Image Preview Container */}
                  <div className="relative h-48 sm:h-64 overflow-hidden bg-slate-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
                    
                    {/* Editorial Project Counter Top Bar */}
                    <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between font-mono text-[10px] text-slate-300 font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800">
                      <span>PROJECT / 0{index + 1}</span>
                      <span className="text-sky-400">{project.category}</span>
                    </div>

                    {/* Quick Action Overlay Buttons */}
                    <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setActiveModalProject(project)}
                        className="p-2 sm:p-2.5 bg-slate-950/80 hover:bg-sky-500 text-slate-300 hover:text-slate-950 rounded-xl border border-slate-800 transition-all shadow-md cursor-pointer flex items-center gap-1 text-xs font-mono font-bold"
                        title="View Details"
                      >
                        <span>DETAILS</span>
                        <FaArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        onClick={() => setActiveModalProject(project)}
                        className="text-lg sm:text-2xl font-bold text-white font-heading mb-2 hover:text-cyan-400 cursor-pointer transition-colors"
                      >
                        {project.title}
                      </h3>

                      <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                        {project.shortDescription}
                      </p>
                    </div>

                    <div>
                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-[11px] font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Card Links Footer */}
                      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                        <button
                          onClick={() => setActiveModalProject(project)}
                          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 group/btn cursor-pointer"
                        >
                          <span>Explore Details</span>
                          <FaArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                        </button>

                        <div className="flex items-center gap-3">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 rounded-lg transition-colors"
                              aria-label="GitHub Repository"
                            >
                              <FaGithub className="w-4 h-4" />
                            </a>
                          )}
                          {project.liveUrl && project.liveUrl !== '#' && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 rounded-lg transition-colors"
                              aria-label="Live Project Demo"
                            >
                              <FaExternalLinkAlt className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        )}

      </div>

      {/* Project Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
}
