import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaServer, FaDatabase, FaNetworkWired, FaCheckCircle, FaPlay, FaTachometerAlt, FaChartLine } from 'react-icons/fa';
import { soundFx } from '../utils/SoundEffects';

const architectureSteps = [
  {
    id: 'client',
    title: 'Client Web Interface',
    tech: 'React.js / Next.js',
    icon: FaLaptopCode,
    color: '#38bdf8',
    detail: 'Responsive SSR/CSR web app rendering real-time inventory dashboards & forms.'
  },
  {
    id: 'api',
    title: 'REST Microservices',
    tech: 'FastAPI / Python 3.12',
    icon: FaNetworkWired,
    color: '#06b6d4',
    detail: 'High-speed asynchronous endpoints with Pydantic schema validation & OAuth2 auth.'
  },
  {
    id: 'business',
    title: 'Business ERP Engine',
    tech: 'Odoo 16 / Python Modules',
    icon: FaServer,
    color: '#a78bfa',
    detail: 'Custom industrial inventory workflows, customer management, & patient billing.'
  },
  {
    id: 'db',
    title: 'Relational Database',
    tech: 'PostgreSQL / MySQL',
    icon: FaDatabase,
    color: '#818cf8',
    detail: 'Normalized relational schemas with indexed views, query optimization & ACID safety.'
  }
];

export default function SystemArchitectureBlueprint() {
  const [activeStep, setActiveStep] = useState(architectureSteps[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [metrics, setMetrics] = useState({ rps: 0, latency: 4.2, success: 100 });

  const runLoadSimulation = () => {
    soundFx.playSynthPulse();
    setIsSimulating(true);
    let count = 0;
    const interval = setInterval(() => {
      count += 1200;
      setMetrics({
        rps: count,
        latency: (Math.random() * 3 + 3.5).toFixed(1),
        success: 100
      });
      if (count >= 12000) {
        clearInterval(interval);
        setTimeout(() => setIsSimulating(false), 800);
      }
    }, 150);
  };

  return (
    <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden font-sans my-6">
      {/* Background Blueprint Grid Line Pattern */}
      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e9_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-slate-800 pb-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-bold block">
            System Architecture Blueprint & Benchmark
          </span>
          <h4 className="text-lg font-bold text-white font-heading">
            Enterprise Full-Stack Data Pipeline
          </h4>
        </div>
        
        <button
          onClick={runLoadSimulation}
          disabled={isSimulating}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5 disabled:opacity-50"
        >
          <FaPlay className="w-2.5 h-2.5" />
          <span>{isSimulating ? 'Testing Load...' : 'Simulate 10,000 API Requests'}</span>
        </button>
      </div>

      {/* Live Benchmark HUD Metrics Bar */}
      {isSimulating || metrics.rps > 0 ? (
        <div className="relative z-10 mb-6 p-4 rounded-2xl bg-slate-900 border border-cyan-500/30 grid grid-cols-3 gap-3 text-center font-mono">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block">Concurrence</span>
            <span className="text-sm sm:text-base font-extrabold text-cyan-400">{metrics.rps.toLocaleString()} req/sec</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase block">API Latency</span>
            <span className="text-sm sm:text-base font-extrabold text-emerald-400">{metrics.latency} ms</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase block">Success Rate</span>
            <span className="text-sm sm:text-base font-extrabold text-amber-400">{metrics.success}% (200 OK)</span>
          </div>
        </div>
      ) : null}

      {/* Interactive Node Flow Diagram */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        {architectureSteps.map((step, idx) => {
          const IconComp = step.icon;
          const isSelected = activeStep.id === step.id;

          return (
            <React.Fragment key={step.id}>
              {/* Step Node Card */}
              <motion.div
                whileHover={{ scale: 1.04 }}
                onClick={() => {
                  setActiveStep(step);
                  soundFx.playClick();
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/30'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{ backgroundColor: `${step.color}15`, color: step.color }}
                  >
                    <IconComp />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">
                      Node 0{idx + 1}
                    </span>
                    <h5 className="text-xs font-bold text-white truncate">{step.title}</h5>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-cyan-300 font-semibold block">
                  {step.tech}
                </span>
              </motion.div>

              {/* Connecting Pulse Line Arrow (for md screens) */}
              {idx < architectureSteps.length - 1 && (
                <div className="hidden md:flex items-center justify-center relative -mx-2">
                  <div className="w-full h-0.5 bg-slate-800 relative overflow-hidden">
                    <motion.div
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: isSimulating ? 0.6 : 1.8, repeat: Infinity, ease: 'linear', delay: idx * 0.2 }}
                      className="w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Selected Node Details Box */}
      <motion.div
        key={activeStep.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 mt-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3"
      >
        <FaCheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <span className="text-xs font-bold text-white block mb-0.5">
            {activeStep.title} ({activeStep.tech})
          </span>
          <p className="text-xs text-slate-400 leading-relaxed">
            {activeStep.detail}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

